import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-body">
      <div className="flex items-center gap-2">
        <Leaf className="w-4 h-4 text-primary" />
        <span>© {new Date().getFullYear()} CropAI. All rights reserved.</span>
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
