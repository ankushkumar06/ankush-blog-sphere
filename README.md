
# Lucid Blog Sphere 🌐✍️

## Project Overview

Lucid Blog Sphere is a modern, responsive blog application built with React, TypeScript, and Tailwind CSS. It provides a sleek and intuitive platform for users to create, read, and manage blog posts.

### Key Features

- 🔐 User Authentication
- 📝 Blog Creation & Management
- 🌍 Public Blog Listing
- 📱 Fully Responsive Design
- 🎨 Modern UI with Shadcn/UI Components

## Technology Stack

### Frontend
- React (v18.3.1)
- TypeScript
- Tailwind CSS
- React Router
- Shadcn/UI Components
- Tanstack React Query

### Development Tools
- Vite
- ESLint
- Bun (Package Manager)

## Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn/UI reusable components
│   └── BlogCard.tsx  # Blog listing component
├── context/
│   ├── AuthContext.tsx
│   └── BlogContext.tsx
├── hooks/            # Custom React hooks
├── pages/            # Application pages
│   ├── Index.tsx
│   ├── Login.tsx
│   └── Register.tsx
└── App.tsx
```

## Color Palette

- Primary: #9B87F5 (Soft Purple)
- Secondary: #7E69AB (Deep Purple)
- Accent: #D6BCFA (Light Purple)
- Neutral: #8E9196 (Cool Gray)

## Getting Started

### Prerequisites

- Node.js (v18+)
- Bun or npm
- Git

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
```

2. Install dependencies
```bash
bun install
# or
npm install
```

3. Start the development server
```bash
bun dev
# or
npm run dev
```

## Environment Setup

Create a `.env` file in the project root with the following variables:
```env
VITE_APP_NAME=LucidBlogSphere
VITE_API_URL=https://your-api-endpoint.com
```

## Available Scripts

- `bun dev`: Start development server
- `bun build`: Create production build
- `bun lint`: Run ESLint
- `bun preview`: Preview production build

## Deployment

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## Future Roadmap

- [ ] Implement advanced search functionality
- [ ] Add comment system
- [ ] Create user profiles
- [ ] Integrate with Supabase for backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [Your Email]

Project Link: [https://github.com/yourusername/lucid-blog-sphere](https://github.com/yourusername/lucid-blog-sphere)

---

**Powered by Lovable 🚀**
