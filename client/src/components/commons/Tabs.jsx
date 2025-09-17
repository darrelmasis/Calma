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
      {/* Fila con sidebar + cards */}
      <div className="grid-row gap-md-2 mt-4">
        <div className="grid-col-12 grid-col-xl-2">
          <SidebarMenuTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            viewAllButtonText={viewAllButtonText}
          />
        </div>
        <div className="grid-col-12 grid-col-xl-10 grid-row gap-2">
          <TabsCards tabs={tabs} activeTab={activeTab} />
        </div>
      </div>
    </div>

  );
};
