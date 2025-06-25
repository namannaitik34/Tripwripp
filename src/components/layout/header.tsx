import Link from 'next/link';
import { AuthButton } from '@/components/auth/auth-button';

export function Header() {
  return (
    <header className="bg-navy text-navy-foreground shadow-md top-0 z-50 sticky">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-500 hover:opacity-80 transition-opacity">
          <img src="https://i.ibb.co/7trJccNS/58f1a629-2357-4415-a908-f7a1cadac9fe.png" alt="TripWripp-Demo Logo" width="35%" />
        </Link>
        <nav>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
