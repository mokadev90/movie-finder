import { useTranslations } from 'next-intl';
import React from 'react';
import packageJson from '../../../package.json';

function Footer() {
  const t = useTranslations('Footer');
  const version = `v${packageJson.version}`;
  return (
    <footer className="b-0 flex h-full w-screen items-end justify-between border-t-2 p-4">
      <span className="">{t('sign')}</span>
      <span className="">{version}</span>
    </footer>
  );
}

export default Footer;
