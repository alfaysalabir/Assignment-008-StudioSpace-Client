"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import PageHeader from "@/components/PageHeader";
import StudioForm from "@/components/StudioForm";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function AddStudio() {
  const { user } = useApp();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(data) {
    setSubmitting(true);
    try {
      await api("/studios", { method: "POST", body: data });
      toast.success("Your studio is now live on StudioSpace!");
      router.push("/my-listings");
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Become a host" title="Add a new studio" text="Tell creators about your space. You can edit everything later." />
      <section className="container-x max-w-4xl py-12">
        <StudioForm user={user} submitText="Add Studio" submitting={submitting} onSubmit={handleAdd} />
      </section>
    </>
  );
}

export default function AddStudioPage() {
  return (
    <PrivateRoute>
      <AddStudio />
    </PrivateRoute>
  );
}
