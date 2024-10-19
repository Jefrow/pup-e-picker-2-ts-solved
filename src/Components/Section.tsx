import { ReactNode } from 'react';
import { TactiveTab } from '../types';
import { useDogContext } from '../context';

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { setActiveTab, dogList, activeTab } = useDogContext();

  const toggleTab = (tab: TactiveTab) => {
    const tabValue = activeTab === tab ? 'all' : tab;
    setActiveTab(tabValue);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === 'favorited' ? 'active' : ''}`}
            onClick={() => {
              toggleTab('favorited');
            }}
          >
            favorited ( {dogList.favorited.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === 'unfavorited' ? 'active' : ''
            }`}
            onClick={() => {
              toggleTab('unfavorited');
            }}
          >
            unfavorited ( {dogList.unfavorited.length} )
          </div>
          <div
            className={`selector ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              toggleTab('create');
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
