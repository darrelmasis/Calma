import classNames from 'classnames';
import { Button } from '../ui/Button';
import { Icon } from './Icons';
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible';

export const SidebarMenuTabs = ({ tabs, activeTab, setActiveTab, viewAllButtonText }) => {
  const allTabs = [
    { id: 'all', label: viewAllButtonText, icon: <Icon name="table-columns" /> },
    ...tabs.map(tab => ({ id: tab.id, label: tab.label }))
  ];

  return (
    <Fade className='position-sticky top-2'>
      <div className="bg-white border py-2 px-1 rounded text-center">
        <h3 className="text-center">Categorías</h3>
        <div className="d-block d-lg-flex flex-direction-column">
          {allTabs.map(tab => (
            <Button
              key={tab.id}
              variant="primary-ghost"
              label={tab.label}
              size="small"
              icon={tab.icon}
              classes={classNames('m-2 fw-bold', { 'ghost-active': tab.id === activeTab })}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>
    </Fade>
  );
};
