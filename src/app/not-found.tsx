'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4">404 — Page Not Found</h1>
      <p className="lead mb-4">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-secondary">
        Go back to Home
      </Link>
    </div>
  );
}
