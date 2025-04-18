

import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BlogPost } from "@/context/BlogContext";

type BlogCardProps = {
  blog: BlogPost;
  className?: string;
};

const BlogCard = ({ blog, className = "" }: BlogCardProps) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${className}`}>
      <Link to={`/blog/${blog.id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-all hover:scale-105"
          />
        </div>
        
        <CardHeader className="py-4">
          <div className="space-y-1">
            <h3 className="font-playfair text-xl font-semibold line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              By {blog.author.name} • {formatDate(blog.createdAt)}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="py-2">
          <p className="text-gray-600 line-clamp-3">{blog.excerpt}</p>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4">
          <span className="text-primary text-sm font-medium">Read More</span>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogCard;
