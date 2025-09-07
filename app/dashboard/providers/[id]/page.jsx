
import Link from "next/link";

export default function ProviderDetail({ params }) {
  const { id } = params;
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/dashboard/providers" className="text-sm text-indigo-600 hover:underline">← Back to providers</Link>
      <h1 className="mt-4 text-2xl font-semibold text-gray-900">Profile: {id.replaceAll("-", " ")}</h1>
      <p className="mt-2 text-gray-600">This is a placeholder profile page. Add services, availability, and reviews here.</p>
    </main>
  );
}
