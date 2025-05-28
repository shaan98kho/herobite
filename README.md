# 🥪 HeroBite

**HeroBite** is a full-stack food resell marketplace web app that helps reduce food waste by allowing users to **resell** or **donate** surplus food. It is built using modern technologies like **Next.js**, **TypeScript**, **Firebase**, **Zustand**, and **React Query**.

---

## ✨ Current available features

- Firebase Authentication (sign up/login with role selection)
- Add/Remove items from cart with expiry logic
- Display and filter food listings by tags or search
- Add/remove favorite items
- Responsive layout with mobile-first UX enhancements
- Toast notifications and lazy image loading
- Zustand for state management + React Query for server state

- and more to come!

---

## 🔧 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Firebase (Firestore & Auth)](https://firebase.google.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/herobite.git
cd herobite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Firebase Environment Variables
Create a .env.local file in the root of the project with the following:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the App Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the app.

## 🗂 Project Structure

```bash
src/
├── app/                  # Next.js routing system (pages and layout)
├── components/           # Reusable components (UI & Layout)
├── hooks/                # Custom React hooks (e.g., auth listener, filters)
├── store/                # Zustand store and slices (auth, cart, customer, restaurant)
├── tests/                # Jest tests
```

## 🧪 Running Tests

```bash
npm run test
```

Uses Jest + RTL

## 🌍 Live Site

https://herobite.vercel.app
