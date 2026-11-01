
# BookNook — A Small Online Library

BookNook is a responsive online library application where readers can discover books, contribute to a shared collection, borrow available copies, and return books. It includes secure authentication, personal book management, and a MongoDB-powered borrowing system.

## Live Links

- Live Website: https://booknook-client-mu.vercel.app
- Frontend Repository: https://github.com/ariful-arif124/booknook-client
- Backend Repository: https://github.com/ariful-arif124/booknook-server
- Backend API: https://booknook-server-vkiu.onrender.com
- API Health Check: https://booknook-server-vkiu.onrender.com/health

## Features

- **Responsive Design:** A modern, responsive interface for mobile, tablet, and desktop devices.
- **Interactive Homepage:** Three-slide Swiper carousel, dynamic New Arrivals, book categories, and additional informational sections.
- **Dynamic Book Collection:** Browse and search books loaded directly from MongoDB.
- **Secure Authentication:** Email/password login and Google OAuth using Better Auth and the MongoDB adapter.
- **Add Books:** Authenticated users can contribute books with titles, authors, categories, descriptions, available copies, and cover images uploaded through ImgBB.
- **Manage My Books:** Users can edit or delete books they contributed, with ownership checks and confirmation dialogs.
- **Borrow Books:** Members can borrow available books, with JWT-protected requests and automatic inventory updates.
- **Prevent Duplicate Borrowing:** Users cannot borrow the same book twice while an active loan exists.
- **Return Books:** Members can return borrowed books, restore available inventory, and view borrowing history.
- **Personal Dashboards:** My Books and My Borrows show user-specific records.
- **User Feedback:** Toast notifications, loading indicators, empty states, and a custom not-found page.
- **Persistent Sessions:** Authentication remains active after refreshing protected pages.

## Technology Stack

### Frontend

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui and Base UI
- Swiper.js
- Lucide React
- Sonner

### Authentication and Security

- Better Auth
- MongoDB Adapter
- Google OAuth
- JSON Web Tokens (JWT)
- Jose JWT verification
- Protected API routes and resource ownership checks

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Node.js Driver

### External Services

- Vercel — Frontend hosting
- Render — Backend hosting
- MongoDB Atlas — Database
- ImgBB — Book-cover image hosting

## Core Pages

| Route | Description |
| --- | --- |
| `/` | Homepage with featured books and New Arrivals |
| `/books` | Browse and search books |
| `/books/[id]` | View individual book details |
| `/login` | Email and Google login |
| `/register` | User registration |
| `/add-book` | Add a book |
| `/my-books` | Manage contributed books |
| `/my-borrows` | View borrowing history and return books |

Book creation, management, borrowing, and returning require authentication.

## Backend API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a single book |
| POST | `/books` | Add a new book |
| PATCH | `/books/:id` | Update an owned book |
| DELETE | `/books/:id` | Delete an owned book |
| POST | `/borrows` | Borrow a book |
| GET | `/borrows` | Retrieve the current user's borrowing records |
| DELETE | `/borrows/:id` | Return a borrowed book |

Protected endpoints require a valid JWT.

## Run Locally

### 1. Clone the repositories

Frontend:

    git clone https://github.com/ariful-arif124/booknook-client.git
    cd booknook-client
    npm install

Backend:

    git clone https://github.com/ariful-arif124/booknook-server.git
    cd booknook-server
    npm install

### 2. Configure environment variables

Create a `.env.local` file in the frontend project:

    MONGODB_URI=
    BETTER_AUTH_SECRET=
    BETTER_AUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    IMGBB_API_KEY=
    BOOKNOOK_API_URL=http://localhost:5000
    NEXT_PUBLIC_BOOKNOOK_API_URL=http://localhost:5000

Create a `.env` file in the backend project:

    PORT=5000
    MONGODB_URI=
    AUTH_BASE_URL=http://localhost:3000
    CLIENT_URL=http://localhost:3000

Provide your own credentials for MongoDB Atlas, Better Auth, Google OAuth, and ImgBB.

Never commit `.env` or `.env.local` files to GitHub.

### 3. Start the backend

From the backend directory:

    node index.js

The backend runs at http://localhost:5000.

### 4. Start the frontend

From the frontend directory:

    npm run dev

Open http://localhost:3000 in your browser.

## Security and Borrowing Rules

- Private API operations require JWT authentication.
- Users can only edit and delete books they own.
- Users can only access and return their own borrowing records.
- Borrowing reduces available copies by one.
- Returning restores one available copy.
- Books cannot be borrowed when no copies are available.
- Duplicate active borrowing is prevented.
- Books with outstanding loans cannot be deleted.

## Deployment

The frontend is deployed on Vercel, and the Express backend is deployed on Render.

Production credentials and URLs are managed through the hosting platforms' environment variable settings.

## Project Purpose

BookNook was developed as a full-stack web development assignment demonstrating frontend development, secure authentication, REST API integration, MongoDB CRUD operations, and real-world deployment.

## License

This project was developed for educational purposes.
