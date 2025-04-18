

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBlog, BlogPost } from "@/context/BlogContext";
import Layout from "@/components/Layout";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getBlog, deleteBlog } = useBlog();
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Check if current user is the author
  const isAuthor = user && blog && user.id === blog.author.id;

  useEffect(() => {
    if (id) {
      const blogData = getBlog(id);
      if (blogData) {
        setBlog(blogData);
      } else {
        toast.error("Blog post not found");
        navigate("/");
      }
      setIsLoading(false);
    }
  }, [id, getBlog, navigate]);

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Handle blog deletion
  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deleteBlog(id);
      toast.success("Blog post deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete blog post");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-3xl mx-auto px-4 py-12 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-12"></div>
          <div className="aspect-video bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Blog post not found</h1>
          <p className="mb-8">The blog post you are looking for might have been removed or doesn't exist.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
        </div>
        
        {/* Author controls */}
        {isAuthor && (
          <div className="flex justify-end mb-6 gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/edit/${blog.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
        
        {/* Blog header */}
        <header className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-6">
            <span>By {blog.author.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(blog.createdAt)}</span>
            {blog.updatedAt !== blog.createdAt && (
              <>
                <span className="mx-2">•</span>
                <span>Updated {formatDate(blog.updatedAt)}</span>
              </>
            )}
          </div>
        </header>
        
        {/* Featured image */}
        <div className="mb-8 aspect-video overflow-hidden rounded-lg">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Blog content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </Layout>
  );
};

export default BlogDetail;
