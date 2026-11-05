// Soft banner on top of inner pages (blurred color blobs + centered title)
export default function PageHeader({ eyebrow, title, text }) {
  return (
    <section className="relative overflow-hidden py-14 text-center">
      <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-4 h-64 w-64 rounded-full bg-accent2/20 blur-3xl" />
      <div className="container-x relative">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{title}</h1>
        {text && <p className="mx-auto mt-4 max-w-xl text-muted">{text}</p>}
      </div>
    </section>
  );
}
