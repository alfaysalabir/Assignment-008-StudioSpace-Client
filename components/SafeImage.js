"use client";
import { useState } from "react";
import { TbAperture } from "react-icons/tb";

// shows a nice placeholder when an image URL is broken
export default function SafeImage({ src, alt, className = "" }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent2/20 text-accent ${className}`}>
        <TbAperture size={48} />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setBroken(true)} />;
}
