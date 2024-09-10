'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useTransition } from 'react';

function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <label className="rounded border-2">
      <p className="sr-only">change language</p>
      <select
        defaultValue={localActive}
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </label>
  );
}

export default LocaleSwitcher;
