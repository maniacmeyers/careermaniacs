// OceanCanvas — scroll-driven WebGL ocean/sunrise painted behind the page.
// Shaders, texture forge, and HDR post pipeline are ported verbatim from
// careermaniacs-ocean-v35.html (v35 tuning). The demo's UI, hold-to-speak
// driver, particle layer, and mini-suns are stripped: ambient calm mode
// (amp .06, prox/curl/break/peel/glow 0 — the demo's resting state) never
// gates those systems on. Scroll position drives uRise: pre-dawn at the top
// of the page, full sunrise at the bottom.
import { useEffect, useRef, useState } from 'react'
import WaveScene from './WaveScene'

/* ==================== begin verbatim v35 port ==================== */
// ---------- ocean shader (production scene, celebration-break driver) ----------
const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
const FS = `
precision highp float;
uniform vec2 uRes; uniform float uTime;
uniform float uAmp;    // swell height 0..1 (voice)
uniform float uProx;   // swell proximity 0(horizon)..1(at camera)
uniform float uCurl;   // crest sharpening 0..1
uniform float uBreak;  // break sequence progress 0..1 (0 = not breaking)
uniform float uGlow;   // sun glow pulse
uniform float uRise;   // sun elevation 0(barely surfacing)..1(risen) - follows the voice
uniform float uPeel;   // peeling break 0(unbroken)..1(peel reaches center) - travels along the crest
uniform float uStatic; // reduced motion
// r3: precomputed tileable texture atlas (CPU-forged at load, mipped, REPEAT)
// R = worley foam lace  G = 5-octave fbm  B = anisotropic streaks  A = fine ridged grain
uniform sampler2D uTex;

// ---------- noise ----------
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float a=.5, s=0.; for(int i=0;i<4;i++){ s+=a*noise(p); p=p*2.03+vec2(17.3,9.1); a*=.55; } return s; }
// ridged fbm: bright filament network (dendritic foam veins on the face)
float rfbm(vec2 p){ float a=.55, s=0.; for(int i=0;i<3;i++){ s+=a*(1.-abs(2.*noise(p)-1.)); p=p*2.17+vec2(11.7,7.9); a*=.5; } return s; }

// ---------- ocean height field ----------
// world: camera at origin looking +z, sea surface ~y=0, sun ahead low on horizon.
float ridgeD0(){ return mix(58., 8.0, pow(uProx,.8)) - uBreak*2.8; }
// deterministic wave-band intersection: fixed-step march then bisect.
// no probe notches -> no flickering seam at the foot (owner bug, 5th fix, root one)
float seaH(vec2 xz);
float swellRidge(vec2 xz);
float waveHit(vec3 ro, vec3 rd, float tMax){
  float d0 = ridgeD0();
  if(rd.z <= .001) return -1.;
  float wz = mix(13., 4.2, uProx);                  // band scales with the wave's width
  float tA = max((d0-max(wz*1.9,5.))/rd.z, .5), tB = min((d0+2.2)/rd.z, tMax);
  if(tA >= tB) return -1.;
  float tPrev = tA;
  if((ro + rd*tA).y < seaH((ro+rd*tA).xz)){
    float a=.5, b=tA;                                // entry already underwater: true crossing is nearer
    for(int j=0;j<10;j++){ float m=(a+b)*.5; vec3 pm=ro+rd*m; if(pm.y<seaH(pm.xz)) b=m; else a=m; }
    return b;
  }
  for(int i=1;i<=26;i++){
    float t = mix(tA, tB, float(i)/26.);
    vec3 p = ro + rd*t;
    if(p.y < seaH(p.xz)){
      float a=tPrev, b=t;
      for(int j=0;j<8;j++){ float m=(a+b)*.5; vec3 pm=ro+rd*m; if(pm.y<seaH(pm.xz)) b=m; else a=m; }
      return b;
    }
    tPrev=t;
  }
  return -1.;
}  // leans toward viewer as it breaks
float swellRidge(vec2 xz){
  // THE MINI TSUNAMI: born far out as a line across the whole ocean, walls up
  // as it approaches. Asymmetric profile: steep camera-side face, long back.
  float d0 = ridgeD0();
  float widthZ = mix(13., 4.2, uProx);   // broad ocean swell far out, steepens as it nears
  float dz = (xz.y - d0)/widthZ;
  // GERSTNER LEAN (owner round 5): the crest's mass shears toward the camera
  // as the curl grows, so the face hollows and the lip visibly pitches over.
  dz += uCurl * .58 * exp(-(dz+.18)*(dz+.18)*2.6);
  // steeper front: compress the camera side of the gaussian as it nears/curls
  float steep = 1. + (uProx*.9 + uCurl*2.1) * step(dz, 0.);
  float envZ = exp(-dz*dz*steep*steep);
  float dx = xz.x/mix(34., 20., uProx);       // spans the frame like a front
  float env = envZ * exp(-dx*dx);
  float h = uAmp * (2.4 + 4.0*pow(uProx,1.25)) * env;
  h *= smoothstep(.015, .055, uProx);   // rest = NO swell: calm sea, ember sun untouched on the horizon
  float und = .70 + .30*noise(vec2(xz.x*.13, 7.3)) + .22*noise(vec2(xz.x*.42, 2.1))
            + .30*pow(noise(vec2(xz.x*.22, 4.7)), 3.);  // sectioned mountain crest w/ distinct PEAKS (Nazare ref)
  und *= .82 + .34*noise(vec2(xz.x*.05, 11.3));         // whole-wave sections: distinct mountains, not one ridge
  h *= mix(1., und, smoothstep(.2, .75, envZ));  // crest undulates; the toe stays sealed (no see-through notches)
  h *= 1. + uCurl*smoothstep(0.,-1.,dz)*.9;   // curl lip mass on the face
  // PEEL (owner round 6): the break travels along the crest from the
  // viewer's right toward center. Right of the peel point the wave has
  // already broken: the wall collapses into a churned whitewater mound.
  float pxStart = ridgeD0()*.34 + 1.2;  // the frame's right edge at the wave's distance (rd.x max ~.32)
  float peelX = mix(pxStart, 0., uPeel);
  float brokenSide = smoothstep(peelX, peelX+2.2, xz.x) * smoothstep(.02,.10,uPeel);
  h *= 1. - brokenSide*.48;
  h *= 1. + brokenSide*.22*noise(vec2(xz.x*1.7, uTime*1.2));  // churn on the broken mound
  float shoulder = smoothstep(3.5, 10., abs(xz.x)) * (1.-smoothstep(.6,.9,uBreak));
  h *= 1. - smoothstep(.12, .52, uBreak)*(1. - .75*shoulder);  // center breaks first; dark shoulders frame the burst
  return h;
}
float seaH(vec2 xz){
  float t = uTime*(1.-uStatic*.85);
  float h = 0.;
  vec2 p = xz*.16;
  h += (fbm(p + t*.12) - .5)*.9;
  h += (fbm(p*2.7 - t*.2) - .5)*.32;
  h += (fbm(p*6.1 + t*.33) - .5)*.11;
  h += (noise(xz*1.9 + t*.5) - .5)*.06;
  h += (noise(xz*4.3 - t*.8) - .5)*.03;
  // gentle rollers toward camera
  h += sin(xz.y*.55 - t*1.1)*.12;
  return h*.55 + swellRidge(xz);
}
vec3 seaNormal(vec2 xz, float eps){
  float h0=seaH(xz);
  return normalize(vec3( seaH(xz-vec2(eps,0.))-h0, eps*1.6, seaH(xz-vec2(0.,eps))-h0 ));
}
// ---------- sky ----------
vec3 skyBase(vec3 rd, vec3 sunDir){
  float horiz = pow(1.-max(rd.y,0.), 6.);
  float riseC = pow(uRise, 1.4);             // red lingers, yellow arrives late
  vec3 zen = mix(vec3(.40,.12,.07), vec3(.80,.42,.14), riseC);
  vec3 mid = mix(vec3(.72,.24,.09), vec3(1.0,.60,.20), riseC);
  vec3 dawn = mix(vec3(1.0,.36,.13), vec3(1.0,.80,.38), riseC);
  vec3 c = mix(zen, mid, pow(1.-max(rd.y,0.), 2.2));
  c = mix(c, dawn, horiz*.9);
  float sunAmt = max(dot(rd, sunDir), 0.);
  c += vec3(1.,.52,.24)*pow(sunAmt, 8.)*.26;                  // wide warmth only
  // thin bright band hugging the horizon
  c += mix(vec3(1.,.40,.15), vec3(1.,.82,.45), riseC)*exp(-abs(rd.y)*30.)*(.26+.14*uRise);
  float cl = fbm(vec2(rd.x*2.4, rd.y*15.));
  float cband = smoothstep(.03,.10,rd.y)*(1.-smoothstep(.10,.34,rd.y));
  c = mix(c, c*vec3(.80,.62,.50)+vec3(.16,.07,.02), smoothstep(.52,.86,cl)*cband*.65);
  c *= mix(.55, 1., uRise);   // pre-dawn dimness lifts as the sun rises
  return c;
}
vec3 skyCol(vec3 rd, vec3 sunDir){
  vec3 c = skyBase(rd, sunDir);
  float sunAmt = max(dot(rd, sunDir), 0.);
  float riseC = pow(uRise, 1.4);
  c += mix(vec3(1.,.28,.14), vec3(1.,.86,.62), riseC)*pow(sunAmt, 900.)*(3.0+uGlow*2.5)*(.6+.4*uRise);  // ember-red disk when low
  c += mix(vec3(1.,.24,.10), vec3(1.,.72,.45), riseC)*pow(sunAmt, 90.)*(.55+uGlow*.4)*(.6+.4*uRise);  // red bloom low
  return c;
}
// ---------- foam ----------
// r3: sampled worley lace replaces the second fbm octave — real bubble cells at equal cost
float foamTex(vec2 xz){ return smoothstep(.60,.98, fbm(xz*2.6 + uTime*.35)
  + texture2D(uTex, xz*.055 + vec2(uTime*.012,-uTime*.009)).r*.62 ); }

// ---------- r3: VOLUMETRIC CURL BARREL ----------
// A log-spiral shell swept along the crest line (anchored to the same
// swellRidge geometry). Cross-section: r(th) = R*exp(-.075*th), thick at the
// crest, razor-thin at the pitching lip. Raymarched as its own SDF and
// composited over the heightfield with proper depth ordering.
float crestHx(float x){
  float und = .70 + .30*noise(vec2(x*.13, 7.3)) + .22*noise(vec2(x*.42, 2.1))
            + .30*pow(noise(vec2(x*.22, 4.7)), 3.);
  und *= .82 + .34*noise(vec2(x*.05, 11.3));
  float dxn = x/mix(34., 20., uProx);
  return uAmp*(2.4+4.0*pow(uProx,1.25)) * exp(-dxn*dxn) * und;
}
float gTh, gThMax, gR, gRr, gRs, gU, gV, gHx;   // cross-section params at last eval
float barrelDist(vec3 p){
  float Hx = crestHx(p.x);
  float Hg = uAmp*(2.4+4.0*pow(uProx,1.25));
  float R = max(Hx,.3)*(.11+.13*uCurl);    // the curl is the top slice of the face, not a log
  R *= .88 + .24*noise(vec2(p.x*.7, 3.3)); // the tongue swells and thins along the line
  float widthZ = mix(13., 4.2, uProx);
  float d0 = ridgeD0();
  float zc = d0 - widthZ*(.10+.24*uCurl);
  float yc = Hx*.98 - R*.6;                // shell back buried INSIDE the heightfield lip mass
  float u = p.z - zc, v = p.y - yc;
  float th = atan(-u, v); if(th < -.9) th += 6.2831853;
  float rr = length(vec2(u,v));
  float rs = R*exp(-th*.075);
  // surface turbulence: the thrown lip is lumpy water, not a lathed tube
  rs *= 1. + (noise(vec2(p.x*2.2, th*2.6 + uTime*.4))-.5)*.20
           + (noise(vec2(p.x*5.5, th*5.2))-.5)*.09;
  // PEEL PHASE: the curl is furthest advanced AT the peel point and unwinds
  // to a feathering lip down the line — the classic tapering almond
  float peelX = mix(ridgeD0()*.34 + 1.2, 0., uPeel);
  float phase = exp(-max(peelX - p.x, 0.)*.22);
  float thMax = .85 + uCurl*.55 + phase*(2.0 + uPeel*.9);
  // ragged dripping lip: per-x notches torn out of the lip line, animated
  thMax *= .90 + .18*noise(vec2(p.x*1.1, uTime*.5)) - .28*pow(noise(vec2(p.x*3.9, uTime*1.1)), 3.);
  thMax = min(thMax, 4.4);
  float thick = R*mix(.40, .05, smoothstep(.3, thMax, th));
  float d = abs(rr - rs) - thick;
  d = max(d, (th - thMax)*rs*.8);      // beyond the lip tip
  d = max(d, (.30 - th)*rs*.8);        // no back/top slab: the heightfield crest owns it
  d += smoothstep(.50*Hg, .30*Hg, Hx)*R*2.;   // barrels live on the tall peaks, die on saddles
  d += smoothstep(peelX - .4, peelX + .9, p.x)*R*3.;  // melts into the broken side — no sliced face
  gTh=th; gThMax=thMax; gR=R; gRr=rr; gRs=rs; gU=u; gV=v; gHx=Hx;
  return d;
}

void main(){
  vec2 uv = (gl_FragCoord.xy*2. - uRes) / uRes.y;
  float shakeW = smoothstep(.02,.10,uBreak)*(1.-smoothstep(.36,.58,uBreak));
  vec3 ro = vec3((noise(vec2(uBreak*37.,3.7))-.5)*.30*shakeW,
                 1.75+(noise(vec2(uBreak*31.,8.2))-.5)*.18*shakeW, 0.);
  vec3 rd = normalize(vec3(uv.x*.62, uv.y*.62 - .18, 1.));
  vec3 sunDir = normalize(vec3(0., mix(-.020, .075, uRise) + uGlow*.008, 1.));

  vec3 col;
  float grazing = rd.y<0. ? smoothstep(-0.045, -0.012, rd.y) : 0.;  // horizon blend, below only
  bool hit = false; float tPlane = 1e5; vec3 pos = ro; float hitDist = 1e5;
  if(rd.y < -0.012){
    tPlane = -ro.y/rd.y;
    pos = ro + rd*tPlane;
    for(int i=0;i<8;i++){ float h=seaH(pos.xz); tPlane = (ro.y-h)/(-rd.y); pos = ro + rd*clamp(tPlane, 1., 80.); }
    tPlane = clamp(tPlane, 1., 80.); hit = true;
    // ownership partition: if the ray crosses wave-influenced water, the march
    // solver owns the pixel outright \u2014 the two solvers never compete (seam source)
    float dC = ridgeD0(); float tC = dC/max(rd.z,.001);
    float own = max(swellRidge((ro+rd*tC).xz),
                max(swellRidge((ro+rd*(tC*.82)).xz), swellRidge((ro+rd*(tC*1.15)).xz)));
    if(own > .06){
      float tW = waveHit(ro, rd, 80.);
      if(tW>0.){ tPlane = tW; pos = ro + rd*tW; }
    }
  } else if(rd.y < 0.34){
    // upward rays: only the wave can rise above the horizon and occlude the sky
    float tW = waveHit(ro, rd, 90.);
    if(tW>0.){ tPlane = tW; pos = ro + rd*tW; hit = true; }
  }
  if(!hit){
    col = skyCol(rd, sunDir);
    float sunAmt = max(dot(rd, sunDir), 0.);
    // radial god-rays fanning from the sun, strengthening as it rises
    float a = atan(rd.x, max(rd.y - sunDir.y, .001));
    float streakN = pow(.5+.5*noise(vec2(a*6.5, uTime*.13)), 3.);
    float rayHug = exp(-max(rd.y - sunDir.y, 0.)*5.5);   // rays live near the sun, not smeared across the zenith
    col += vec3(1.,.68,.32)*streakN*pow(sunAmt, 2.6)*.32*(.25+.75*uRise)*rayHug*(1.-smoothstep(.3,.6,uBreak)*.7);
    // light spilling over the swell's back: sky just above the crest burns gold
    if(rd.z > .2 && rd.y < .38 && uProx > .12){
      float gateY = 1.-smoothstep(.26,.38,rd.y);   // soft ceiling: no rectangular seam where the block ends
      float dR = ridgeD0()/rd.z;
      float yR = ro.y + rd.y*dR;
      float hTop = swellRidge(vec2(rd.x*dR, ridgeD0()));
      float clr = max(yR - hTop, 0.);
      float spill = exp(-clr*1.2)*smoothstep(.12,.45,uProx)*gateY;
      col += vec3(1.,.66,.28)*spill*(.5+.5*uGlow)*(.35+.65*uRise)*.85;
      // CREST MANE (Nazare): spray blowing back off the crest line as the
      // wave stands up — visible before anything breaks
      float xM = rd.x*dR;
      float hAb = max(yR-hTop,0.);
      float maneTex = fbm(vec2(xM*1.1 + uTime*1.6, hAb*3.2 - uTime*3.4));
      float maneStr = fbm(vec2(xM*4.5 - uTime*4.2, hAb*9.))*.6;  // fine wind streaks
      float mane = exp(-hAb*1.6)
                 * smoothstep(.15,.55,uCurl)
                 * (.30+1.1*maneTex + maneStr)
                 * step(hTop*.5, yR) * gateY;
      // WIND STREAMERS: discrete backlit wisps torn off the crest — not fog
      float streamer = exp(-hAb*.85)
                     * smoothstep(.30,.75,uCurl)
                     * pow(smoothstep(.50,.95, fbm(vec2(xM*1.5 + uTime*2.4, hAb*2.2 - uTime*1.4))), 1.6)
                     * (.4+.6*smoothstep(.40,.85,uProx))
                     * step(hTop*.5, yR) * gateY;
      mane += streamer*.65;
      col = mix(col, vec3(.96,.99,1.), clamp(mane*.55,0.,1.));
      col += vec3(1.,.8,.5)*mane*.22*(.4+.6*uGlow);
      // PEEL CRASH (owner round 7): a boiling white spray eruption above the
      // crest AT the traveling peel point — the wave visibly breaking at the
      // far edge and working toward center.
      float peelGate = smoothstep(.04,.14,uPeel)*(1.-smoothstep(.97,1.,uPeel));
      if(peelGate > .003){
        float pX = mix(ridgeD0()*.34 + 1.2, 0., uPeel);
        float xR = rd.x*dR;
        float column = exp(-pow((xR-pX)/1.5, 2.));
        float aboveC = exp(-max(yR-hTop,0.)*(.9 - .35*column));
        float boil2 = .45 + .9*fbm(vec2(xR*2.2, yR*2.6 - uTime*3.5));
        float crash = column*aboveC*boil2*peelGate*step(hTop*.35, yR)*gateY;
        col = mix(col, vec3(.98,1.,1.), clamp(crash*.9,0.,1.));
        col += vec3(1.,.85,.6)*crash*.25*uGlow;
      }
    }
  }
  else {
    float dist = length(pos-ro);
    float eps = clamp(dist*.02, .02, .6);
    vec3 n = seaNormal(pos.xz, eps);
    n = faceforward(n, rd, n);   // steep-face fd normals can flip; never let one face away
    float nearF = smoothstep(14., 4., dist);
    vec2 mn = vec2(noise(pos.xz*7.3+uTime*.7), noise(pos.xz*7.3+vec2(13.7,-uTime*.6)))-.5;
    n = normalize(vec3(n.x+mn.x*.22*nearF, n.y, n.z+mn.y*.22*nearF));

    vec3 refl = reflect(rd, n);  refl.y = sqrt(refl.y*refl.y+.015)*.6+.02;
    vec3 sky = mix(skyBase(normalize(refl), sunDir), vec3(.07,.30,.37), .42);
    sky = mix(sky*vec3(.45,.55,.72), sky, smoothstep(20., 34., dist));  // horizon-band mirror is far-field only
    float fres = pow(1.-max(dot(-rd,n),0.), 3.)*.72+.05;

    vec3 deep = vec3(.05,.30,.33);             // inviting turquoise
    vec3 shal = vec3(.16,.55,.55);             // lit turquoise
    float faceLight = max(dot(n, sunDir), 0.);
    vec3 water = mix(deep, shal, faceLight*.85 + .10);
    float ridge = swellRidge(pos.xz);
    float effCrest = max(uAmp*(2.4+4.0*pow(uProx,1.25)), .001);
    float faceY = clamp(pos.y/effCrest, 0., 1.);            // 0 = waterline, 1 = lip
    float nearWave = smoothstep(.05*effCrest, .22*effCrest, ridge);
    float facing = smoothstep(.06, .42, -n.z);   // normal leans at camera = front face
    float onFront = nearWave * facing;
    // NAZARE FACE (round 9): near-black green wall with a dendritic network of
    // white foam veins streaming down it — the signature texture of the giant.
    water = mix(water, vec3(.006,.105,.135), onFront*(.94 - faceY*.34));
    float warpV = fbm(vec2(pos.x*.6, faceY*1.7 + uTime*.06))*3.4;
    vec2 vq = vec2(pos.x*2.6 + warpV, faceY*1.25 + pos.x*.30 - uTime*.35);
    float vein1 = smoothstep(.62,.88, rfbm(vq));
    float vein2 = smoothstep(.70,.92, rfbm(vq*2.7 + vec2(3.1,7.7)));
    float veinAmt = clamp(vein1*.62 + vein2*.45, 0., 1.);
    veinAmt *= .25 + .75*smoothstep(.15,.75,faceY);          // densest near the lip, thinning to the toe
    veinAmt *= smoothstep(.30,.72, noise(vec2(pos.x*.5, faceY*2.)));  // patchy: most of the wall stays dark glass
    water = mix(water, vec3(.86,.94,.95), veinAmt*onFront*.80);
    // wide subsurface tone shifts across the wall (sectioning light)
    float tone = fbm(vec2(pos.x*.45, faceY*1.3));
    water = mix(water, vec3(.02,.20,.23), smoothstep(.45,.75,tone)*.5*onFront*(1.-veinAmt));
    // glassy glints: the unbroken wall catches the sun in small hard sparks
    float specF = pow(max(dot(reflect(rd,n), sunDir), 0.), 60.);
    water += vec3(1.,.72,.40)*specF*onFront*(1.-veinAmt)*.55*(.3+.7*uRise);
    // CURL (owner round 4): as uCurl grows the wave visibly rolls over —
    // the face hollows into a shadowed barrel and a thick white lip cap
    // tumbles along the crest.
    float hollow = smoothstep(.42,.84,faceY)*(1.-smoothstep(.82,.97,faceY))*nearWave*uCurl;
    water = mix(water, vec3(.015,.095,.135), hollow*.45);
    float lipCap = smoothstep(.93-.09*uCurl, .985, faceY)*nearWave*uCurl;
    lipCap *= 1. - smoothstep(.20,.34,uCurl)*.55;   // r3: the barrel owns the lip once it forms (saddles keep their cap)
    float lipChurn = .55 + .65*foamTex(pos.xz*vec2(2.6,1.4) + vec2(uTime*.5, -uTime*.3));
    water = mix(water, vec3(.97,1.,1.), clamp(lipCap*lipChurn*1.25, 0., 1.));
    // PEEL shading: broken side is whitewater, and the peel point itself
    // is a blinding churn column where the lip is currently landing
    float peelX2 = mix(ridgeD0()*.34 + 1.2, 0., uPeel);
    float brokenS = smoothstep(peelX2, peelX2+2., pos.x)*nearWave*smoothstep(.02,.10,uPeel);
    // cauliflower whitewater mound: billows with lit crowns and sea-shadowed
    // crevices (glacier fix — shaded volume, not a white paint fill)
    vec2 bq = vec2(pos.x*1.5, pos.y*1.9 - uTime*.5);
    float bilA = fbm(bq);
    float bilLit = clamp(.5 + (fbm(bq + vec2(.06,-.09)) - bilA)*8., 0., 1.);
    float cauli = smoothstep(.30,.75, bilA + .3*foamTex(pos.xz*3.4));
    vec3 mound = mix(vec3(.50,.61,.65), vec3(.97,1.,1.), cauli*(.55+.45*bilLit));
    mound *= .68 + .52*bilLit;
    water = mix(water, mound, clamp(brokenS,0.,1.));
    float plume = exp(-pow((pos.x-peelX2)/1.7, 2.))*nearWave*smoothstep(.06,.3,uPeel)*(1.-smoothstep(.97,1.,uPeel));
    water = mix(water, vec3(1.,1.,.98), clamp(plume*(.55+.65*foamTex(pos.xz*3.1+vec2(0.,uTime*1.5))),0.,1.));
    // AVALANCHE fingers (Nazare): whitewater cascading down the face in the
    // band just ahead of the peel — the wall crumbles before it fully breaks
    float fingers = smoothstep(.38,.85, fbm(vec2(pos.x*3.2, faceY*4.5 + uTime*2.1)));
    float aheadBand = smoothstep(peelX2-2.6, peelX2+.4, pos.x)*(1.-brokenS);
    float cascade = fingers*aheadBand*nearWave*smoothstep(.25,.75,uPeel)*smoothstep(.35,.95,faceY);
    water = mix(water, vec3(.90,.96,.97), clamp(cascade*.65,0.,1.));
    // spill: white water streaming DOWN the face from the pitching lip
    float spillN = noise(vec2(pos.x*13., faceY*5. + uTime*2.6));
    float spill = smoothstep(.62,.9,spillN) * smoothstep(.45,.8,faceY) * (1.-smoothstep(.88,.99,faceY)) * nearWave * uCurl;
    water = mix(water, vec3(.88,.96,.97), spill*.50);
    // overhang shadow: the pitched lip darkens the face directly beneath it
    float lipShadow = smoothstep(.62,.86,faceY)*(1.-smoothstep(.86,.96,faceY))*nearWave*uCurl;
    water = mix(water, vec3(.01,.07,.11), lipShadow*.45);
    // translucent lit band just under the lip: sun burning through the wave
    float lipGlow = smoothstep(.58,.88,faceY)*(1.-smoothstep(.88,1.,faceY))*nearWave;
    float cells = .55 + .75*foamTex(pos.xz*1.4);   // backlit honeycomb lace
    lipGlow *= (.5 + .9*uProx) * cells;
    water += (vec3(1.,.64,.24)*lipGlow*.9 + vec3(1.,.9,.6)*lipGlow*faceLight*.35)*(.30+.90*uRise);
    // warm sun kiss on lifted water + near-field dawn bounce
    water += vec3(1.,.55,.3)*min(ridge,1.5)*faceLight*.15*(.35+.90*uRise);
    water += vec3(1.,.5,.2)*faceLight*.05;

    fres *= 1. - max(onFront, nearWave*.92)*.85;   // wave zone is churned water \u2014 never a mirror
    col = mix(water, sky, fres);
    // sun glitter: a broken column of sparkles under the sun, not a mirror
    float lane = exp(-pow(pos.x/3.0, 2.));                       // broad molten path
    float sparkle = smoothstep(.72, .98, noise(pos.xz*vec2(9.,3.1) + vec2(0., uTime*1.9)))
                  + smoothstep(.8, .99, noise(pos.xz*vec2(23.,8.) - vec2(0., uTime*2.6)))*.7;
    float spec = pow(max(dot(refl, sunDir), 0.), 70.);
    float baseGap = 1.-smoothstep(ridgeD0()-9., ridgeD0()-3., pos.z);  // zero glitter near the foot
    col += vec3(1.,.78,.42)*spec*lane*sparkle*(1.1+uGlow*.7+(1.-uProx)*.45)*baseGap;
    col += vec3(1.,.68,.34)*spec*lane*.14*baseGap;               // molten sheen
    // the sun's path: a shimmering molten line from horizon to the viewer
    float pathW = 1.0 + dist*.10;
    float path = exp(-pow(pos.x/pathW, 2.));
    float shimmer = .60 + .50*noise(pos.xz*vec2(5.5,1.8) + vec2(0., uTime*1.3));
    col += mix(vec3(1.,.36,.13), vec3(1.,.62,.26), pow(uRise,1.4))*path*shimmer*baseGap*(.22 + .42*uRise + .25*uGlow);
    // r4: WIND-STREAK ANISOTROPY — real dawn sea has directional micro-
    // streaks combed along the wind, not isotropic glitter. Atlas B channel
    // (long in u) mapped u<-z so the lanes run toward the horizon.
    // short dashes, not lanes: high u-frequency kills the zoom-blur read
    float wstr = texture2D(uTex, vec2(pos.z*.60 + uTime*.012, pos.x*1.5)).b;
    float wNear = smoothstep(14., 5., dist)*(1.-nearWave);
    col *= 1. + (wstr-.5)*.06*wNear;
    // r5: RESIDUAL FOAM RAFTS — the sea a working wave lives in is never
    // clean glass (ref: leopard foam patches streaming toward the camera)
    float raft = smoothstep(.52,.88, texture2D(uTex, pos.xz*vec2(.035,.05) + vec2(uTime*.004,-uTime*.006)).r
                                   * (.55+.65*texture2D(uTex, pos.xz*vec2(.11,.16)+.31).g));
    float raftAmt = raft*smoothstep(.25,.6,uProx)*smoothstep(17.,5.,dist)*(1.-nearWave)*(1.-smoothstep(.2,.5,uBreak));
    col = mix(col, vec3(.84,.91,.91), raftAmt*.26);

    // crest foam: a white feather along the tsunami's crest from early on,
    // thickening with energy; spilling wisps once the curl forms
    float crestZone = smoothstep(mix(.66,.82,uProx), .97, faceY) * nearWave;
    float feather = crestZone * (0.35 + 0.65*uProx);
    float wisps = uCurl * smoothstep(.3,.9,foamTex(pos.xz*1.7 + vec2(0.,uTime*1.2))) * crestZone;
    col = mix(col, vec3(1.,.94,.80), clamp(feather*(.45+.75*foamTex(pos.xz)) + wisps*.8, 0., 1.));

    // BREAK: whitewater front SURGES from the wall's base toward the viewer
    if(uBreak>0.){
      float front = mix(ridgeD0()+.5, 1.6, pow(smoothstep(.06,.9,uBreak),1.35));
      front += (noise(vec2(pos.x*.35, 2.1))-.5)*1.6;   // ragged leading edge
      float ahead  = pos.z - front;                 // <0 = already overrun by foam
      // directional lace: noise stretched along the direction of travel
      float lace = foamTex(vec2(pos.x*.8, pos.z*2.2) - vec2(uTime*.2, uBreak*7.));  // foam bands parallel to the front
      float sizz = smoothstep(.55,.95, fbm(pos.xz*7.5 - vec2(0., uBreak*9.)));
      // marble lace: the dendritic foam sheet left on the sea after the pass
      float marble = smoothstep(.30,.72, rfbm(pos.xz*vec2(1.1,1.9) + vec2(uTime*.12, -uTime*.2)));
      // the leading edge is a BAND of solid white, not a step \u2014 lace trails behind it
      float eb = smoothstep(.7, -.6, ahead) * smoothstep(-2.6, -1.0, ahead);
      float edgeMix = smoothstep(2.0, -.3, ahead) * smoothstep(-1.2, -.4, ahead);
      // foam exists only where the front has PASSED: between the front and the wall,
      // freshest churn at the leading edge, thinning back toward the impact zone
      float startZ = mix(58.,8.,pow(uProx,.8)) + .9;
      float trail = max(exp(-max(ahead,0.)*.10), .42) * step(0., ahead) * (1.-smoothstep(startZ, startZ+2., pos.z));
      float fade  = 1.-smoothstep(.55, 1., uBreak)*.45;   // foam SHEETS persist into the recede (Nazare: the sea stays white)
      // aerated turquoise under the foam, not grey
      float hGate = 1.-smoothstep(.5, 1.7, pos.y);  // whitewater hugs the waterline, not the wall face
      float aer = clamp(eb + edgeMix*.6 + trail, 0., 1.)*hGate;
      col = mix(col, vec3(.44,.62,.56), aer*.45*max(fade,.35));
      float fineLace = foamTex(pos.xz*vec2(3.5,6.) + vec2(0., uTime*.3));  // crisp lace up close, not lens fog
      float f = (eb*.92*(.55+.45*fineLace) + edgeMix*lace*.7 + trail*(lace*.28+sizz*.20+marble*.38+fineLace*.38))*hGate;
      vec3 surgeCol = mix(vec3(.95,.98,.98), vec3(1.,.80,.48), exp(-pow(pos.x/2.6,2.))*(.30+.55*uGlow));
      col = mix(col, surgeCol, clamp(f,0.,1.)*fade);
    }
    // distance haze into dawn — hazes toward the SKY at the horizon, not mud
    vec3 hazeCol = skyBase(vec3(rd.x, .004, max(rd.z,.4)), sunDir);
    col = mix(col, hazeCol, smoothstep(18., 42., dist)*.72);   // far field melts into the sky (no dark horizon strip)
    // impact-zone mist: a pale veil hugging the wave's base (Nazare signature —
    // the giant always stands in its own haze)
    float baseMist = nearWave*(1.-smoothstep(.0,.38,faceY))*smoothstep(.30,.70,uProx);
    baseMist *= .6 + .4*fbm(vec2(pos.x*.8, uTime*.6));
    col = mix(col, hazeCol*vec3(.96,1.,1.02), clamp(baseMist,0.,1.)*.34);
    // grazing rays dissolve into sky: kills horizon aliasing
    col = mix(col, skyBase(vec3(rd.x, .002, rd.z), sunDir), grazing*.9*smoothstep(26., 38., dist)*(1.-smoothstep(.3,.45,uProx)));
    hitDist = dist;
  }
  // ---------- r3: CURL BARREL PASS (owner priority #1) ----------
  float bGate = smoothstep(.20,.34,uCurl)*(1.-smoothstep(.12,.42,uBreak))*smoothstep(.08,.16,uProx);
  if(bGate>.004 && rd.z>.03 && rd.y<.75){
    float d0b = ridgeD0();
    float Hg = uAmp*(2.4+4.0*pow(uProx,1.25));
    float Rg = max(Hg,.3)*(.11+.13*uCurl);
    float tA3 = max((d0b - mix(13.,4.2,uProx)*.34 - 2.2*Rg)/rd.z, .6);
    float tB3 = min((d0b + 1.8*Rg)/rd.z, min(hitDist+.4, 90.));
    float tB = -1.;
    if(tB3 > tA3){
      float t = tA3;
      for(int i=0;i<BSTEPS;i++){
        vec3 p = ro + rd*t;
        float d = barrelDist(p);
        if(d < .015){ tB = t; break; }
        t += max(d*.72, .02);
        if(t > tB3) break;
      }
    }
    if(tB > 0. && tB < hitDist + .3){
      vec3 p = ro + rd*tB;
      float dd = barrelDist(p);   // refresh cross-section globals at the hit
      float inner = gRr < gRs ? -1. : 1.;
      vec2 radial = normalize(vec2(gU,gV));
      vec3 n = normalize(vec3(0., radial.y, radial.x)*inner + vec3(.001,0.,0.));
      float sunF = max(dot(n, sunDir), 0.);
      float outerF = step(gRs, gRr);                        // 1 = outer shell face, 0 = under-lip
      float thBand = gTh/gThMax;
      float thickN = gR*mix(.42,.06,smoothstep(.4,gThMax,gTh));  // local shell thickness
      // bands along the spiral: crest feather -> dark glass -> torn lip
      float crestB = smoothstep(.50,.85,gTh)*(1.-smoothstep(.85,1.55,gTh));
      float tipB   = smoothstep(gThMax-.55,gThMax-.10,gTh);
      // translucency: the sun burns through where the shell is thin —
      // the glowing green-gold window every wave photo has
      float burn = exp(-thickN*4.0) * (.40+.60*pow(max(dot(rd,sunDir),0.),1.6)) * (.35+.65*uRise);
      burn *= mix(1., .45, outerF*step(gTh, 3.14));  // the curled-under lip glows from EITHER side (thin water vs the sun)
      burn *= smoothstep(gThMax-2.1, gThMax-.35, gTh);      // hottest toward the thin lip
      // base: translucent green body, darker where thick, lighter toward the lip
      vec3 bcol = mix(vec3(.008,.115,.140), vec3(.05,.30,.29), sunF*.25 + thBand*.45);
      // streaming vein texture wrapping WITH the curl (advected along the spiral)
      vec2 fuv = vec2(p.x*.045, gTh*gRs*.05 - uTime*(.20+.45*uCurl));
      float vein = texture2D(uTex, vec2(p.x*.09, gTh*.16 - uTime*.10)).b;
      bcol = mix(bcol, vec3(.55,.72,.72), smoothstep(.62,.95,vein)*.30*(1.-tipB));
      bcol += vec3(.45,.85,.55)*burn*2.0*(1.+uGlow*.6);
      bcol += vec3(1.,.72,.35)*burn*pow(max(dot(rd,sunDir),0.),6.)*2.6;  // gold core in the sun lane
      // under-lip cavern shadow — deepest at the tube mouth by the peel point
      float phase2 = exp(-max(mix(ridgeD0()*.34+1.2,0.,uPeel) - p.x, 0.)*.22);
      float interior = (1.-outerF)*smoothstep(1.4,2.6,gTh);
      bcol = mix(bcol, vec3(.003,.04,.065), interior*(.55+.40*phase2)*(1.-burn));
      // foam: the thrown lip is AERATED — whitewater streaks ride the outer
      // face, thickening toward the tip; churn at the torn edge
      float lace = texture2D(uTex, fuv).r;
      float lace2 = texture2D(uTex, fuv*2.7 + vec2(.31,.57)).a;
      float streakF = texture2D(uTex, vec2(p.x*.11, gTh*.30 - uTime*.5)).b;
      float foamAmt = crestB*smoothstep(.35,.75,lace*.8+lace2*.4)*.9
                    + tipB*smoothstep(.25,.70,lace*.6+lace2*.6)
                    + outerF*smoothstep(.30,.85, streakF*.9 + lace2*.35)*(.30+.55*thBand)*(.45+.85*lace);
      foamAmt *= (.35 + .65*outerF);
      vec3 foamCol = vec3(.94,.98,.98)*(.50+.30*sunF+.40*lace2) + vec3(1.,.8,.5)*burn*.4;
      bcol = mix(bcol, foamCol, clamp(foamAmt,0.,1.));
      bcol += vec3(1.,.75,.42)*pow(max(dot(reflect(rd,n),sunDir),0.),42.)*.5;  // wet glint
      // ragged bright rim right at the falling lip edge
      float rim = smoothstep(gThMax-.18,gThMax-.02,gTh);
      bcol = mix(bcol, vec3(.96,1.,1.), rim*(.45+.55*lace2));
      // r4: AERATED CROWN — the lip top is thrown porous water, not granite.
      // High-frequency atlas grain shakes the brightness and punches erosion
      // holes through the shell right at the crown, killing the slab read.
      float pores  = texture2D(uTex, vec2(p.x*.55, gTh*.85 - uTime*.6)).a;
      float pores2 = texture2D(uTex, vec2(p.x*1.35 + .37, gTh*2.1)).r;
      float crown = smoothstep(.40,.90,gTh)*(1.-smoothstep(1.7,2.7,gTh))*outerF;
      // r5: cluster the aeration — foamy patches and glassy patches, not
      // uniform static across the whole tube
      crown *= .35 + .95*smoothstep(.35,.70, texture2D(uTex, vec2(p.x*.10, gTh*.22)).g);
      bcol *= 1. + crown*(pores-.45)*.95;
      bcol = mix(bcol, vec3(.93,.975,.975), crown*smoothstep(.50,.88,pores2*.6+pores*.55)*.60);
      float alpha = clamp(.85 + foamAmt*.2 - rim*.30*(1.-lace2), 0., 1.)*bGate;
      alpha *= smoothstep(.50,.95,gTh);   // soft seam where the shell grows out of the crest
      alpha *= 1. - crown*smoothstep(.60,.94,pores)*.6;   // porous holes at the crown
      col = mix(col, bcol, alpha);
      hitDist = min(hitDist, tB);
    }
  }
  // ---------- r4: FALLING WATER SHEET (R3 residual defect b) ----------
  // Right of the peel point the pitched lip must CONNECT to the trough: a
  // translucent curtain of falling water, streaked by gravity, torn at its
  // lower edge where it feeds the impact churn.
  float shGate = smoothstep(.06,.16,uPeel)*(1.-smoothstep(.93,1.,uPeel))
               * smoothstep(.25,.5,uCurl)*(1.-smoothstep(.10,.35,uBreak))*smoothstep(.15,.3,uProx);
  if(shGate>.004 && rd.z>.05){
    float d0s = ridgeD0();
    float wzS = mix(13.,4.2,uProx);
    float zS = d0s - wzS*(.10+.24*uCurl) - .25;      // hangs just camera-side of the lip
    float tS2 = zS/rd.z;
    if(tS2>0. && tS2 < hitDist+.6){
      vec3 pS = ro + rd*tS2;
      float pX3 = mix(d0s*.34+1.2, 0., uPeel);
      float Hx3 = crestHx(pS.x);
      float xBand = smoothstep(pX3-.5, pX3+.4, pS.x)*(1.-smoothstep(pX3+1.9, pX3+3.4, pS.x));
      float yTop = Hx3*(.94 - .24*smoothstep(pX3, pX3+3.5, pS.x));   // curtain sags down-line
      float yN = clamp(pS.y/max(yTop,.01), 0., 1.);
      // soft attachment under the lip, never a hard slab edge
      float inY = smoothstep(.02,.10,pS.y)*(1.-smoothstep(.80,.99,yN));
      // gravity streaks: atlas streak channel advected downward, two octaves
      float stk  = texture2D(uTex, vec2(pS.y*.22 + uTime*.55, pS.x*.13)).b;
      float stk2 = texture2D(uTex, vec2(pS.y*.50 + uTime*.95, pS.x*.31 + .41)).b;
      // torn lower edge: erosion eats the curtain from below, ragged per-x
      float tear = texture2D(uTex, vec2(pS.x*.21, uTime*.22)).g;
      float lowEdge = smoothstep(.08+.34*tear, .46+.34*tear, yN);
      // streak gaps: the curtain is see-through in vertical strips
      float dens2 = xBand*inY*lowEdge*(.12+.88*smoothstep(.42,.85, stk*.7+stk2*.5));
      if(dens2>.003){
        float sunT = max(dot(rd,sunDir),0.);
        vec3 shCol = mix(vec3(.42,.62,.62), vec3(.90,.97,.97), smoothstep(.35,.85,stk2));
        shCol += vec3(1.,.68,.32)*pow(sunT,6.)*.55*(.35+.65*uRise);   // backlit gold, disk-tight
        col = mix(col, shCol, clamp(dens2*.55,0.,.8)*shGate);
      }
    }
  }
  // BREAK ERUPTION: towering backlit spray where the wall was (reference panel 5)
  if(uBreak>.005){
    float wallZ = max(ridgeD0()+.6, 3.2);
    float tW = wallZ/max(rd.z,.05);
    float mFade = smoothstep(-1.5, -.2, hitDist - tW);  // exclude only foreground occluders; mist rises from the impact surface
    if(mFade > .003){
      vec3 pw = ro + rd*tW;
      float burst = smoothstep(.16,.28,uBreak)*(1.-smoothstep(.34,.52,uBreak));  // r3: mist is the ERUPTION only — the volumetric ball owns the mass
      float baseH = uAmp*(2.4+4.0*pow(uProx,1.25));
      float colsN = pow(fbm(vec2(pw.x*.75, uBreak*2.2+4.7)), 1.35)*1.4;  // full towering plumes
      float hLoc = min(baseH*(.5+2.1*burst)*(.4+1.3*colsN), baseH*2.6);  // ragged tops against clean sky
      float dens = smoothstep(hLoc, hLoc*.10, pw.y) * smoothstep(-1.2, 0., pw.y+.8);
      float tex = fbm(vec2(pw.x*2.6, pw.y*1.7 - uBreak*6.))*.72
                + fbm(vec2(pw.x*6.4, pw.y*4.3 - uBreak*9.5))*.46;  // second octave breaks the curtain banding
      tex = tex*tex*1.5;                                    // deeper structure contrast
      dens *= (.22+1.0*tex) * burst * .38 * exp(-pow(pw.x/16.,2.));
      float sunAmt = max(dot(rd,sunDir),0.);
      dens *= 1. - pow(sunAmt, 24.)*.6;                     // the sun burns a hole through the mist
      vec3 mistCol = mix(vec3(.97,.92,.86), vec3(1.,.72,.36), pow(sunAmt,2.));
      mistCol *= .92 + 1.1*pow(sunAmt,7.);
      col = mix(col, mistCol, clamp(dens,0.,1.)*.85*mFade);
    }
  }
  // SPRAY BURST (owner reference frame): backlit droplet fans, gold core where
  // the sun burns through, cool white edges, ragged crown of droplets on top
  if(uBreak>.015 && uBreak<.9){
    float env = smoothstep(.015,.10,uBreak)*(1.-smoothstep(.30,.50,uBreak));  // r3: spray fans are the impact flash; the ball takes over
    if(env>.003){
      float baseH = uAmp*(2.4+4.0*pow(uProx,1.25));
      float cz = ridgeD0()+.3 - uBreak*2.0;
      float tS = cz/max(rd.z,.05);
      vec3 ps = ro + rd*tS;
      float grow = smoothstep(.02,.34,uBreak);
      float W = baseH*(1.65+2.0*grow);
      float H = baseH*(.8+1.9*grow);
      float sFade = smoothstep(-1.5,-.2, hitDist - tS);
      if(tS>0. && sFade>.003 && abs(ps.x)<W*1.4){
        // ragged crown line + gentle edge droop (butterfly fans)
        float hEnv = H*(.72+.40*noise(vec2(ps.x*.55, uBreak*3.)) + .28*(noise(vec2(ps.x*2.3, uBreak*5.))-.5))*(1.-.28*smoothstep(W*.6,W*1.2,abs(ps.x)));
        float dens = smoothstep(hEnv, hEnv*.22, ps.y);
        // granular spray, streaming upward
        float grain = smoothstep(.42,.78, fbm(ps.xy*vec2(3.2,5.5) - vec2(0., uBreak*8.)) );
        float clumps = smoothstep(.34,.72, fbm(ps.xy*vec2(1.3,2.1) + vec2(uBreak*2., 1.7)));
        dens *= (.10+1.10*grain)*(.18+.95*clumps)*(.30+1.25*exp(-pow(ps.x/(W*.42),2.)))*env*sFade;
        float sunAmt = max(dot(rd, sunDir), 0.);
        // transmitted light: gold core toward the sun, cool spray away from it
        float core = clamp(pow(sunAmt, 2.0)*1.6, 0., 1.);
        vec3 sc = mix(vec3(.90,.93,.97), vec3(1.,.46,.10), core);
        sc *= mix(.55, 1.18, core);
        col = mix(col, sc, clamp(dens,0.,.92));
        // backlit droplets: bright dots inside the mass and along the crown
        float dots = smoothstep(.74,.94, noise(ps.xy*vec2(14.,20.) + vec2(uBreak*11., -uBreak*15.)))*1.4;
        dots += smoothstep(.80,.96, noise(ps.xy*vec2(26.,5.) + vec2(0., -uBreak*22.)))*.9;  // vertical velocity streaks
        float crown = smoothstep(hEnv*.8, hEnv, ps.y)*(1.-smoothstep(hEnv, hEnv*1.3, ps.y));
        // droplets live INSIDE spray density only — never as bare dots on sky
        col += mix(vec3(1.,.9,.7), vec3(1.,.62,.2), core)*dots*dens*(0.8 + crown*.9)*1.1;
        // the sun blazing through the densest center
        col += vec3(1.,.45,.10)*pow(sunAmt,6.)*dens*.6;
      }
    }
  }
  // SHOCKWAVE: an expanding ring of light from the impact (first 300ms)
  if(uBreak>.02 && uBreak<.30){
    float dAng = sqrt(max(0., 2.*(1.-dot(rd, sunDir))));
    float rw = mix(.06, 1.1, smoothstep(.02,.26,uBreak));
    float band = exp(-pow((dAng-rw)*9., 2.));
    col += vec3(1.,.50,.22)*band*(1.-smoothstep(.18,.30,uBreak))*.55;
  }
  // (round-2 lab: the old SPLATTER cell-droplets are gone — drops travelling
  // out of their grid cell were clipped to faint rectangles. The particle
  // layer's impact splash owns near-camera droplets now, properly projected.)
  // ---------- r3: VOLUMETRIC FOAM BALL (owner priority #2) ----------
  // True participating media replaces the screen-space engulf: raymarched
  // density in a world-space impact ellipsoid, advected+tumbling texture
  // noise, sun scattering with self-shadow taps, fractal silhouette erosion.
  if(uBreak>.10 && uBreak<.97){
    float grow = smoothstep(.10,.38,uBreak);
    float fall = smoothstep(.55,.95,uBreak);
    float d0f = ridgeD0();
    float Hgf = uAmp*(2.4+4.0*pow(uProx,1.25));
    // the mass RIDES the whitewater surge front — a rolling wall, not a fog
    // bank — and settles into a low torn mound as it recedes
    float frontB = mix(d0f+.5, 9.5, smoothstep(.06,.60,uBreak));
    vec3 cB = vec3(0., Hgf*(.24+.30*grow)*(1.-fall*.90) - fall*.5, frontB + 1.4);
    vec3 radB = vec3(6.0+6.0*grow, max(Hgf*(.55+.60*grow)*(1.-fall*.55), .5), 3.4);
    vec3 ocB = (ro - cB)/radB, rdB = rd/radB;
    float Aq = dot(rdB,rdB), Bq2 = 2.*dot(ocB,rdB), Cq = dot(ocB,ocB)-1.;
    float disc = Bq2*Bq2 - 4.*Aq*Cq;
    float env = grow*(1.-smoothstep(.80,.97,uBreak));
    if(disc > 0. && env > .004){
      float sqd = sqrt(disc);
      float t0v = max((-Bq2-sqd)/(2.*Aq), .05);
      float t1v = min(min((-Bq2+sqd)/(2.*Aq), hitDist), 90.);
      if(t1v > t0v){
        float stp = (t1v-t0v)/float(VSTEPS);
        float T = 1.; vec3 acc = vec3(0.);
        float sunA = max(dot(rd,sunDir),0.);
        float rotB = uBreak*2.2;
        float cRb = cos(rotB), sRb = sin(rotB);
        float jit = hash(gl_FragCoord.xy) - .5;
        for(int i=0;i<VSTEPS;i++){
          float tv = t0v + (float(i)+.5+jit*.8)*stp;
          vec3 p = ro + rd*tv;
          vec3 qB = (p - cB)/radB;
          float shp = 1.-dot(qB,qB);
          if(shp <= 0.) continue;
          // TUMBLE: the domain rotates around the crest axis and expands
          // radially — the foam visibly rolls, not slides
          vec2 qzy = vec2(cRb*qB.z - sRb*qB.y, sRb*qB.z + cRb*qB.y);
          vec3 qa = vec3(qB.x, qzy.y, qzy.x)*(1.6 - .5*grow);
          vec2 uv1 = qa.xy*vec2(.22,.62) + vec2(uBreak*.30,-uBreak*.20);
          float n1 = texture2D(uTex, uv1).g;
          float n1L = texture2D(uTex, uv1 + vec2(.018,-.030)).g;   // sample toward the sun
          float n2 = texture2D(uTex, qa.xz*vec2(.45,.45) + vec2(-uBreak*.45, uBreak*.20)).g;
          float n3 = texture2D(uTex, qa.yz*vec2(2.4,2.0) + vec2(uBreak*.8, .21)).a;
          float n4 = texture2D(uTex, qa.xy*vec2(1.9,4.8) - vec2(uBreak*.6, uBreak*1.1)).r;  // fine bubble lace
          float f = (n1-.5)*2.1 + (n2-.5)*1.3 + (n3-.5)*.7 + .5;
          // distinct plumes along the crest, not a uniform fog bank
          // vertical plumes: the mass's HEIGHT varies along the crest — tall
          // thrown heads over low saddles, carved in world space
          float pl = texture2D(uTex, vec2(qB.x*.50 + uBreak*.10, .13)).g;
          float plumeH = .25 + 1.1*smoothstep(.30,.72,pl);
          float dens = smoothstep(.46, .66, f*.85 + shp*.30 + .02);
          dens *= smoothstep(-.08,.12, plumeH - max(qB.y,0.));
          // fractal silhouette erosion — harsher on the skyline, torn into
          // VERTICAL streaks near the top (thrown spray), and the whole mass
          // tears apart as it recedes (never dissolves into even fog)
          float er = texture2D(uTex, vec2(qa.x*1.6, qB.y*.35 - uBreak*.5)).a;
          float erN = mix(n3, er, smoothstep(.1,.7,qB.y));
          dens *= smoothstep(.0, .30 + .40*max(qB.y,0.) + fall*.55, shp + (erN-.5)*(.8+fall*.6));
          dens *= env;
          if(dens > .012){
            // self-shadow: taps toward the sun through the same density field
            float shd = 0.;
            for(int s=1;s<=STAPS;s++){
              vec3 ps = p + sunDir*(1.1*float(s));
              vec3 qs = (ps - cB)/radB;
              float shs = 1.-dot(qs,qs);
              if(shs > 0.){
                vec2 qszy = vec2(cRb*qs.z - sRb*qs.y, sRb*qs.z + cRb*qs.y);
                vec3 qsa = vec3(qs.x, qszy.y, qszy.x)*(1.6 - .5*grow);
                float fs = (texture2D(uTex, qsa.xy*vec2(.22,.62) + vec2(uBreak*.30,-uBreak*.20)).g-.5)*2.1
                         + (texture2D(uTex, qsa.xz*vec2(.45,.45) + vec2(-uBreak*.45,uBreak*.20)).g-.5)*1.3 + .5;
                shd += smoothstep(.46,.70, fs*.85 + shs*.30 + .02);
              }
            }
            // multiple-scattering floor: real whitewater shadows are grey, not black
            float light = .18 + .82*exp(-shd*(2.6/float(STAPS)));
            light *= 1. - dens*.20;                    // packed foam self-occludes
            light *= .55 + .45*smoothstep(-.8,.3,qB.y); // the base churns in sea-shadow
            // derivative-lit billow crowns: sun-side faces bleach, undersides shade
            float lit = clamp(.5 + (n1L-n1)*10., 0., 1.);
            light = clamp(light*(.40+1.0*lit), 0., 1.);
            // r4: THREE-LEVEL CAULIFLOWER HIERARCHY with hard value separation
            // macro heads -> nested meso clumps -> fine bubble grain, each a
            // DISTINCT value step (not blended mush): photo whitewater reads
            // as discrete lobes stacked on lobes.
            float clump = smoothstep(.47,.61, n1*.65 + n2*.45);          // macro: harder edge
            float meso  = smoothstep(.50,.58, n2*.70 + n3*.40);          // meso: nested heads
            vec3 sc = mix(vec3(.28,.36,.44), vec3(1.,1.,.985), clamp(light*(.20+1.18*clump),0.,1.));
            sc *= mix(.76, 1.10, meso);                // hard meso value step
            sc *= .80 + .18*n3 + .12*n4;               // fine bubble lace grain
            sc += vec3(1.,.70,.36)*pow(sunA,24.)*light*.7*(.5+.5*uGlow);  // warm in-scatter near the sun only
            sc += vec3(1.,.50,.18)*pow(sunA,90.)*T*1.2;                   // sun core burning through
            sc += vec3(1.,.80,.55)*(1.-shp)*.22*light;                    // backlit rim on the torn edges
            float aS = 1.-exp(-dens*stp*4.6);   // heavy extinction: the front billow surface carries the read
            acc += T*aS*sc;
            T *= 1.-aS;
            if(T < .04) break;
          }
        }
        col = acc + col*T;
      }
    }
  }
#if HDRPIPE
  // r4: linear HDR out. Vignette, tonemap, saturation, flash, grain and the
  // temporal blend all live in the composite pass now — this pass only
  // delivers unclamped radiance so the brights can BLOOM like a photograph.
  gl_FragColor = vec4(max(col, 0.), 1.);
#else
  // vignette + grade (single-pass fallback: v30 PHOTOGRADE path, verified)
  vec2 q = gl_FragCoord.xy/uRes;
  col *= .92 + .16*pow(16.*q.x*q.y*(1.-q.x)*(1.-q.y), .28);
  col = clamp(col, 0., 1.);
  col = mix(col, col*col*(3.-2.*col), .24);            // r2: drone-still midtone snap
  col = mix(vec3(dot(col,vec3(.299,.587,.114))), col, 1.06);
  float flash = smoothstep(.02,.08,uBreak)*(1.-smoothstep(.10,.22,uBreak));
  col += vec3(1.,.85,.6)*flash*.22;
  col = pow(col, vec3(.93,.95,1.0));
  // film grain + dither: kills gradient banding, adds photographic texture
  float grain = hash(gl_FragCoord.xy + fract(uTime)*vec2(37.,17.)) - .5;
  col += grain*.014;
  gl_FragColor = vec4(col, 1.);
#endif
}`;
// ================= r4: POST SHADERS (HDR bloom + temporal + grade) =================
const BRIGHT_FS = `
precision mediump float; uniform sampler2D uScene; uniform vec2 uRes;
void main(){ vec2 uv = gl_FragCoord.xy/uRes;
  vec3 c = texture2D(uScene, uv).rgb;
  float l = dot(c, vec3(.299,.587,.114));
  vec3 b = c * smoothstep(1.02, 2.1, l);          // true HDR brights only: sun disk, burn window, backlit rims, glitter
  gl_FragColor = vec4(min(b, 24.), 1.); }`;
const BLUR_FS = `
precision mediump float; uniform sampler2D uScene; uniform vec2 uRes; uniform vec2 uDir;
void main(){ vec2 uv = gl_FragCoord.xy/uRes; vec2 px = uDir/uRes;
  vec3 s = texture2D(uScene, uv).rgb*.227027;
  s += (texture2D(uScene, uv+px*1.3846).rgb + texture2D(uScene, uv-px*1.3846).rgb)*.3162162;
  s += (texture2D(uScene, uv+px*3.2308).rgb + texture2D(uScene, uv-px*3.2308).rgb)*.0702703;
  gl_FragColor = vec4(s, 1.); }`;
const COMP_FS = `
precision highp float;
uniform sampler2D uScene; uniform sampler2D uBloom; uniform sampler2D uHist;
uniform vec2 uRes; uniform float uTime; uniform float uBreak; uniform float uTempo;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  vec3 hdr = texture2D(uScene, uv).rgb;
  hdr += texture2D(uBloom, uv).rgb*.9;            // additive HDR bloom
  hdr *= .92 + .16*pow(16.*uv.x*uv.y*(1.-uv.x)*(1.-uv.y), .28);
  float flash = smoothstep(.02,.08,uBreak)*(1.-smoothstep(.10,.22,uBreak));
  hdr += vec3(1.,.85,.6)*flash*.30;
  // hue-preserving luminance shoulder: identity below .8 (keeps the exact v30
  // color character), reciprocal rolloff above; true HDR cores clip to white
  vec3 col = hdr;
  float l = dot(col, vec3(.299,.587,.114));
  if(l > .8){ float s = l-.8; col *= (.8 + s/(1.+5.*s))/l; }
  col = mix(col, vec3(1.), smoothstep(2.2, 7., l));   // photographic white-clip
  col = clamp(col, 0., 1.);
  col = mix(col, col*col*(3.-2.*col), .24);       // drone-still midtone snap (v30)
  col = mix(vec3(dot(col,vec3(.299,.587,.114))), col, 1.06);
  col = pow(col, vec3(.93,.95,1.0));
  // temporal accumulation: foam-luminance mask only, history clamped to the
  // current frame's neighborhood so break-shake can never ghost
  float lum = dot(col, vec3(.299,.587,.114));
  float sat = length(col - vec3(lum));
  float foamM = smoothstep(.44,.66,lum)*(1.-smoothstep(.12,.34,sat));
  vec3 hist = clamp(texture2D(uHist, uv).rgb, col-.22, col+.22);
  col = mix(col, hist, uTempo*foamM);
  col += (hash(gl_FragCoord.xy + fract(uTime)*vec2(37.,17.)) - .5)*.012;
  gl_FragColor = vec4(col, 1.);
}`;
const BLIT_FS = `
precision mediump float; uniform sampler2D uScene; uniform vec2 uRes;
void main(){ gl_FragColor = vec4(texture2D(uScene, gl_FragCoord.xy/uRes).rgb, 1.); }`;
// ================= r3: PRECOMPUTED TILEABLE TEXTURES =================
// Forged once at load into a raw Uint8Array (no canvas: avoids premultiply
// loss), uploaded per GL context, mipped + REPEAT. Sampled textures beat
// per-pixel fbm for fine detail at equal GPU cost.
// R = worley foam lace (bubble cells), G = 5-octave fbm, B = anisotropic
// streaks (long in u), A = fine ridged grain.
const TEXSZ=512;
let TEXDATA_CACHE=null;
const TEXDATA=()=>{ if(TEXDATA_CACHE) return TEXDATA_CACHE;   // lazy: forged on first mount, not at import
  const P=8, S=TEXSZ, d=new Uint8Array(S*S*4);
  const h2=(i,j)=>{const s=Math.sin(i*127.1+j*311.7)*43758.5453;return s-Math.floor(s);};
  const vn=(x,y,Px,Py)=>{const xi=Math.floor(x),yi=Math.floor(y);let u=x-xi,v=y-yi;
    u=u*u*(3-2*u); v=v*v*(3-2*v);
    const w=(i,j)=>h2(((i%Px)+Px)%Px,((j%Py)+Py)%Py);
    return (w(xi,yi)*(1-u)+w(xi+1,yi)*u)*(1-v)+(w(xi,yi+1)*(1-u)+w(xi+1,yi+1)*u)*v;};
  const wor=(x,y,Pp)=>{const xi=Math.floor(x),yi=Math.floor(y);let m=9;
    for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const ci=xi+i,cj=yi+j;
      const wi=((ci%Pp)+Pp)%Pp,wj=((cj%Pp)+Pp)%Pp;
      const px=ci+h2(wi,wj),py=cj+h2(wi+57,wj+91);
      const dd=(x-px)*(x-px)+(y-py)*(y-py); if(dd<m)m=dd;}
    return Math.sqrt(m);};
  const cl=(v)=>Math.max(0,Math.min(255,v|0));
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){
    const u=x/S*P, v=y/S*P;
    let lace=0;                                     // bubble lace: dark holes in white matrix
    lace+=.52*Math.min(1,wor(u,v,P)*1.5);
    lace+=.30*Math.min(1,wor(u*2,v*2,P*2)*2.1);
    lace+=.18*Math.min(1,wor(u*5,v*5,P*5)*3.4);
    let fb=0,a=.5,fq=1;
    for(let o=0;o<5;o++){fb+=a*vn(u*fq,v*fq,P*fq,P*fq);a*=.53;fq*=2;}
    let st=.55*vn(u,v*9,P,P*9)+.30*vn(u*2,v*19,P*2,P*19)+.17*vn(u*4,v*37,P*4,P*37);
    let rg=0;a=.6;fq=6;
    for(let o=0;o<3;o++){rg+=a*(1-Math.abs(2*vn(u*fq,v*fq,P*fq,P*fq)-1));a*=.5;fq*=2;}
    const o4=(y*S+x)*4;
    d[o4]=cl(lace*255); d[o4+1]=cl(fb*255); d[o4+2]=cl(st*300); d[o4+3]=cl(rg*190);
  }
  TEXDATA_CACHE=d; return d;
};
function uploadFoamTex(g){
  const t=g.createTexture(); g.activeTexture(g.TEXTURE0); g.bindTexture(g.TEXTURE_2D,t);
  g.texImage2D(g.TEXTURE_2D,0,g.RGBA,TEXSZ,TEXSZ,0,g.RGBA,g.UNSIGNED_BYTE,TEXDATA());
  g.generateMipmap(g.TEXTURE_2D);
  g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.REPEAT);
  g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.REPEAT);
  g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR_MIPMAP_LINEAR);
  g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR);
  return t;
}
const QDEF=q=>q==='full'
  ? '#define BSTEPS 30\n#define VSTEPS 14\n#define STAPS 3\n'
  : '#define BSTEPS 16\n#define VSTEPS 8\n#define STAPS 1\n';
/* ==================== end verbatim v35 port ==================== */

const TEMPORAL_A = 0.42 // v35 temporal accumulation weight (foam regions only)

// Ambient calm: the demo's resting/idle uniform set. Every expensive shader
// branch (barrel march, volumetric foam ball, spray) is gated off at these
// values, so the background stays cheap.
const CALM = { amp: 0.06, prox: 0, curl: 0, bk: 0, peel: 0, glow: 0 }

function initOcean(cv) {
  const gl = cv.getContext('webgl', { antialias: false, alpha: false })
  if (!gl || gl.isContextLost()) return null
  function sh(g, t, s) {
    const x = g.createShader(t)
    g.shaderSource(x, s)
    g.compileShader(x)
    if (!g.getShaderParameter(x, g.COMPILE_STATUS)) throw new Error(g.getShaderInfoLog(x))
    return x
  }
  const mainTex = uploadFoamTex(gl)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
// ================= r4: HDR PIPELINE SETUP =================
// Feature-detect renderable float color buffers. If absent (old GPUs, locked
// headless), HDRON stays false and the whole page runs the verified v30
// single-pass path — the page NEVER breaks on unsupported hardware.
function probeHDR(){
  const tryType=(type)=>{ if(!type) return false;
    const t=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,4,4,0,gl.RGBA,type,null);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    const fb=gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER,fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
    const ok=gl.checkFramebufferStatus(gl.FRAMEBUFFER)===gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER,null); gl.deleteFramebuffer(fb); gl.deleteTexture(t);
    return ok; };
  const hf=gl.getExtension('OES_texture_half_float');
  gl.getExtension('EXT_color_buffer_half_float');
  const hfLin=!!gl.getExtension('OES_texture_half_float_linear');
  if(hf && tryType(hf.HALF_FLOAT_OES)) return {type:hf.HALF_FLOAT_OES, linear:hfLin, name:'half-float'};
  const ft=gl.getExtension('OES_texture_float');
  gl.getExtension('WEBGL_color_buffer_float');
  const fLin=!!gl.getExtension('OES_texture_float_linear');
  if(ft && tryType(gl.FLOAT)) return {type:gl.FLOAT, linear:fLin, name:'float'};
  return null;
}
const HDRFMT=probeHDR();
const HDRON=!!HDRFMT;
const HDEF=on=>'#define HDRPIPE '+(on?1:0)+'\n';
function mkTex(w,h,type,filt){
  const t=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,t);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,type,null);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,filt);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,filt);
  return t;
}
function mkFB(t){ const f=gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER,f);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null); return f; }
// post programs (compiled once; tiny)
function mkProg(fs){
  const p=gl.createProgram();
  gl.attachShader(p,sh(gl,gl.VERTEX_SHADER,VS));
  gl.attachShader(p,sh(gl,gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));
  gl.useProgram(p);
  const loc=gl.getAttribLocation(p,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const U={}; const n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);
  for(let i=0;i<n;i++){const inf=gl.getActiveUniform(p,i);U[inf.name]=gl.getUniformLocation(p,inf.name);}
  return {p,U};
}
let PB=null;   // post bundle: programs + targets
function buildPost(W,H){
  if(!HDRON) return;
  if(!PB) PB={ bright:mkProg(BRIGHT_FS), blur:mkProg(BLUR_FS), comp:mkProg(COMP_FS), blit:mkProg(BLIT_FS), t:{} };
  const T=PB.t;
  ['scene','bloomA','bloomB','histA','histB'].forEach(k=>{ if(T[k]){gl.deleteTexture(T[k].tex);gl.deleteFramebuffer(T[k].fb);} });
  const qd=4;                                             // 'full' profile: bloom at 1/4 res
  const qW=Math.max(8,W/qd|0), qH=Math.max(8,H/qd|0);
  const filt=HDRFMT.linear?gl.LINEAR:gl.NEAREST;
  T.scene ={tex:mkTex(W,H,HDRFMT.type,gl.NEAREST), w:W, h:H};
  T.bloomA={tex:mkTex(qW,qH,HDRFMT.type,filt), w:qW, h:qH};
  T.bloomB={tex:mkTex(qW,qH,HDRFMT.type,filt), w:qW, h:qH};
  T.histA ={tex:mkTex(W,H,gl.UNSIGNED_BYTE,gl.NEAREST), w:W, h:H};
  T.histB ={tex:mkTex(W,H,gl.UNSIGNED_BYTE,gl.NEAREST), w:W, h:H};
  Object.values(T).forEach(o=>{o.fb=mkFB(o.tex);});
  PB.swap=false;
}
let uRes,uTime,uAmp,uProx,uCurl,uBreak,uGlow,uStatic,uRise,uPeel,mainProg;
function buildMain(){
  const p=gl.createProgram();
  gl.attachShader(p,sh(gl,gl.VERTEX_SHADER,VS));
  gl.attachShader(p,sh(gl,gl.FRAGMENT_SHADER,HDEF(HDRON)+QDEF('full')+FS));
  gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));
  gl.useProgram(p);
  const loc=gl.getAttribLocation(p,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const U=n=>gl.getUniformLocation(p,n);
  uRes=U('uRes');uTime=U('uTime');uAmp=U('uAmp');uProx=U('uProx');uCurl=U('uCurl');
  uBreak=U('uBreak');uGlow=U('uGlow');uStatic=U('uStatic');uRise=U('uRise');uPeel=U('uPeel');
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,mainTex);gl.uniform1i(U('uTex'),0);
  mainProg=p;
}
buildMain();
function size(){const r=cv.getBoundingClientRect();const d=Math.min(devicePixelRatio,1.5);
  cv.width=r.width*d;cv.height=r.height*d;gl.viewport(0,0,cv.width,cv.height);
  buildPost(cv.width,cv.height);}
size();   // resize listener lives in the component effect
// draw one full-screen pass into target (t=null means the canvas)
function pass(prog,target){
  gl.useProgram(prog.p);
  gl.bindFramebuffer(gl.FRAMEBUFFER,target?target.fb:null);
  gl.viewport(0,0,target?target.w:cv.width,target?target.h:cv.height);
  if(prog.U.uRes)gl.uniform2f(prog.U.uRes,target?target.w:cv.width,target?target.h:cv.height);
  gl.drawArrays(gl.TRIANGLES,0,3);
}
function bindU(prog,name,unit,tex){ gl.activeTexture(gl.TEXTURE0+unit); gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.uniform1i(prog.U[name],unit); }

  const state = { rise: 0.05, riseTarget: 0.05, reduced: false }

  // v35 frame body with the demo's hold-to-speak driver replaced by CALM +
  // scroll-eased uRise. HDR pipeline verbatim (bright extract -> two-pass
  // blur -> composite/temporal ping-pong -> blit), single-pass fallback kept.
  function renderFrame(t) {
    gl.useProgram(mainProg)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, mainTex)
    gl.uniform2f(uRes, cv.width, cv.height)
    gl.uniform1f(uTime, t)
    gl.uniform1f(uAmp, CALM.amp)
    gl.uniform1f(uProx, CALM.prox)
    gl.uniform1f(uCurl, CALM.curl)
    gl.uniform1f(uBreak, CALM.bk)
    gl.uniform1f(uGlow, CALM.glow)
    gl.uniform1f(uStatic, state.reduced ? 1 : 0)
    gl.uniform1f(uRise, state.rise)
    gl.uniform1f(uPeel, CALM.peel)
    if (HDRON) {
      const T = PB.t
      gl.bindFramebuffer(gl.FRAMEBUFFER, T.scene.fb)
      gl.viewport(0, 0, T.scene.w, T.scene.h)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.useProgram(PB.bright.p)
      bindU(PB.bright, 'uScene', 1, T.scene.tex)
      pass(PB.bright, T.bloomA)
      gl.useProgram(PB.blur.p)
      bindU(PB.blur, 'uScene', 1, T.bloomA.tex)
      gl.uniform2f(PB.blur.U.uDir, 1, 0)
      pass(PB.blur, T.bloomB)
      bindU(PB.blur, 'uScene', 1, T.bloomB.tex)
      gl.uniform2f(PB.blur.U.uDir, 0, 1)
      pass(PB.blur, T.bloomA)
      const hR = PB.swap ? T.histA : T.histB
      const hW = PB.swap ? T.histB : T.histA
      gl.useProgram(PB.comp.p)
      bindU(PB.comp, 'uScene', 1, T.scene.tex)
      bindU(PB.comp, 'uBloom', 2, T.bloomA.tex)
      bindU(PB.comp, 'uHist', 3, hR.tex)
      gl.uniform1f(PB.comp.U.uTime, t)
      gl.uniform1f(PB.comp.U.uBreak, CALM.bk)
      gl.uniform1f(PB.comp.U.uTempo, state.reduced ? 0 : TEMPORAL_A)
      pass(PB.comp, hW)
      gl.useProgram(PB.blit.p)
      bindU(PB.blit, 'uScene', 1, hW.tex)
      pass(PB.blit, null)
      PB.swap = !PB.swap
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, cv.width, cv.height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
  }

  return { gl, size, state, renderFrame }
}

// Scroll progress -> sun elevation. Opens pre-dawn (sun barely peeking),
// full sunrise at page bottom; ^0.85 ease moves the sun noticeably early.
function riseFromScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  return 0.05 + Math.pow(p, 0.85) * 0.95
}

const FROZEN_T = 7 // fixed shader time for the reduced-motion static frame

const OceanCanvas = () => {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return undefined
    let disposed = false
    let cleanup = null

    const start = () => {
      let ocean = null
      try {
        ocean = initOcean(cv)
      } catch {
        ocean = null
      }
      if (!ocean) {
        setFailed(true)
        return
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ocean.state.reduced = reduced
      ocean.state.riseTarget = riseFromScroll()
      ocean.state.rise = ocean.state.riseTarget

      let raf = 0
      let scrollRaf = 0
      const t0 = performance.now()
      let last = t0

      const drawStatic = () => {
        ocean.state.rise = ocean.state.riseTarget
        ocean.renderFrame(FROZEN_T)
      }

      const loop = () => {
        const now = performance.now()
        const dt = Math.min((now - last) / 1000, 0.1)
        last = now
        ocean.state.rise += (ocean.state.riseTarget - ocean.state.rise) * (1 - Math.exp(-dt * 4))
        ocean.renderFrame((now - t0) / 1000)
        raf = requestAnimationFrame(loop)
      }

      const onScroll = () => {
        if (scrollRaf) return
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0
          ocean.state.riseTarget = riseFromScroll()
          if (reduced) drawStatic()
        })
      }

      const onResize = () => {
        ocean.size()
        if (reduced) drawStatic()
      }

      const onVis = () => {
        if (reduced) return
        if (document.hidden) {
          cancelAnimationFrame(raf)
          raf = 0
        } else if (!raf) {
          last = performance.now()
          raf = requestAnimationFrame(loop)
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      document.addEventListener('visibilitychange', onVis)

      if (reduced) drawStatic()
      else raf = requestAnimationFrame(loop)

      cleanup = () => {
        cancelAnimationFrame(raf)
        cancelAnimationFrame(scrollRaf)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        document.removeEventListener('visibilitychange', onVis)
        const lose = ocean.gl.getExtension('WEBGL_lose_context')
        if (lose) lose.loseContext()
      }
    }

    // StrictMode re-runs the effect on the same canvas after cleanup lost the
    // context; restore it first, then init on the restored event.
    const probe = cv.getContext('webgl', { antialias: false, alpha: false })
    if (!probe) {
      setFailed(true)
    } else if (probe.isContextLost()) {
      const lose = probe.getExtension('WEBGL_lose_context')
      if (!lose) {
        setFailed(true)
      } else {
        cv.addEventListener(
          'webglcontextrestored',
          () => {
            if (!disposed) start()
          },
          { once: true }
        )
        lose.restoreContext()
      }
    } else {
      start()
    }

    return () => {
      disposed = true
      if (cleanup) cleanup()
    }
  }, [])

  // No WebGL → static SVG wave scene instead of empty darkness
  if (failed) {
    return (
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <WaveScene variant="night" />
      </div>
    )
  }
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default OceanCanvas
