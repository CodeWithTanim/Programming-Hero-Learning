# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform 🎬📸

> **Live Website Link**: [https://studiospace-tau.vercel.app](https://studiospace-tau.vercel.app)  
> **Live Backend API**: [https://studiospace-server-alpha-eight.vercel.app](https://studiospace-server-alpha-eight.vercel.app)  
> *(Local Client: http://localhost:3000 | Local Server: http://localhost:8000)*

---

## 🌟 Overview & Theme
**StudioSpace** is a high-performance peer-to-peer creative workspace and production studio marketplace built for photographers, cinema filmmakers, audio engineers, podcasters, and visual artists. Studio owners and verified hosts list spaces—ranging from photography cyc walls and cinema sound stages to turnkey podcast broadcast lounges and music recording suites. Fellow creators discover spaces, inspect dynamic availability, prevent double bookings, and reserve studio slots with transparent pricing and real-time reservation management.

---

## ✨ Key Features (Highlights)
1. **Interactive Multi-Slide Hero Showcase**: Engaging auto-advancing carousel built with Shadcn UI and Embla Carousel featuring cinematic visuals, high-impact punchy headlines, and direct call-to-action triggers ("Explore Studios" & "Host Your Space").
2. **Dynamic MongoDB Featured Showcase (`.limit(6)`)**: Automatically retrieves the top-rated creative workspaces with custom category badges, hourly rates, location tags, verified ratings, and wishlist toggles.
3. **Comprehensive Search & Category Filtering**: Instantly search by title, equipment, or address and filter seamlessly across 5 creative disciplines (*Photo Studios, Sound Stages, Podcast Lounges, Music Suites, Art Workshops*) with instant empty-state feedback.
4. **Interactive Studio Booking Modal & Overlap Prevention (Challenge 2)**: Dynamic hourly calculation, refundable security deposit tallying, and real-time backend double-booking detection preventing scheduling collisions against confirmed slots.
5. **Full Host Lifecycle & Protected Studio CRUD**:
   - `/add-studio`: Create listings with ImgBB image uploading, multi-tag amenity selection, pricing breakdown, and read-only host credentials.
   - `/my-listings`: Manage spaces in responsive table/card views with pre-delete confirmation modal dialogs.
   - `/studios/edit/[id]`: Pre-filled modification form updating MongoDB via PATCH.
6. **My Bookings Manager & PDF Invoice Generator (Optional Requirement 1)**: Track reservations across `Pending`, `Confirmed`, `Completed`, and `Cancelled` states, cancel pending slots, and download official branded PDF booking receipts powered by `jspdf`.
7. **Saved Studios Wishlist (Optional Requirement 2)**: One-click heart icon bookmarking synced directly to MongoDB Atlas collections.
8. **JWT Security with HTTPOnly Cookies (Challenge 1)**: Sensitive server-side mutations (`POST /api/studios`, `DELETE /api/studios/:id`, `POST /api/bookings`, `PATCH /api/bookings/:id/cancel`) are safeguarded by cryptographically signed JWTs stored in HTTPOnly cookies.
9. **Full System Theme Customization (Challenge 3)**: Persistent, smooth dark/light mode toggle with Tailwind CSS and NextThemes affecting the entire platform.
10. **Zero Lorem Ipsum & Modern Toast Feedback**: Standardized Sonner notifications across all CRUD, auth, and booking actions, plus custom modal dialogs.

---

## 🛠️ Tech Stack

### Client-Side (Frontend)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons, tw-animate-css
- **UI Components**: Shadcn UI, Embla Carousel, Radix/Base-UI Primitives
- **Authentication**: BetterAuth with MongoDB Adapter & Google OAuth
- **Notifications**: Sonner (Modern Toast Components)
- **Theming**: Next-Themes (Dark/Light Mode)
- **PDF Generation**: jsPDF

### Server-Side (Backend)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas (Native MongoDB Driver 7.8+)
- **Security**: JWT (JSON Web Tokens) with HTTPOnly Cookie Verification
- **CORS**: Credential-enabled Cross-Origin Resource Sharing
- **File Upload**: ImgBB API Integration

---

## 🧑‍💻 Examiner Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Demo Host / Verified Examiner** | `host@studiospace.com` | `StudioPass2026!` |
| **Demo Creator Account** | `creator@studiospace.com` | `StudioPass2026!` |

> **Note**: You can also register a brand new account on the `/signup` page with any email. Password validation requires at least 1 uppercase letter, 1 lowercase letter, and at least 6 characters.

---

## 🚀 Local Setup Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### 2. Backend Setup (`StudioSpace-Server`)
```bash
cd StudioSpace-Server
npm install

# Verify your .env file:
# MONGODB_URI=mongodb://StudioSpace-User:dCTD7CEI7c4wHRQY@ac-kkmkuw6-shard-00-00.3umsmo6.mongodb.net:27017...
# PORT=8000
# JWT_SECRET=studiospace_jwt_super_secure_secret_key_2026
# CLIENT_URL=http://localhost:3000

# Start server:
node index.js
# Output: StudioSpace Server is running smoothly on port 8000
```

### 3. Frontend Setup (`striospace-client`)
```bash
cd striospace-client
npm install

# Start Next.js development server:
npm run dev
# Open http://localhost:3000 in your browser
```

---

## 📁 Project Architecture
```
StudioSpace/
├── StudioSpace-Server/              # Express + MongoDB Atlas Backend
│   ├── index.js                     # CRUD, JWT HTTPOnly, Double-booking prevention
│   ├── .env                         # Server environment variables
│   ├── package.json
│   └── README.md
│
└── striospace-client/               # Next.js 16 App Router Client
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx             # Home: Hero slider, Categories, Featured (limit 6), Assurances
    │   │   ├── studios/             # Catalog: Search, category filters, sorting
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/page.tsx    # Specs, carousel, reviews, booking modal
    │   │   ├── add-studio/page.tsx  # Private Route: ImgBB upload, amenities, read-only host
    │   │   ├── my-listings/page.tsx # Private Route: Table/cards, delete confirmation modal
    │   │   ├── my-bookings/page.tsx # Private Route: Statuses, cancellation, PDF invoice
    │   │   ├── wishlist/page.tsx    # Saved spaces collection
    │   │   ├── login/page.tsx       # Auth login with Google & email
    │   │   ├── signup/page.tsx      # Auth registration with strict password validation
    │   │   ├── not-found.tsx        # Custom creative 404 page
    │   │   └── api/auth/[...all]/   # BetterAuth API handler
    │   ├── components/              # StudioCard, HeroSlider, Modals, Navbar, Footer
    │   ├── lib/                     # Auth client, PDF generator, ImgBB uploader
    │   └── types/                   # TypeScript interfaces
    ├── .env                         # Client environment variables
    └── README.md
```
