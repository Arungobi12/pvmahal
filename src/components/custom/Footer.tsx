import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">PV Mahal</h3>
            <p className="text-muted-foreground">
              Creating unforgettable memories with elegance and tradition.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-primary-gold transition-colors">About Us</a></li>
              <li><a href="/gallery" className="hover:text-primary-gold transition-colors">Gallery</a></li>
              <li><a href="/booking" className="hover:text-primary-gold transition-colors">Booking</a></li>
              <li><a href="/contact" className="hover:text-primary-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>Appanaickenpalayam, Kurudampalayam, Coimbatore, Tamil Nadu 641017.</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>+91 8778984254</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>pvmahal@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PV Mahal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;