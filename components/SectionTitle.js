export default function SectionTitle({ eyebrow, title, text, center = true, light = false }) {
  return (
    <div className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${light ? "!bg-white/10 !text-white" : ""}`}>{eyebrow}</p>}
      <h2 className={`section-title ${light ? "!text-white" : ""}`}>{title}</h2>
      {text && <p className={`mt-4 leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{text}</p>}
    </div>
  );
}
