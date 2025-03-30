# Himalayan Adventure - Frontend

> **Warning**
> Make sure to lint and format before pushing the code. Since husky is setup, it will run the lint and format scripts before pushing the code.

Please follow the instructions below to setup the frontend of the project.

- `npm install -g pnpm` to install pnpm globally.
- `pnpm i` to install all the dependencies.
- `pnpm dev` to start the development server.

### Tech used in frontend

- Nextjs app directory
- Server actions for mutation
- Typescript, TailwindCSS
- Shadcn/ui
- Pnpm as package manager
- Husky for pre-commit hooks

### File structure and naming conventions

- all files in **lower-camel-case** or **kebab-case** (eg: use-breakpoints.tsx, get-user-analytics.tsx)
- _`src/actions`_ for server actions
- _`src/validators`_ for all the validation schemas
- _`/src/components`_ strictly for reusable components only, if a component is used only once, it should be in the same file as the page.tsx inside app directory
- _`/src/components/ui`_ for shadcn/ui components or similar custom components
- _`/src/components/icons`_ for all the icons that aren't imported from a library
- _`/src/lib`_ for libraries configuration or utlities
- _`/src/utils`_ strictly for helper functions or utility functions
- _`/src/hooks`_ for custom hooks
- _`/src/types`_ for declaring types and interfaces. Keep it under appropriate folder (eg: /types/news/index.ts, /types/blog/index.ts)
- _`/src/providers`_ for context providers
- _`/src/config`_ for constants and configuration
- _`/src/store`_ for state management (zustand)
- `index.d.ts` for global utility types and modules declaration

<br />
<hr />

### Commit Lint Conventions

- `build`: When making changes related to build system or tools.
- `chore`: General maintenance or tasks that aren’t user-facing.
- `ci`: Changes to Continuous Integration (CI) configuration or scripts.
- `docs`: Updates or additions to documentation.
- `feat`: New feature additions or enhancements.
- `fix`: For bug fixes or resolving issues.
- `perf`: Changes aimed at improving performance.
- `refactor`: Code changes that don’t affect external behavior but enhance code structure.
- `revert`: Reverting previous commits.
- `style`: Changes in code style or formatting (not affecting functionality).
- `test`: Adding or modifying tests
