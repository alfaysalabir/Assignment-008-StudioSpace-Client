# StudioSpace

**Peer-to-peer creative workspace and production studio sharing platform.**

🔗 **Live Site:** https://your-studiospace-site.vercel.app  *(replace with your deployed link)*
🔗 **Server API:** https://your-studiospace-server.vercel.app  *(replace with your server link)*

StudioSpace lets studio owners list photo studios, sound stages, podcast lounges, music suites and art workshops, and lets creators discover, filter, check availability and book them by the hour.

## Key Features

- **Hero slider and live featured studios**: Swiper.js slider with 3 slides, plus 6 top-rated studios fetched from MongoDB with `.limit(6)`.
- **Smart explore page**: search by name or city, filter by category (from Home category cards or footer links), sort by price or rating, with skeleton loaders and friendly empty states.
- **Full studio CRUD**: add, view, update and delete studios, with imgbb image upload, amenities tags and a confirmation modal before delete.
- **Booking system**: booking modal with live price, status badges (Pending, Confirmed, Completed, Cancelled), cancel for pending slots, and a host view to confirm or decline requests.
- **Double-booking prevention (Challenge 2)**: the server checks time overlap against Confirmed bookings and rejects clashes with a clear message.
- **JWT in HTTPOnly cookies (Challenge 1)**: protected server routes return `401 Unauthorized` without a valid token.
- **Light / Dark theme (Challenge 3)**: toggle in the navbar, remembered after reload.
- **Optional extras**: PDF booking invoice, saved studios wishlist (heart icon), studio reviews.
- **Toasts and custom modals only**: Sonner toasts everywhere, no browser `alert()`.
- **Fully responsive** for mobile, tablet and desktop.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Front-end | Next.js 14 (App Router), JavaScript, Tailwind CSS, Swiper.js, Sonner, jsPDF, React Icons |
| Auth | BetterAuth + MongoDB adapter, Google login, JWT (HTTPOnly cookie) |
| Back-end | Express.js, MongoDB (native driver), jsonwebtoken |

## Local Setup

1. Clone the client and server repositories.
2. **Server**
   ```bash
   cd server
   npm install
   cp .env.example .env      # fill MONGODB_URI, JWT_SECRET, CLIENT_URL
   npm run seed              # adds demo studios
   npm run dev               # http://localhost:5000
   ```
3. **Client**
   ```bash
   cd client
   npm install
   cp .env.example .env.local   # fill all values (same JWT_SECRET as the server)
   npm run dev                  # http://localhost:3000
   ```
4. For Google login, create an OAuth client in Google Cloud Console and add the redirect URI
   `http://localhost:3000/api/auth/callback/google` (and your live URL + `/api/auth/callback/google`).

## Examiner Test Credentials

| Role | Email | Password |
| --- | --- | --- |
| Examiner | examiner@studiospace.com | Studio123 |

> Register this account once on the live site before submitting, so the examiner can log in directly.

## How the security works (simple explanation)

1. User logs in with BetterAuth.
2. The Next.js route `/api/jwt` checks the BetterAuth session, signs a JWT and saves it in an **HTTPOnly cookie**.
3. Every API call goes through `/api/server/*` (Next.js proxy). The proxy reads the cookie and sends the token to Express.
4. Express `verifyToken` checks the token. Missing or wrong token = `401 Unauthorized`.


## Clint Link
https://studiospaceclient-rouge.vercel.app/