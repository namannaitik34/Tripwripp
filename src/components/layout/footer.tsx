import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#8fa0b8]  py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-start md:text-left">
          <Image
            src="https://i.ibb.co/7trJccNS/58f1a629-2357-4415-a908-f7a1cadac9fe.png"
            alt="TripWripp-Demo Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-sm mb-2 text-pink">Tripwripp </p>
          <p className="text-sm mb-2">3rd Floor IC & SR </p>
          <p className="text-sm mb-2">Research park, IIT Madras</p>
          <p className="text-sm mt-4">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center md:items-start text-start md:text-left">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className=" hover:text-orange-500">Home</a></li>
            <li><a href="#" className=" hover:text-orange-500">Destinations</a></li>
            <li><a href="#" className=" hover:text-orange-500">Packages</a></li>
            <li><a href="#" className=" hover:text-orange-500">Travel Buddy</a></li>
            <li><a href="#" className=" hover:text-orange-500">AI Assistant</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-start text-start md:text-left">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <ul>
            <li><a href="#" className=" hover:text-orange-500"><i className="fab fa-facebook-f"></i>Facebook</a></li>
            <li><a href="#" className=" hover:text-orange-500"><i className="fab fa-twitter"></i>Twitter</a></li>
            <li><a href="#" className=" hover:text-orange-500"><i className="fab fa-instagram"></i>Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;