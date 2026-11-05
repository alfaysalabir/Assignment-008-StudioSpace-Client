"use client";
import { useState } from "react";
import { toast } from "sonner";
import { FiPlus, FiUploadCloud } from "react-icons/fi";
import { amenityOptions, categoryValues } from "@/lib/data";
import { uploadToImgbb } from "@/lib/upload";

const emptyForm = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  image: "",
  galleryText: "",
  amenities: [],
  overview: "",
};

// Used by both Add Studio and Update Studio pages
export default function StudioForm({ initial, user, submitText, submitting, onSubmit }) {
  const [form, setForm] = useState(
    initial
      ? { ...emptyForm, ...initial, galleryText: (initial.gallery || []).join("\n") }
      : emptyForm
  );
  const [customAmenity, setCustomAmenity] = useState("");
  const [uploading, setUploading] = useState(false);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleAmenity(name) {
    const has = form.amenities.includes(name);
    setForm({ ...form, amenities: has ? form.amenities.filter((a) => a !== name) : [...form.amenities, name] });
  }

  function addCustomAmenity() {
    const name = customAmenity.trim();
    if (!name) return;
    if (form.amenities.includes(name)) return toast.error("This amenity is already added");
    setForm({ ...form, amenities: [...form.amenities, name] });
    setCustomAmenity("");
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((old) => ({ ...old, image: url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    }
    setUploading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.title.trim().length < 3) return toast.error("Title must be at least 3 characters");
    if (!form.category) return toast.error("Please choose a category");
    if (!(Number(form.hourlyRate) > 0)) return toast.error("Hourly rate must be more than $0");
    if (form.securityDeposit === "" || Number(form.securityDeposit) < 0) return toast.error("Please add a security deposit (0 or more)");
    if (!(Number(form.maxCapacity) > 0)) return toast.error("Max capacity must be at least 1");
    if (form.location.trim().length < 3) return toast.error("Please add the studio location");
    if (!form.image.trim()) return toast.error("Please add an image URL or upload an image");
    if (form.overview.trim().length < 20) return toast.error("Overview must be at least 20 characters");

    onSubmit({
      title: form.title,
      category: form.category,
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit),
      maxCapacity: Number(form.maxCapacity),
      location: form.location,
      image: form.image,
      gallery: form.galleryText.split("\n").map((u) => u.trim()).filter(Boolean),
      amenities: form.amenities,
      overview: form.overview,
    });
  }

  const customOnes = form.amenities.filter((a) => !amenityOptions.includes(a));

  return (
    <form onSubmit={handleSubmit} className="card space-y-6 p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label" htmlFor="title">Studio Title</label>
          <input id="title" name="title" value={form.title} onChange={change} placeholder="e.g. North Light Cyc Wall" className="input" />
        </div>

        <div>
          <label className="label" htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={change} className="input">
            <option value="">Select a category</option>
            {categoryValues.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="location">Location / Address</label>
          <input id="location" name="location" value={form.location} onChange={change} placeholder="e.g. Banani, Dhaka" className="input" />
        </div>

        <div>
          <label className="label" htmlFor="hourlyRate">Hourly Rate ($)</label>
          <input id="hourlyRate" name="hourlyRate" type="number" min="1" value={form.hourlyRate} onChange={change} placeholder="45" className="input" />
        </div>

        <div>
          <label className="label" htmlFor="securityDeposit">Security Deposit ($)</label>
          <input id="securityDeposit" name="securityDeposit" type="number" min="0" value={form.securityDeposit} onChange={change} placeholder="100" className="input" />
        </div>

        <div>
          <label className="label" htmlFor="maxCapacity">Max Capacity (people)</label>
          <input id="maxCapacity" name="maxCapacity" type="number" min="1" value={form.maxCapacity} onChange={change} placeholder="10" className="input" />
        </div>

        <div>
          <label className="label" htmlFor="image">Image URL</label>
          <input id="image" name="image" value={form.image} onChange={change} placeholder="https://..." className="input" />
        </div>

        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line px-4 py-4 text-sm font-medium text-muted transition hover:border-accent hover:text-accent">
            <FiUploadCloud size={20} />
            {uploading ? "Uploading image..." : "Or upload an image from your device (imgbb)"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="label" htmlFor="galleryText">More Gallery Images (optional, one URL per line)</label>
          <textarea id="galleryText" name="galleryText" rows={3} value={form.galleryText} onChange={change} placeholder="https://..." className="input" />
        </div>
      </div>

      <div>
        <p className="label">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((a) => (
            <label key={a} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${form.amenities.includes(a) ? "border-transparent bg-accent text-white" : "border-line bg-surface text-ink hover:border-accent"}`}>
              <input type="checkbox" className="hidden" checked={form.amenities.includes(a)} onChange={() => toggleAmenity(a)} />
              {a}
            </label>
          ))}
          {customOnes.map((a) => (
            <label key={a} className="cursor-pointer rounded-full border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white">
              <input type="checkbox" className="hidden" checked onChange={() => toggleAmenity(a)} />
              {a}
            </label>
          ))}
        </div>
        <div className="mt-3 flex max-w-md gap-2">
          <input value={customAmenity} onChange={(e) => setCustomAmenity(e.target.value)} placeholder="Add your own amenity" className="input" />
          <button type="button" onClick={addCustomAmenity} className="btn-outline shrink-0" aria-label="Add amenity"><FiPlus /> Add</button>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="overview">Detailed Overview</label>
        <textarea id="overview" name="overview" rows={5} value={form.overview} onChange={change} placeholder="Describe the space, the best use cases, house rules and what is included..." className="input" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label">Host Name</label>
          <input value={user?.name || ""} readOnly className="input cursor-not-allowed opacity-70" />
        </div>
        <div>
          <label className="label">Host Email</label>
          <input value={user?.email || ""} readOnly className="input cursor-not-allowed opacity-70" />
        </div>
      </div>

      <button className="btn-primary w-full sm:w-auto" disabled={submitting || uploading}>
        {submitting ? "Saving..." : submitText}
      </button>
    </form>
  );
}
