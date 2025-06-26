# mini-blog-frontend

src/
└── app/
├── admin/ # Admin dashboard to create, update, delete posts
│ └── page.js
├── Components/ # Reusable UI components like Navbar
│ └── Navbar.jsx
├── posts/ # Dynamic routing for viewing individual posts
│ └── [id]/  
 │ └── page.js
├── redux/ # Redux store configuration
│ ├── action.js # Contains action creators for CRUD operations
│ ├── reducer.js # Reducer to manage state
│ └── store.js # Redux store setup
├── App.css # Custom styles
├── favicon.ico # App favicon
├── globals.css # Global styles (Tailwind base if used)
├── layout.js # Root layout (Next.js App Router)
├── page.js # Homepage that lists all blog posts
└── Providerredux.js # Redux provider to wrap the application
