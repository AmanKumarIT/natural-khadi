import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-[900px] mx-auto px-margin py-28 text-center">
      <h1 className="font-headline-xl text-2xl md:text-headline-xl uppercase tracking-[0.15em] text-heading-gray">Page not found</h1>
      <p className="font-nav-link text-sm text-heading-gray mt-4">The page you are looking for does not exist.</p>
      <Link to="/" className="inline-block mt-6 underline underline-offset-4 font-nav-link text-sm text-near-black hover:text-primary">Back to home</Link>
    </div>
  );
}
