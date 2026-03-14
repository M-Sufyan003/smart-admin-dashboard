# Smart Admin Dashboard

Smart Admin Dashboard is a modern **Single Page Application (SPA)** built using **React with Vite**.  
It demonstrates a professional frontend architecture including modular components, responsive layout, API integration, lazy-loaded routes, and performance optimizations.

The project simulates a real-world admin panel where users can view dashboard statistics, manage data, filter information dynamically, and interact with modern UI components.

---

## Live Demo

*(Add your deployed link here later)*



## Tech Stack

- React
- Vite
- React Router (SPA Routing)
- Axios (API requests)
- React Icons
- ScrollReveal (UI animations)
- CSS Modules
- JavaScript (ES6+)

---

## Key Features

### Single Page Application (SPA)
The dashboard uses **React Router** to enable smooth client-side navigation without page reloads.

### Lazy Loading
Application pages are loaded using **React.lazy() and Suspense** to improve performance and reduce initial bundle size.

### Responsive Dashboard Layout
The layout includes:

- Collapsible sidebar navigation
- Top navigation bar
- Dashboard summary cards
- Data table section

The interface is fully responsive across **desktop, tablet, and mobile devices**.

### Mock API Integration

This project uses **JSONPlaceholder**, a free fake REST API for testing and prototyping.

https://jsonplaceholder.typicode.com

### Search and Filtering
Users can filter table data in real time using a search input without refreshing the page.

### Modal Form with Validation
The dashboard includes a modal form for adding new users with basic input validation.

### Dark / Light Theme
Users can toggle between dark and light themes for improved accessibility and user experience.

### Scroll Animations
UI components appear with smooth animations using **ScrollReveal**.

### Startup Loader
When the application loads, a loader screen appears displaying the project title:

Smart Admin Dashboard

---

## Project Structure

```

smart-admin-dashboard
│
├── public
│
├── src
│   │
│   ├── assets
│   │
│   ├── components
│   │   ├── Loader
│   │   ├── Sidebar
│   │   ├── Navbar
│   │   ├── SummaryCards
│   │   ├── SearchBar
│   │   ├── DataTable
│   │   └── AddUserModal
│   │
│   ├── pages
│   │   ├── Dashboard
│   │   ├── Users
│   │   ├── Tasks
│   │   ├── Reports
│   │   └── Settings
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── hooks
│   │
│   ├── context
│   │
│   ├── router
│   │
│   ├── styles
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md

```

---

## Installation

Clone the repository:

```

git clone https://github.com/M-Sufyan003/smart-admin-dashboard.git

```

Navigate to the project directory:

```

cd smart-admin-dashboard

```

Install dependencies:

```

npm install

```

Run the development server:

```

npm run dev

```

The application will start on the local development server.

---

## Build for Production

To create a production build:

```

npm run build

```

Preview the production build locally:

```

npm run preview

```

---

## Deployment

This project can be deployed easily on modern frontend hosting platforms such as:

- Vercel
- Netlify

Build settings:

Build command:

```

npm run build

```

Output directory:

```

dist

```

---

## Learning Objectives

This project demonstrates practical skills in:

- Modern React development
- SPA architecture
- API integration
- Component-based design
- Responsive UI development
- Performance optimization techniques
- Git version control workflows

---

## Future Improvements

Possible enhancements for this project:

- Dashboard analytics charts
- Pagination for table data
- Role-based user management
- Backend integration
- Authentication system
- Advanced filtering and sorting

---

## License

This project is licensed under the MIT License.