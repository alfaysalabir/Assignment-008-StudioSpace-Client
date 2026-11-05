// Upload an image file to imgbb and return the image URL
export async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("imgbb key is missing. Paste an image URL instead.");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!data.success) throw new Error("Image upload failed. Please try again.");
  return data.data.url;
}
