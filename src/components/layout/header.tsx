import Link from 'next/link';
import { AuthButton } from '@/components/auth/auth-button';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const navLinks = [
    { href: '/?tab=destinations', label: 'Destinations' },
    { href: '/?tab=packages', label: 'Packages' },
    { href: '/?tab=buddy_finder', label: 'Travel Buddy' },
    { href: '/?tab=ai_assistant', label: 'AI Assistant' },
    { href: '/scroll', label: 'Scroll' },
  ];

  return (
    <header className="bg-navy text-navy-foreground shadow-md top-0 z-50 sticky">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <img src="https://i.ibb.co/7trJccNS/58f1a629-2357-4415-a908-f7a1cadac9fe.png" alt="TripWripp-Demo Logo" className="h-8 md:h-10 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map(link => (
                <Link key={link.label} href={link.href} className="text-white hover:text-orange-400 transition-colors" scroll={false}>
                  {link.label}
                </Link>
              ))}
            </nav>
        </div>

        <div className="flex items-center gap-2">
            <div className="hidden md:block">
                 <AuthButton />
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] bg-navy text-white p-6">
                  <nav className="flex flex-col gap-6 mt-8">
                    {navLinks.map(link => (
                      <Link key={link.label} href={link.href} className="text-lg hover:text-orange-400 transition-colors" scroll={false}>
                        {link.label}
                      </Link>
                    ))}
                     <div className="border-t border-white/20 pt-6 mt-2">
                        <AuthButton />
                     </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
