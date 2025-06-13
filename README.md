# Task Manager Application

A modern task management application built with Next.js, React, and TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) (recommended)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/SaketBhatnagar/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Or using pnpm (recommended)
   pnpm install
   ```

3. **Start the development server**

   ```bash
   # Using npm
   npm run dev

   # Or using pnpm
   pnpm dev
   ```

4. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` or `pnpm dev` - Starts the development server
- `npm run build` or `pnpm build` - Builds the application for production
- `npm run start` or `pnpm start` - Runs the built application
- `npm run lint` or `pnpm lint` - Runs ESLint to check for code issues

## Project Structure

```
task-manager/
├── app/              # Next.js app directory (pages and API routes)
├── components/       # React components
├── lib/             # Utility functions and shared code
├── hooks/           # Custom React hooks
├── public/          # Static assets
└── styles/          # Global styles and Tailwind CSS configuration
```

## Features

- Task creation and management
- Drag and drop interface
- Real-time updates
- Responsive design
- Modern UI with Tailwind CSS

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components
- [React Query](https://tanstack.com/query) - Data fetching
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

## Contributing

1. Create a new branch for your feature

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them

   ```bash
   git commit -m "Add your feature"
   ```

3. Push to your branch

   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request

## License

This project is private and confidential.
