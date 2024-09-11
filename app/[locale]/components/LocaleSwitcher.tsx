'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const localeLabel = {
    en: 'English',
    es: 'Español',
  } as const;

  const locale =
    localeLabel[localActive as keyof typeof localeLabel] || 'Unknown Locale';

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <Select
      defaultValue={localActive}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      <SelectTrigger className="w-28">
        <SelectValue>{locale}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LocaleSwitcher;
