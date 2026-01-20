# Frontend Test ITX

🚀 **Demo:** [https://itx-frontend-test.vercel.app/](https://itx-frontend-test.vercel.app/)

Web application for purchasing mobile devices, built with React and TypeScript. The project implements a modern SPA architecture with state management, caching system, and data validation.

## System Requirements

- Node.js version 18 or higher
- pnpm (recommended) or npm as package manager

## Installation and Setup

To start working with the project, install dependencies using pnpm:

```bash
pnpm install
```

To customize the API URL, copy the environment variables example file:

```bash
cp .env.example .env
```

## Available Scripts

The project includes the following commands:

**Development**

```bash
pnpm dev
```

Starts the development server with hot reload at http://localhost:5173

**Build**

```bash
pnpm build
```

Compiles the project for production in the dist/ folder

**Linting**

```bash
pnpm lint
```

Runs ESLint to check code quality

**Preview**

```bash
pnpm preview
```

Previews the compiled version locally

**Tests**

```bash
pnpm test
```

Runs the project tests

## Project Structure

The application is organized following a modular architecture:

```
src/
├── components/       Reusable UI components
├── pages/           Main views (product list and detail)
├── context/         Global state (cart)
├── services/        API integration
├── utils/           Utilities and cache system
└── schemas/         Data validation with Zod
```

### Main Components

Components are designed to be reusable and maintain clear separation of concerns:

- Header: Navigation with breadcrumbs and shopping cart
- SearchBar: Real-time product search
- ProductGrid and ProductItem: Product list display
- ProductImage, ProductDescription and ProductActions: Product detail
- CartDrawer: Cart side panel

## Tech Stack

The project uses modern technologies that ensure performance and maintainability:

- React 19 with TypeScript for interface development
- Vite as build tool and development server
- React Router v7 for page navigation
- Tailwind CSS v4 for styling
- Zod for runtime data validation
- Axios for HTTP requests
- ESLint to maintain code quality

## Implemented Features

- **SPA Navigation** with React Router without page reloads
- **Real-time search** by brand and model
- **Custom cache system** with localStorage (1h expiration, automatic cleanup)
- **Shopping cart** with Context API and local persistence
- **Data validation** with Zod for runtime type safety
- **Responsive design** adapted to mobile and desktop

> **Note:** For production, TanStack Query is recommended instead of the custom cache system. The current one is an educational implementation that demonstrates fundamental concepts, made specifically for this test.

## API Integration

The application consumes a REST API with the following endpoints:

- GET /api/product - Gets the complete product list
- GET /api/product/:id - Gets details of a specific product
- POST /api/cart - Adds a product to the cart

The base URL should be configured to https://itx-frontend-test.onrender.com/api

All endpoints are centralized in the services file, avoiding magic strings and facilitating maintenance.

## User Flow

1. User accesses the main page and views the product catalog
2. Can use the search to filter by brand or model
3. Clicking on a product accesses the detail page
4. Selects available color and storage options
5. Adds the product to the cart
6. Cart counter updates automatically and the cart is displayed

## Technical Considerations

**Environment Variables**

URLs and sensitive configurations are managed through environment variables. The .env.example file serves as a template and documentation of required variables.

**Type Organization**

TypeScript types are automatically inferred from Zod schemas, ensuring synchronization between validation and typing. Schemas are centralized in the schemas/ folder, separated by domain (product, cart, API).

## Future Improvements Suggested

The project meets all technical test requirements and its scope is appropriate for this type of test. For a production project, the following could be considered:

- Implement Error Boundary to catch React errors with a fallback UI
- Add component tests with React Testing Library
- Improve accessibility with ARIA labels and full keyboard navigation support
- Optimize performance with code splitting and lazy loading of components
- Implement Tailwind CSS variables for consistent theming (colors, spacing, typography)
