import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { AuthButton } from "../auth/auth-button";

export function Header() {
  const navLinks = [
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
    { href: '/buddy-finder', label: 'Travel Buddy' },
    { href: '/ai-assistant', label: 'AI Assistant' },
    { href: '/scroll', label: 'Scroll' },
  ];

  return (
    <header className="bg-card text-foreground shadow-md top-0 z-50 sticky">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <img src="http://i.ibb.co/7trJccNS/58f1a629-2357-4415-a908-f7a1cadac9fe.png" width={200} />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
         {navLinks.map(link => (
         <Link key={link.label} href={link.href} className="text-foreground hover:text-primary transition-colors">
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
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] bg-card text-foreground p-6">
                  <SheetHeader className="text-left">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                      Main navigation links
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6 mt-8">
                    {navLinks.map(link => (
                      <Link key={link.label} href={link.href} className="text-foreground hover:text-primary transition-colors">
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
