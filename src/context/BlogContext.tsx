
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

type BlogContextType = {
  blogs: BlogPost[];
  isLoading: boolean;
  createBlog: (blog: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => Promise<BlogPost>;
  updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<BlogPost>;
  deleteBlog: (id: string) => Promise<void>;
  getBlog: (id: string) => BlogPost | undefined;
  getAuthorBlogs: (authorId: string) => BlogPost[];
  getRecentBlogs: (count: number) => BlogPost[];
};

// Sample blog posts
const sampleBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content: `
# Getting Started with React

React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.

## Why React?

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

## Component-Based

Build encapsulated components that manage their own state, then compose them to make complex UIs.

## Learn Once, Write Anywhere

You can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.
    `,
    excerpt: "Learn the basics of React and how to create your first component in this comprehensive guide.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    author: {
      id: "1",
      name: "Demo User",
    },
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-01-15T12:00:00Z",
  },
  {
    id: "2",
    title: "Understanding JavaScript Promises",
    content: `
# Understanding JavaScript Promises

JavaScript promises are a powerful way to handle asynchronous operations. They represent a value that might be available now, later, or never.

## Basic Promise Syntax

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  if (/* operation successful */) {
    resolve(result);
  } else {
    reject(error);
  }
});

myPromise
  .then(result => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  });
\`\`\`

## Chaining Promises

One of the most powerful features of promises is the ability to chain them.

\`\`\`javascript
fetchData()
  .then(processData)
  .then(saveData)
  .then(notifyUser)
  .catch(handleError);
\`\`\`

## Async/Await

Modern JavaScript provides the async/await syntax to work with promises in a more synchronous way.

\`\`\`javascript
async function fetchAndProcessData() {
  try {
    const data = await fetchData();
    const processed = await processData(data);
    await saveData(processed);
    notifyUser();
  } catch (error) {
    handleError(error);
  }
}
\`\`\`
    `,
    excerpt: "Explore JavaScript promises, how they work, and how to use them effectively in your applications.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    author: {
      id: "2",
      name: "Jane Smith",
    },
    createdAt: "2023-02-20T15:30:00Z",
    updatedAt: "2023-02-20T15:30:00Z",
  },
  {
    id: "3",
    title: "CSS Grid Layout: A Complete Guide",
    content: `
# CSS Grid Layout: A Complete Guide

CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns.

## Basic Grid Container

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

## Placing Items

Grid items can be placed specifically using grid-column and grid-row.

\`\`\`css
.item {
  grid-column: 1 / 3; /* Start at column 1, end before column 3 */
  grid-row: 2 / 4; /* Start at row 2, end before row 4 */
}
\`\`\`

## Grid Areas

You can name grid areas and place items in them.

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Grids

Create responsive layouts using media queries and grid-template-columns.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
\`\`\`
    `,
    excerpt: "Master CSS Grid Layout with this comprehensive guide covering everything from basics to advanced techniques.",
    coverImage: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    author: {
      id: "3",
      name: "Alex Johnson",
    },
    createdAt: "2023-03-10T09:45:00Z",
    updatedAt: "2023-03-10T09:45:00Z",
  },
];

// Create the context with default values
const BlogContext = createContext<BlogContextType>({
  blogs: [],
  isLoading: true,
  createBlog: async () => ({} as BlogPost),
  updateBlog: async () => ({} as BlogPost),
  deleteBlog: async () => {},
  getBlog: () => undefined,
  getAuthorBlogs: () => [],
  getRecentBlogs: () => [],
});

// Custom hook to use the blog context
export const useBlog = () => useContext(BlogContext);

// Provider component
export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blogs from localStorage or use sample data
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(sampleBlogs);
      localStorage.setItem("blogs", JSON.stringify(sampleBlogs));
    }
    setIsLoading(false);
  }, []);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }, [blogs, isLoading]);

  // Create a new blog
  const createBlog = async (blog: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const now = new Date().toISOString();
    const newBlog: BlogPost = {
      ...blog,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: now,
      updatedAt: now,
    };
    
    setBlogs(prev => [newBlog, ...prev]);
    toast.success("Blog created successfully!");
    return newBlog;
  };

  // Update an existing blog
  const updateBlog = async (id: string, blogUpdate: Partial<BlogPost>): Promise<BlogPost> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === id) {
        return {
          ...blog,
          ...blogUpdate,
          updatedAt: new Date().toISOString(),
        };
      }
      return blog;
    });
    
    setBlogs(updatedBlogs);
    
    const updatedBlog = updatedBlogs.find(blog => blog.id === id);
    if (!updatedBlog) throw new Error("Blog not found");
    
    toast.success("Blog updated successfully!");
    return updatedBlog;
  };

  // Delete a blog
  const deleteBlog = async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setBlogs(prev => prev.filter(blog => blog.id !== id));
    toast.success("Blog deleted successfully!");
  };

  // Get a single blog by ID
  const getBlog = (id: string): BlogPost | undefined => {
    return blogs.find(blog => blog.id === id);
  };

  // Get blogs by author ID
  const getAuthorBlogs = (authorId: string): BlogPost[] => {
    return blogs.filter(blog => blog.author.id === authorId);
  };

  // Get recent blogs
  const getRecentBlogs = (count: number): BlogPost[] => {
    return [...blogs]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, count);
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        isLoading,
        createBlog,
        updateBlog,
        deleteBlog,
        getBlog,
        getAuthorBlogs,
        getRecentBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
