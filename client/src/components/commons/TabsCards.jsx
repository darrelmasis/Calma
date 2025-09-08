import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible';

export const TabsCards = ({ tabs, activeTab }) => {
  const isAllActive = activeTab === 'all';

  return (
    <>
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
    </>
  );
};
