import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path className="brand-mark__shackle" d="M16 21v-5a8 8 0 0 1 16 0v5" />
          <rect className="brand-mark__box" x="9" y="20" width="30" height="21" rx="5" />
          <rect className="brand-mark__screen" x="14" y="25" width="20" height="8" rx="2" />
          <path className="brand-mark__hand" d="M24 27v2.5l2 1" />
          <circle className="brand-mark__button" cx="24" cy="36.5" r="1.25" />
        </svg>
      </span>
      <span className="logo-type">
        <span className="logo-name">Pausio<span className="logo-tld">.eu</span></span>
        <span className="logo-claim">Lock time. Get life back.</span>
      </span>
      <span className="sr-only"> home</span>
    </Link>
  );
}
