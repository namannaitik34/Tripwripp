import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { AuthButton } from "../auth/auth-button";

export function Header() {
  const navLinks = [
    { href: '/?tab=destinations', label: 'Destinations' },
    { href: '/?tab=packages', label: 'Packages' },
    { href: '/?tab=buddy_finder', label: 'Travel Buddy' },
    { href: '/?tab=ai_assistant', label: 'AI Assistant' },
    { href: '/scroll', label: 'Scroll' },
  ];

  return (
    <header className="bg-white text-navy shadow-md top-0 z-50 sticky">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <img src="https://i.ibb.co/7trJccNS/58f1a629-2357-4415-a908-f7a1cadac9fe.png" alt="TripWripp-Demo Logo" className="h-8 md:h-10 w-auto" />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
         {navLinks.map(link => (
         <Link key={link.label} href={link.href} className="text-navy hover:text-orange-300 transition-colors" scroll={false}>
         {link.label}
         </Link>
         ))}
        </nav>

        <div className="flex items-center gap-4">
            <div className="hidden md:block">
                <AuthButton />
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-navy hover:bg-gray-100">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] bg-white text-navy p-6">
                  <SheetHeader className="text-left">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                      Main navigation links
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6 mt-8">
                    {navLinks.map(link => (
                      <Link key={link.label} href={link.href} className="text-gray-700 hover:text-orange-500 transition-colors" scroll={false}>
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 pt-6 border-t">
                    <AuthButton />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
