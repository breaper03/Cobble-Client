import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from '../../components/theme-switcher';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <Button>Hello world</Button>
      <ThemeSwitcher />

      <h1 className="font-game text-6xl">{t('title')}</h1>
    </div>
  );
}
