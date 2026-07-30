# CoursIQ Admin

CoursIQ Admin is a modern web application admin dashboard built with Next.js 16, React 19, and Tailwind CSS 4. This repository contains the user interface and frontend logic for the CoursIQ admin panel.

## Features

- **Next.js App Router**: Utilizes the latest Next.js 16 features for optimized routing, server-side rendering, and static site generation.
- **Modern UI**: Styled with Tailwind CSS 4 for a responsive, accessible, and highly customizable design.
- **Icons**: Integrates `lucide-react` for clean and consistent iconography.
- **Testing**: Configured with Jest and React Testing Library for comprehensive component and unit testing.
- **Code Quality**: Enforces strict code quality with ESLint and TypeScript.

## Folder Structure

The project follows a feature-based architecture for better scalability and maintainability:

```text
coursiq-admin/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   └── features/         # Feature-specific components, hooks, and logic
├── .gitignore            # Git ignored files
├── eslint.config.mjs     # ESLint configuration
├── jest.config.ts        # Jest test runner configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Setup Instructions

### Prerequisites

- Node.js 20 or higher
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd coursiq-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development Server

To start the development server locally, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page will auto-update as you edit the source files.

## Environment Variables

Create a `.env.local` file in the root directory of the project to store your environment variables. 

Example `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Authentication (if applicable)
# NEXT_PUBLIC_AUTH_DOMAIN=...
```

*Note: Variables prefixed with `NEXT_PUBLIC_` will be exposed to the browser.*

## Testing

The project uses Jest and React Testing Library for running tests.

- Run all tests:
  ```bash
  npm test
  ```
- Run tests in watch mode (ideal for development):
  ```bash
  npm test -- --watch
  ```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

After building, you can start the production server with:

```bash
npm run start
```

### Deploying to Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Import your project into Vercel.
3. Configure your Environment Variables in the Vercel dashboard.
4. Vercel will automatically detect that it's a Next.js project and deploy it.

For more details on deploying Next.js applications, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
