import React, {useState} from 'react';
import styles from './EspacePerso.module.css'
import SideBar from './SideBarEspacePerso'
import InformationsPerso from './InformationsPerso/InformationsPerso';
import EspaceLocataire from './EspaceLocataire/EspaceLocataire';
import MesFavoris from './MesFavoris/MesFavoris';
import DemandesEnCours from './DemandesEnCours/DemandesEnCours';

const EspacePerso: React.FC = () => {

  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 0:
        return <InformationsPerso />;
      case 1:
        return <EspaceLocataire />;
      case 2:
        return <MesFavoris />;
      case 3:
        return <DemandesEnCours />;
      default:
        return <InformationsPerso />;
    }
  };

  return (
    <div>
        <div className={styles.espacePerso}>
            <SideBar selectedItem={selectedItem} onItemSelected={handleItemClick}/>
            <div>
                {renderComponent()}
            </div>
        </div>
    </div>
  );
};

export default EspacePerso;