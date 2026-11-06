import Link from "next/link";

// Rendered inside the [lang] layout. The proxy guarantees every URL carries a valid locale,
// but not-found has no params, so this page stays bilingual.
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-outer p-8 text-center text-cream">
      <p className="m-0 font-hand text-3xl">404</p>
      <h1 className="m-0 font-serif text-5xl font-medium">Página no encontrada · Page not found</h1>
      <div className="flex gap-4">
        <Link href="/es" className="rounded-full bg-cream px-5 py-3 font-semibold text-outer no-underline">
          Ir al inicio
        </Link>
        <Link href="/en" className="rounded-full border border-cream px-5 py-3 font-semibold text-cream no-underline">
          Go home
        </Link>
      </div>
    </main>
  );
}
