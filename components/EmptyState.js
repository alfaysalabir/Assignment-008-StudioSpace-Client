import Link from "next/link";
import { TbAperture } from "react-icons/tb";

export default function EmptyState({ title, text, buttonText, href, onClick }) {
  return (
    <div className="card mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-bg text-accent">
        <TbAperture size={44} />
      </span>
      <h3 className="text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-muted">{text}</p>
      {href && (
        <Link href={href} className="btn-primary mt-6">{buttonText}</Link>
      )}
      {onClick && (
        <button onClick={onClick} className="btn-primary mt-6">{buttonText}</button>
      )}
    </div>
  );
}
