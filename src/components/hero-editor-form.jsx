"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner"; // Assuming you have sonner or similar toast installed from Lab 4

export default function HeroEditorForm() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    shortDescription: "",
    longDescription: "",
    avatar: "", // Existing data URL
  });
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);

  // 1. Fetch data on mount
  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((json) => {
        setFormData(json.data);
        setPreview(json.data.avatar);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create local preview immediately
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("fullName", formData.fullName);
    submitData.append("shortDescription", formData.shortDescription);
    submitData.append("longDescription", formData.longDescription);
    submitData.append("avatar", formData.avatar); // Send old avatar as fallback
    if (file) {
      submitData.append("avatarFile", file); // Send new file if exists
    }

    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        body: submitData,
      });
      
      if (!res.ok) throw new Error("Failed to update");
      
      const json = await res.json();
      setFormData(json.data); // Update state with confirmed DB data
      toast.success("Hero section updated successfully!");
    } catch (error) {
      toast.error("Error updating hero section");
    }
  };

  if (loading) return <p>Loading editor...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md border dark:bg-zinc-900 dark:border-zinc-800">
      
      {/* Avatar Preview & Upload */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border">
           {/* Use simple img tag for preview */}
           {preview ? (
             <img src={preview} alt="Avatar Preview" className="object-cover w-full h-full" />
           ) : (
             <div className="w-full h-full bg-gray-200" />
           )}
        </div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="text-sm"
        />
      </div>

      {/* Text Fields */}
      <div className="grid gap-2">
        <label className="font-semibold">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded dark:bg-black"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="font-semibold">Short Description (Max 120 chars)</label>
        <input
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          maxLength={120}
          className="border p-2 rounded dark:bg-black"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="font-semibold">Long Description</label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          className="border p-2 rounded h-32 dark:bg-black"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Changes
      </button>
    </form>
  );
}