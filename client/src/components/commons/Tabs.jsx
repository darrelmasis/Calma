import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Button } from '../ui/Button';
import { useLang } from '../../i18n/LanguageContext';
import { Icon } from './Icons';
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'


const STORAGE_KEY = 'activeTab';

export const Tabs = ({ tabs }) => {
  const { t } = useLang();
  const viewAllButtonText = t('services.section_1.view_all');

  // Estado inicial: intenta recuperar del localStorage o usa "all"
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'all';
  });

  // Persistir en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeTab);
  }, [activeTab]);

  const isAllActive = activeTab === 'all';

  return (
    <div className="grid">
      <div className="grid-row gap-lg-3">

        {/* Sidebar de categorías */}
        <div className="grid-col-12 grid-col-lg-2">
          <Fade>

            <div className="bg-white border py-2 px-1 rounded position-sticky top-2 text-center">
              <h3 className="text-center">
                {t('services.section_1.tabsHeader')}
              </h3>
              <div className="d-block d-lg-flex flex-direction-column">

                {/* Botón para mostrar todos */}
                <Button
                  variant="primary-ghost"
                  label={viewAllButtonText}
                  icon={<Icon name="table-columns" />}
                  key="all"
                  size="small"
                  classes={classNames('m-2 fw-bold', {
                    'ghost-active': isAllActive
                  })}
                  onClick={() => setActiveTab('all')}
                />

                {tabs.map((tab) => {

                  return (

                    <Button
                      variant="primary-ghost"
                      label={tab.label}
                      key={tab.id}
                      size="small"
                      classes={classNames('m-2 fw-bold', {
                        'ghost-active': tab.id === activeTab
                      })}
                      onClick={() => setActiveTab(tab.id)}
                    />
                  )

                })}
              </div>
            </div>
          </Fade>
        </div>

        {/* Contenido */}
        <div className="grid-col-12 grid-col-lg-10">
          {isAllActive ? (
            tabs.map((tab) => (
              <div key={tab.id} className="tabPanel visible mb-6">
                <Fade><h4 className="mb-5 mt-0 text-center fs-4">{tab.label}</h4></Fade>
                {tab.content}
              </div>
            ))
          ) : (
            tabs
              .filter((tab) => tab.id === activeTab)
              .map((tab) => (
                <div key={tab.id} className="tabPanel visible">
                  {tab.content}
                </div>
              ))
          )}
        </div>

      </div>
    </div>
  );
};
