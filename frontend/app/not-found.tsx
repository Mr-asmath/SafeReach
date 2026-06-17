import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-on-surface grid place-items-center p-6">
      <section className="text-center max-w-md">
        <p className="text-label-md font-bold uppercase tracking-[0.08em] text-primary">SafeReach</p>
        <h1 className="mt-2 text-headline-lg font-headline-lg text-primary">Page not found</h1>
        <p className="mt-3 text-body-md text-on-surface-variant">The requested page is not available.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-bold text-on-primary"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
