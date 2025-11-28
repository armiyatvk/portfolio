"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function EditProjectForm({ project, uuid }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      keywords: project.keywords.join(", "), // Convert array to string for input
    },
  });
  
  const router = useRouter();

  const onSubmit = async (data) => {
    // Convert comma string back to array
    const formattedData = {
        ...data,
        keywords: data.keywords.split(",").map(k => k.trim())
    };

    const res = await fetch(`/api/projects/${uuid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    if (res.ok) {
      alert("Project Updated!");
      router.push("/projects"); // Go back to list
      router.refresh();
    } else {
      alert("Error updating project");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input {...register("title")} placeholder="Title" className="border p-2" />
      <textarea {...register("description")} placeholder="Description" className="border p-2" />
      <input {...register("image")} placeholder="Image URL" className="border p-2" />
      <input {...register("link")} placeholder="Project Link" className="border p-2" />
      <input {...register("keywords")} placeholder="Keywords (comma separated)" className="border p-2" />
      
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Save Changes</button>
    </form>
  );
}