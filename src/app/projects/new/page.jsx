"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  img: z.string().url(),
  link: z.string().url(),
  keywords: z.array(z.string()).default([]),
});

export default function NewPage() {
  const [draftKeyword, setDraftKeyword] = useState("");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      img: "",
      link: "",
      keywords: [],
    },
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("img", values.img);
    formData.append("link", values.link);
    formData.append("keywords", JSON.stringify(values.keywords));

    // show loading toast
    toast.loading("Submitting...");

    try {
      const res = await fetch("/api/projects/new", {
        method: "POST",
        body: formData,
      });

      const body = await res.json();
      toast.dismiss();

      if (body.ok) {
        toast.success("Project received successfully!");
        form.reset();
      } else {
        toast.error("Failed to submit.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("An error occurred.");
    }
  }


  return (
    <div className="max-w-xl mt-6">
      <h1 className="text-3xl font-bold mb-4">New Project</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Project title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Project description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGE */}
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* LINK */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* KEYWORDS */}
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => {
              const tags = field.value;

              const addTag = () => {
                if (!draftKeyword.trim()) return;
                if (tags.includes(draftKeyword.trim())) return;
                field.onChange([...tags, draftKeyword.trim()]);
                setDraftKeyword("");
              };

              return (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      value={draftKeyword}
                      onChange={(e) => setDraftKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Add keyword"
                    />
                    <Button type="button" onClick={addTag}>
                      Add
                    </Button>
                  </div>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {tags.map((t) => (
                      <Badge
                        key={t}
                        className="cursor-pointer"
                        onClick={() =>
                          field.onChange(tags.filter((k) => k !== t))
                        }
                      >
                        {t} ×
                      </Badge>
                    ))}
                  </div>

                  <FormDescription>Press Enter to add keywords.</FormDescription>
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
