# Comments System

A modern, high-performance comment system built with React, TypeScript, and Vite. This project provides a robust solution for integrating comments into any web application, featuring nested replies, like/dislike functionality, and seamless authentication.

## ✨ Features

- **Global Comment Feed**: A unified system for managing comments across the platform.
- **Nested Replies**: Support for multi-level threaded conversations.
- **Interactions**: Like and dislike comments with real-time count updates.
- **Authentication**: Secure integration with backend auth for posting and interacting.
- **Responsive Design**: Premium UI built with Tailwind CSS, optimized for all devices.
- **State Management**: Optimized data fetching and caching using Redux Toolkit and RTK Query.

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:

      ```bash
      git clone <repository-url>
      cd comments-system
      ```

2. **Install dependencies**:

      ```bash
      yarn install
      # or
      npm install
      ```

3. **Environment Setup**:
   Create a `.env` file in the root directory (if needed) and configure your backend API URL:

      ```env
      VITE_API_BASE_URL=http://localhost:5000/api/v1
      ```

4. **Run the development server**:

      ```bash
      yarn dev
      # or
      npm run dev
      ```

5. **Build for production**:
      ```bash
      yarn build
      # or
      npm run build
      ```

## 📂 Project Structure

- `src/components`: UI components (Comments, UI primitives)
- `src/redux`: Redux store, base API, and feature slices (auth, comments)
- `src/pages`: Main application pages
- `src/types`: TypeScript interfaces and types
- `src/utils`: Helper functions and utilities

## 📄 License

This project is private.
