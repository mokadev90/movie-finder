'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SearchFormValues {
  searchbar: string;
}

function Search() {
  const t = useTranslations('Header');
  const localeActive = useLocale();
  const router = useRouter();
  const form = useForm<SearchFormValues>();
  const onSubmit: SubmitHandler<SearchFormValues> = ({ searchbar }) => {
    router.push(`/${localeActive}/gallery/${searchbar}`);
  };

  return (
    <div>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <FormField
            control={form.control}
            name="searchbar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="search"
                    placeholder={t('placeholder')}
                    className="w-full"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Search;
