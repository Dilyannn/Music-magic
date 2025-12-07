<!-- markdownlint-disable -->
# Music Magic - Technical Documentation

## Application Architecture

### 1. Directory Structure
```
client/src/
├── components/         # UI Components
│   ├── auth/           # Login, Register forms
│   ├── catalog/        # Catalog, Details, Create, Edit pages
│   ├── common/         # Shared components (NavBar, Footer, Spinner)
│   ├── guard/          # Route protection components
│   └── home/           # Landing page components
├── contexts/           # React Context definitions (UserContext)
├── hooks/              # Custom React Hooks
├── utils/              # Utility functions
├── App.jsx             # Main Router configuration
└── main.jsx            # Application entry point
```

### 2. Routing & Navigation
The application uses `react-router` for client-side routing.
- **Public Routes**: Home (`/`), Catalog (`/catalog`), Details (`/catalog/:id`), About, Contact.
- **Guest Routes**: Login (`/auth/login`), Register (`/auth/register`). *Accessible only to non-authenticated users.*
- **Private Routes**: Create (`/create`), Edit (`/edit/:id`). *Accessible only to authenticated users.*

**Route Guards**:
The `RouteGuard` component handles access control.
- It checks the `isAuthenticated` flag from `UserContext`.
- If a user tries to access a private route while logged out, they are redirected to Login.
- If a logged-in user tries to access guest routes (like Login), they are redirected to Home.

### 3. State Management
**UserContext** (`src/contexts/UserContext.jsx`) is the primary global state.
- It manages the current user's session (email, id, accessToken).
- It persists user state to `localStorage` to maintain sessions across refreshes.
- It exposes `loginHandler`, `registerHandler`, and `logoutHandler` to components.

---

## API Communication

### `useRequest` Hook
All HTTP requests to the backend are handled by the custom `useRequest` hook (`src/hooks/useRequest.jsx`).

**Features:**
- **Base URL**: Configured to `http://localhost:3030`.
- **Automatic Headers**: Automatically attaches `Content-Type: application/json` for data requests.
- **Authentication**: Automatically attaches the `X-Authorization` header if a user is logged in.
- **AbortController**: Implements `AbortController` to cancel pending requests if a component unmounts, preventing memory leaks and "state update on unmounted component" errors.
- **Error Handling**: Returns an `error` object that components can use to show UI feedback or redirect (e.g., to 404).

**Usage Example:**
```javascript
const { request } = useRequest();
// GET request
const data = await request('/data/music', 'GET');
// POST request
await request('/data/music', 'POST', { title: 'Song Name' });
```

### External APIs
- **Lyrics API**: The application integrates with `https://api.lyrics.ovh/v1/` to fetch song lyrics dynamically based on the Artist and Title. This is handled in the `Lyrics.jsx` component.

---

## Key Components

### 1. Catalog & Details
- **Catalog**: Fetches all music records from `/data/music` and renders them as `MusicCard` components.
- **Details**: Fetches specific record details. It acts as a container for:
    - **Lyrics**: Fetches lyrics from the external API.
    - **Comments**: Fetches and posts comments to `/data/comments`.

### 2. Authentication Forms
- **Login/Register**: Uses a custom `useForm` hook to manage form state and submission. On success, it calls the context handlers to update the global user state.

### 3. CRUD Operations
- **Create/Edit**: Protected forms that allow users to add or modify records.
- **Delete**: Implemented in `Details.jsx`, allows the owner of a record to remove it.

---

## Setup & Running

1. **Install Dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```
