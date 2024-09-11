import LocaleSwitcher from '@/app/[locale]/components/LocaleSwitcher';
import ModeToggle from '@/app/[locale]/components/ModeToggle';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className="flex h-24 w-screen justify-between border-b-2 p-4">
      {/* <div className="flex items-center gap-4"> */}
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={250} height={40} />
      </Link>
      {/* <Image src="/logo-text.svg" width={150} height={40} />
      </div> */}
      <div className="flex gap-8">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
