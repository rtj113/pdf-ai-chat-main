'use client'

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const ConditionalFooter = () => {
  const pathname = usePathname();
  const showFooter = !pathname?.startsWith('/dashboard');

  return showFooter ? <Footer /> : null;
};

export default ConditionalFooter;