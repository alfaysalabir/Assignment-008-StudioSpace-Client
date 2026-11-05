import LogoMark from "@/components/LogoMark";

// branded loader: the logo mark gently pulsing
export default function PageLoader({ text = "Loading StudioSpace..." }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <LogoMark size={64} className="animate-pulse" />
      <p className="text-sm font-semibold uppercase tracking-widest text-muted">{text}</p>
    </div>
  );
}