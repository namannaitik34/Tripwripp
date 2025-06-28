import Image from 'next/image';
import Link from 'next/link';

// Using the provided image as inspiration and incorporating the specified color codes (#0d1d30, #ECEFF1, #FF8F00)
const Footer = () => {
  return (
    <footer className="bg-[#0d1d30] text-[#ECEFF1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description Section */}
        <div className="col-span-full md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold mb-4">
            <img src="https://i.ibb.co/7trJccNS/58f1a629-2357-4415-a908-f7a1cadac9fe.png" alt="TripWripp-Demo Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-[#ECEFF1]/80 text-sm mb-4">
            Explore the world with us. Your next adventure awaits.
          </p>
          <p className="text-[#ECEFF1]/80 text-sm">
            &copy; {new Date().getFullYear()} WanderVerse. All rights reserved.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="col-span-full md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-[#ECEFF1] hover:text-[#FF8F00] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/?tab=destinations" className="text-[#ECEFF1] hover:text-[#FF8F00] transition-colors" scroll={false}>
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/?tab=packages" className="text-[#ECEFF1] hover:text-[#FF8F00] transition-colors" scroll={false}>
                Packages
              </Link>
            </li>
            <li>
              <Link href="/?tab=buddy_finder" className="text-[#ECEFF1] hover:text-[#FF8F00] transition-colors" scroll={false}>
                Travel Buddy
              </Link>
            </li>
            <li>
              <Link href="/?tab=ai_assistant" className="text-[#ECEFF1] hover:text-[#FF8F00] transition-colors" scroll={false}>
                AI Assistant
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="col-span-full md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-4 text-[#ECEFF1]">
            {/* Placeholder social media icons - Replace with actual icons/components */}
            <a href="#" className="hover:text-[#FF8F00] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:text-[#FF8F00] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.7 1.1 3.8 1.5 5.8-.4 1.5-1.4 2.3-3.3 2.3-5.2 0-.6 0-1.1-.2-1.7 2.9-3.3 5.9-6.9 3.4-10.2z"/></svg>
            </a>
            <a href="#" className="hover:text-[#FF8F00] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
             <a href="#" className="hover:text-[#FF8F00] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Contact Info Section (Added based on image) */}
        <div className="col-span-full md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
          <div className="space-y-2 text-[#ECEFF1] text-sm">
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> 123 Adventure Ave, Travel City</p>
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> hello@wanderverse.com</p>
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.65A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +1 (234) 567-890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
