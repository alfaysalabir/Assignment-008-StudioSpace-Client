// New StudioSpace mark: a camera viewfinder (4 corners) around a sparkle
// Gradient square + white shapes. No image file needed, so it is always sharp.
export default function LogoMark({ size = 40, className = "" }) {
    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center text-white shadow-md ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.28,
                backgroundImage: "linear-gradient(135deg, #6c4df6, #ff6b9a)",
            }}
        >
            <svg viewBox="0 0 64 64" width={size * 0.8} height={size * 0.8} fill="none" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 27V21a5 5 0 0 1 5-5h6" />
                    <path d="M37 16h6a5 5 0 0 1 5 5v6" />
                    <path d="M48 37v6a5 5 0 0 1-5 5h-6" />
                    <path d="M27 48h-6a5 5 0 0 1-5-5v-6" />
                </g>
                <path
                    d="M32 21C33.3 28.2 35.8 30.7 43 32C35.8 33.3 33.3 35.8 32 43C30.7 35.8 28.2 33.3 21 32C28.2 30.7 30.7 28.2 32 21Z"
                    fill="currentColor"
                />
            </svg>
        </span>
    );
}