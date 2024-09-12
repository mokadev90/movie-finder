import LocaleSwitcher from '@/app/[locale]/components/LocaleSwitcher';
import ModeToggle from '@/app/[locale]/components/ModeToggle';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Search from '../Search/Search';

function Header() {
  return (
    <header className="flex w-full flex-col items-center justify-between gap-8 border-b-2 p-4 lg:flex-row">
      {/* <div className="flex items-center gap-4"> */}
      <Link href="/" className="min-w-36">
        <Image src="/logo.svg" alt="Logo" width={250} height={40} />
      </Link>
      {/* <Image src="/logo-text.svg" width={150} height={40} />
      </div> */}
      <div className="flex flex-col gap-8">
        <Search />
        <div className="flex gap-8 self-end">
          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
