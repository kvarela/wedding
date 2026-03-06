# Karim & Felicia Wedding Website 💍

A modern, elegant wedding website featuring a single-page application, built as a monorepo.

## 🎨 Features

- **Hero Section** - Elegant landing with wedding details
- **Story Timeline** - Animated timeline of the couple's journey
- **Event Schedule** - Detailed schedule of wedding day events
- **RSVP Form** - Guest registration with backend integration
- **Travel Information** - Comprehensive travel and accommodation details
- **Photo Gallery** - Beautiful image gallery with modal view

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chakra UI 3** - Component library
- **Framer Motion** - Animations

### Backend
- **Nest.js** - Node.js framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **TypeORM** - ORM

## 📁 Project Structure

```
wedding/
├── packages/
│   ├── frontend/          # React frontend application
│   │   ├── src/
│   │   │   ├── sections/  # Page sections (Hero, Story, etc.)
│   │   │   ├── components/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── backend/           # NestJS backend API
│   │   ├── src/
│   │   │   ├── rsvp/     # RSVP module
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── shared/            # Shared types and utilities
└── package.json           # Root package.json for monorepo
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and yarn
- PostgreSQL 14+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kvarela/wedding.git
cd wedding
```

2. Install dependencies:
```bash
yarn install
```

3. Set up the database:
```bash
# Create a PostgreSQL database named 'wedding'
createdb wedding

# Or use PostgreSQL client
psql -c "CREATE DATABASE wedding;"
```

4. Configure the backend:
```bash
cd packages/backend
cp .env.example .env
# Edit .env with your database credentials
```

### Development

Run both frontend and backend:
```bash
yarn dev
```

Or run them separately:

Frontend (runs on http://localhost:3000):
```bash
yarn dev:frontend
```

Backend (runs on http://localhost:3001):
```bash
yarn dev:backend
```

### Build

Build all packages:
```bash
yarn build
```

## 🎯 Wedding Details

- **Couple:** Karim & Felicia
- **Date:** November 7, 2026
- **Venue:** Viceroy Hotel, San Jose Del Cabo, Mexico
- **Theme:** Minimalist Luxury / Beach Elegance

## 📱 Mobile-First Design

The website is built with a mobile-first approach, ensuring a beautiful experience across all devices with responsive breakpoints and touch-friendly interactions.

## 🔐 API Endpoints

### RSVP
- `POST /api/rsvp` - Submit an RSVP
- `GET /api/rsvp` - Get all RSVPs
- `GET /api/rsvp/stats` - Get RSVP statistics
- `GET /api/rsvp/:id` - Get specific RSVP

## 🤝 Contributing

This is a private wedding website project. For any issues or suggestions, please contact the repository owner.

## 📄 License

MIT License - See LICENSE file for details

## 💌 Contact

For any questions about the wedding or website:
- Email: contact@example.com

---

Made with ❤️ for Karim & Felicia's special day
