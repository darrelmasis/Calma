import classNames from 'classnames';
import { Button } from '../ui/Button';
import { Icon } from './Icons';
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible';
import { HorizontalScroll } from './HorizontalScroll';

export const SidebarMenuTabs = ({ tabs, activeTab, setActiveTab, viewAllButtonText }) => {
  const allTabs = [
    { id: 'all', label: viewAllButtonText, icon: "table-columns" },
    ...tabs.map(tab => ({ id: tab.id, label: tab.label }))
  ];
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);


  return (
    <Fade className='position-sticky top-8'>
      <div className="text-center">
        <h3 className="text-center fs-h5 mb-3">Categorías</h3>
        <div className="categories-menu mx-3">
          <HorizontalScroll classNameContainer="d-flex flex-direction-xl-column mb-3 gap-2" activeIndex={activeTabIndex + 1}>
            {allTabs.map(tab => (
              <Button
                key={tab.id}
                variant="primary"
                ghost={true}
                size="small"
                label={tab.label}
                fullWidth
                icon={{
                  name: tab.icon,
                  size: "sm",
                  variant: "duotones",
                  duotone: "regular"
                }}
                className={classNames('text-wrap-nowrap', { 'ghost-active': tab.id === activeTab })}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </Fade>
  );
};
