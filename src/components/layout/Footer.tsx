import { NewsletterSection } from '../ui/NewsLetterSection';
import { FooterBottom } from '../ui/FooterBottom';

export function Footer() {
  return (
    <footer className="bg-black w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <NewsletterSection />
        <div className="border-t border-gray-800 my-8 sm:my-12"></div>
        <FooterBottom />
      </div>
    </footer>
  );
}
