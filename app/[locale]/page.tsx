import { useTranslations } from 'next-intl';
import ModeToggle from './components/ModeToggle';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <ModeToggle />
      {t('title')}
    </div>
  );
}
