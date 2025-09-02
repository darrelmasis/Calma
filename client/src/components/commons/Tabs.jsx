import { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../ui/Button';
import { useLang } from '../../i18n/LanguageContext';

export const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const isAllActive = activeTab === 'all';
  const { t } = useLang();
  const viewAllButtonText = t('services.section_1.view_all', { returnObjects: true })

  return (
    <div className="grid">
      <div className="grid-row gap-lg-3">

        <div className="grid-col-12 grid-col-lg-2">
          <div className="bg-white border py-2 px-1 rounded position-sticky top-2">
            <h3 className='text-center'>Categorías</h3>
            <div className="d-block d-lg-flex flex-direction-column">
              {/* Botón para mostrar todos */}
              <Button
                variant='primary-ghost'
                label={viewAllButtonText}
                key="all"
                size="small"
                classes={classNames('m-2', {
                  'ghost-active': isAllActive
                })}
                onClick={() => setActiveTab('all')}
              />

              {tabs.map((tab) => (
                <Button
                  variant='primary-ghost'
                  label={tab.label}
                  key={tab.id}
                  size="small"
                  classes={classNames('m-2', {
                    'ghost-active': tab.id === activeTab
                  })}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid-col-12 grid-col-lg-10">
          {isAllActive ? (
            // Si está activado "Ver todas", mostramos todos los contenidos
            tabs.map((tab) => (
              <div key={tab.id} className="tabPanel visible mb-6">
                <h4 className="mb-2 text-xl font-bold">{tab.label}</h4>
                {tab.content}
              </div>
            ))
          ) : (
            // Si no, mostramos solo el tab activo
            tabs.map((tab) => (
              <div
                key={tab.id}
                className={classNames('tabPanel', {
                  visible: tab.id === activeTab,
                  hidden: tab.id !== activeTab,
                })}
              >
                {tab.content}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

