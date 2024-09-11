import { useTranslations } from 'next-intl';
import React from 'react';

function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="b-0 flex h-full w-screen items-end justify-center border-t-2 p-4">
      <span className="">{t('sign')}</span>
    </footer>
  );
}

export default Footer;
