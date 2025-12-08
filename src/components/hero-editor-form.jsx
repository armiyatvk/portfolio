"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HeroEditorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // We store the image directly in 'avatar' as a long text string
  const [formData, setFormData] = useState({
    fullName: "",
    shortDescription: "",
    longDescription: "",
    avatar: "", 
  });
  
  const [preview, setPreview] = useState("");

  // Helper: Convert file to Base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // 1. Fetch data on mount
  useEffect(() => {
    fetch("/api/hero")
      .then(async (res) => {
        if (!res.ok) {
          // If 404 or 500, just return null to handle safely
          return null;
        }
        const text = await res.text();
        return text ? JSON.parse(text) : null;
      })
      .then((json) => {
        if (json && json.data) {
          setFormData(json.data);
          setPreview(json.data.avatar || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading hero data:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Modified File Handler (Converts to Text immediately)
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // LIMIT: 2MB (Base64 strings are heavy, so we must limit size)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image is too big! Please use an image under 2MB.");
        return;
      }

      try {
        const base64String = await convertToBase64(file);
        
        // Update Preview
        setPreview(base64String);
        
        // Update Form Data with the string immediately
        setFormData((prev) => ({ ...prev, avatar: base64String }));
        
      } catch (error) {
        console.error("Error converting image:", error);
        toast.error("Error processing image file.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 3. Send as JSON (Since image is now a string in formData.avatar)
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to update");
      
      const json = await res.json();
      
      // Update state with server response
      if (json.data) {
        setFormData(json.data);
        setPreview(json.data.avatar);
      }

      toast.success("Hero section updated successfully!");
      router.refresh(); // Refreshes the page to show new data
    } catch (error) {
      console.error(error);
      toast.error("Error updating hero section");
    }
  };

  if (loading) return <p className="p-4">Loading editor...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md border dark:bg-zinc-900 dark:border-zinc-800">
      
      {/* Avatar Preview & Upload */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border bg-gray-100 dark:bg-zinc-800">
           {preview ? (
             <img src={preview} alt="Avatar Preview" className="object-cover w-full h-full" />
           ) : (
             <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
               No Img
             </div>
           )}
        </div>
        <div className="flex flex-col gap-1">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-zinc-800 dark:file:text-zinc-200"
          />
          <p className="text-xs text-gray-500">Max size: 2MB</p>
        </div>
      </div>

      {/* Text Fields */}
      <div className="grid gap-2">
        <label className="font-semibold">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded dark:bg-black dark:border-zinc-700"
          placeholder="e.g. Armiya"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="font-semibold">Description</label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          className="border p-2 rounded h-32 dark:bg-black dark:border-zinc-700"
          placeholder="Write a brief bio about yourself..."
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Save Changes
      </button>
    </form>
  );
}