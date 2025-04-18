
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { BlogPost } from "@/context/BlogContext";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  excerpt: z.string().min(20, { message: "Excerpt must be at least 20 characters" }),
  coverImage: z.string().url({ message: "Please enter a valid image URL" }),
});

type FormValues = z.infer<typeof formSchema>;

interface BlogEditorProps {
  initialData?: Partial<BlogPost>;
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
  buttonText?: string;
}

const BlogEditor = ({
  initialData,
  onSubmit,
  isSubmitting,
  buttonText = "Save",
}: BlogEditorProps) => {
  const [activeTab, setActiveTab] = useState("edit");

  // Initialize form with default values or initial data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      coverImage: initialData?.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
  });

  // Function to generate excerpt from content if field is empty
  const generateExcerpt = () => {
    const content = form.getValues("content");
    if (content) {
      // Strip markdown syntax and get first 150 characters
      const strippedContent = content
        .replace(/#+\s/g, "") // Remove headers
        .replace(/\*\*/g, "") // Remove bold
        .replace(/\*/g, "") // Remove italic
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace links with just the text
        .replace(/```[^`]*```/g, "") // Remove code blocks
        .replace(/`([^`]+)`/g, "$1"); // Remove inline code
      
      const excerpt = strippedContent.substring(0, 150).trim() + (strippedContent.length > 150 ? "..." : "");
      form.setValue("excerpt", excerpt);
      toast.success("Excerpt generated from content");
    } else {
      toast.error("Please add content first");
    }
  };

  // Show preview in real-time
  const contentPreview = form.watch("content");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your blog title"
                  {...field}
                  className="font-playfair text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
              {field.value && (
                <div className="mt-2 aspect-video overflow-hidden rounded-md border">
                  <img
                    src={field.value}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                    onError={() => {
                      toast.error("Failed to load image. Please check the URL.");
                    }}
                  />
                </div>
              )}
            </FormItem>
          )}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (Markdown)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post content in Markdown format..."
                      className="min-h-[400px] font-mono text-sm resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="border rounded-md p-4 min-h-[400px] overflow-auto">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: contentPreview || "<p>Nothing to preview yet.</p>" }}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a short excerpt for your blog post..."
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={generateExcerpt}
            className="mb-[22px]"
          >
            Generate
          </Button>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogEditor;
