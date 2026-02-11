# Career Maniacs Testimonials Research

## WordPress Site Analysis

### Site Structure
- URL: https://www.careermaniacs.com
- WordPress site with testimonials displayed on homepage
- Testimonials section shows client quotes in a carousel/slider format

### Current Testimonials Found
Based on the site content, the following testimonials are available:

1. **Justin P. H** - Director of Strategic Sales at Neuron7.ai
   - Quote: "I connected with Jeff in 2023 with the goal of standing out as a top Enterprise Sales candidate in a hyper-competitive market..."

2. **Charles N** - AE at TitanX
   - Quote: "I reached out to Jeff last year with the relatively modest goal of polishing up my resume..."

3. **Paul D** - Regional Sales Manager at Kumo
   - Quote: "Jeff is one of the most authentic people I know and genuinely seeks to help from his heart..."

4. **Justin H** - Regional Sales Manager at Splunk
   - Quote: "Jeff's coaching has had an incredible impactful for my professional development..."

5. **John K** - Manager Customer Success at Vibes
   - Quote: "I had the privilege of working with Jeff during a particularly challenging time(2020 and mass layoffs)..."

### WordPress REST API Analysis
- Standard WordPress installation
- Available post types: post, page, attachment, nav_menu_item, wp_block, wp_template, wp_template_part, wp_navigation
- **No custom testimonials post type found**
- Testimonials appear to be embedded directly in page content (likely via Elementor or similar page builder)

### Implementation Strategy
Since there's no dedicated testimonials custom post type, the testimonials are likely:
1. Hard-coded in the page content
2. Managed through a page builder (Elementor)
3. Stored as custom fields or in a plugin

For the new site, we'll create a static testimonials system with the existing testimonial data and implement the modal functionality as specified in the master prompt.

### Testimonials Data Model
```javascript
[
  {
    "id": "justin-ph",
    "author": "Justin P. H, Director of Strategic Sales at Neuron7.ai",
    "headline": "A transformative journey that redefined how I view my career, capabilities, and potential.",
    "full": "I connected with Jeff in 2023 with the goal of standing out as a top Enterprise Sales candidate in a hyper-competitive market. What I received was far more than I could have anticipated: a transformative journey that redefined how I view my career, my capabilities, and my potential. Jeff doesn't just polish resumes or refine interview techniques—he reshapes how you see yourself. His unique ability to dig deep and uncover the heart of your story is nothing short of remarkable. With Jeff, it's not just about landing a job; it's about becoming the version of yourself that others can't ignore. What sets Jeff apart is his relentless commitment to your success. He approaches every client with the precision of a master strategist and the empathy of a trusted confidant. His insights were so tailored and impactful that it often felt like he knew me better than I knew myself. With Jeff in your corner, you gain not just a coach but a partner who invests wholly in your journey."
  },
  // ... additional testimonials
]
```
