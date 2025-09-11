import { useState, useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import { SidebarMenuTabs } from './SidebarMenuTabs';
import { TabsCards } from './TabsCards';
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible';
const STORAGE_KEY = 'activeTab';

export const Tabs = ({ tabs }) => {
  const { t } = useLang();
  const viewAllButtonText = t('services.section_1.view_all');

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'all';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeTab);
  }, [activeTab]);

  return (
    <div className="grid">
      <div className="grid-row  gap-lg-3">
        {/* Encabezado arriba */}
        <div className="grid-col-12 grid-col-lg-10 grid-offset-lg-3 d-flex flex-direction-column align-items-center justify-content-center">
          <Fade>
            <h1 className="fs-4 text-primary text-center">
              {t('services.section_1.title')}
            </h1>
          </Fade>
          <Fade>
            <p className='text-center text-muted mw-500'>
              {t('services.section_1.description')}
            </p>
          </Fade>
        </div>
      </div>

      {/* Fila con sidebar + cards */}
      <div className="grid-row gap-lg-3 mt-4">
        <div className="grid-col-12 grid-col-lg-2">
          <SidebarMenuTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            viewAllButtonText={viewAllButtonText}
          />
        </div>
        <div className="grid-col-12 grid-col-lg-10">
          <TabsCards tabs={tabs} activeTab={activeTab} />
        </div>
      </div>
    </div>

  );
};
