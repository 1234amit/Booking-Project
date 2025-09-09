import { Suspense } from "react";
import BookingsClient from "./BookingsClient";

export const metadata = { title: "Bookings – Dashboard" };

export default function Page({ searchParams }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-10">Loading bookings…</div>}>
      <BookingsClient initialParams={searchParams} />
    </Suspense>
  );
}
