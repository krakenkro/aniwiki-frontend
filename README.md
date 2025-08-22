# AniWiki Frontend

## Repositories
- **Frontend:** (this repository)  
- **Backend:** [AniWiki Backend](https://github.com/krakenkro/aniwiki-backend)

## Project Description

The AniWiki frontend is a React application that provides a user-friendly interface for browsing and searching anime, manga, and character information. It communicates with the AniWiki backend server to fetch data and offers features like regular search and AI-powered smart search.

### Key Features

- Browse anime with pagination
- Search for anime, manga, and characters
- View detailed information about anime, manga, and characters
- AI-powered smart search using natural language
- Responsive design for all devices
- Material UI components with Tailwind CSS for styling

## Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- AniWiki backend server running (see backend README)

### Installation Steps

1. Clone the repository (if you haven't already)
```
git clone https://github.com/krakenkro/aniwiki-frontend
cd aniwiki/frontend
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

The application will be available at http://localhost:3000 and will automatically proxy API requests to the backend server at http://localhost:3001.

## Architecture and Design

### Application Structure

The frontend follows a component-based architecture using React and TypeScript:

- **src/components/**: Reusable UI components
- **src/pages/**: Page components for different routes
- **src/services/**: API services for communicating with the backend
- **src/App.tsx**: Main application component with routing setup

### Routing

The application uses React Router for navigation with the following routes:

- `/`: Home page
- `/anime/:id`: Anime details page
- `/manga/:id`: Manga details page
- `/character/:id`: Character details page
- `/search`: Search page
- `/ai-search`: AI-powered search page

### Component Structure

- **Header**: Navigation bar with links and search input
- **Footer**: Footer with links and information
- **AnimeCard**: Card component for displaying anime information
- **Pagination**: Component for handling pagination
- **AISearchPage**: Page for AI-powered search

### API Integration

The frontend communicates with the backend using Axios. The API service is defined in `src/services/api.ts` and includes methods for:

- Fetching anime, manga, and character data
- Searching for anime, manga, and characters
- AI-powered search

## Technical Stack Justification

### React + TypeScript

We chose React for its component-based architecture and wide adoption in the industry. TypeScript adds static typing, which helps catch errors during development and improves code quality.

### Material UI + Tailwind CSS

Material UI provides a set of pre-designed components that follow Material Design guidelines, which helps create a consistent and professional-looking UI. Tailwind CSS allows for rapid styling and customization without writing custom CSS.

### React Router

React Router is the standard routing library for React applications. It provides declarative routing and supports nested routes, which is perfect for our application structure.

### Axios

Axios is used for making HTTP requests to the backend. It provides a simple API, supports request/response interception, and has good error handling.

## Design Decisions and Compromises

### Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)

We chose Client-Side Rendering (CSR) with React instead of Server-Side Rendering (SSR) with Next.js for simplicity and faster development. While SSR would provide better SEO and initial load performance, CSR is sufficient for our MVP and allows for a simpler architecture.

### Material UI vs. Custom Components

We chose Material UI for its pre-designed components, which allowed us to build the UI faster. While custom components would provide more flexibility and potentially better performance, Material UI's components are sufficient for our needs and follow best practices for accessibility and usability.

### API Proxy

The frontend uses a proxy configuration to forward API requests to the backend. This approach simplifies CORS handling and keeps the API URL consistent across environments.

## Known Issues and Limitations

### Performance

The application may experience performance issues when loading large lists of anime or when the backend is slow to respond. Consider implementing virtualization for long lists and adding loading indicators.

### Browser Compatibility

The application is primarily tested on modern browsers (Chrome, Firefox, Safari). It may have issues on older browsers or browsers with limited JavaScript support.

### Mobile Responsiveness

While the application is designed to be responsive, some components may not be optimized for very small screens or touch interactions.
