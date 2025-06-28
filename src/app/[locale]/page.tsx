import { useTranslations } from 'next-intl';
import { mcHook, mcBiomes } from '@/hooks/minecraft-data';
// import minecraftData from 'minecraft-data'
import { SearchBar } from '../../components/search-bar';
import UploadExcel from '@/components/upload-file';


export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className='w-ful h-full flex flex-col items-center justify-center'>
      {/* <h1 className="font-game text-6xl">{t('title')}</h1> */}
      <h1 className="font-game text-6xl text-center text-chart-2">CobbleFinder</h1>
      <SearchBar />
      {/* <UploadExcel /> */}
    </div>
  );
}
