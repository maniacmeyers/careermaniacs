# Text gradient integration

Component: `src/components/ui/text-gradient.tsx`. Demo: `src/components/ui/text-gradient-demo.tsx`. Styles: `src/App.css`.

The existing shadcn aliases map `@/components/ui` to `src/components/ui`; there is no need for a second root-level components folder. Tailwind and Vite React are already configured. Vite compiles the new TSX files alongside the existing JSX. `tsconfig.json` checks only these new typed components and permits the existing JavaScript utility import.

The supplied `motion/react` import is adapted to the already installed `framer-motion`, which supplies the same APIs used here. No additional provider, imagery or icon is required. The existing app MotionConfig remains in place; this component also listens for live reduced-motion changes.

Type check without changing dependencies:

```sh
rtk proxy npx --yes --package typescript@5.9.3 tsc -p tsconfig.json
```

For a permanent local type-checker installation, use the existing package manager: `rtk proxy pnpm add -D typescript@5.9.3`, then `rtk proxy pnpm exec tsc -p tsconfig.json`. A whole-site TypeScript migration is not required for this component.

Props retain children, as, className, colors, duration, angle and transition. Added paused for the shared homepage control. Default palette is mint, pale ocean blue and peach; default cycle is eight seconds. Motion runs only while visible and stops under reduced motion. High-contrast mode uses solid system text.
