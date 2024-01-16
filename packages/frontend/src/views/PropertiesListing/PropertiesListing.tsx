import { useState } from 'react';
import FiltersSidebar from './components/FiltersSidebar/FiltersSidebar';
import PropertyCard from './components/PropertyCard/PropertyCard';
import styles from './PropertiesListing.module.scss';
import Button from '../../components/Button/Button';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const breadcrumbPaths = [
  { name: 'Accueil', path: '/' },
  { name: 'Locations', path: '/properties' },
];

const PropertiesListing = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);

  return (
    <>
      <div className={styles.listHeader}>
        <Breadcrumb paths={breadcrumbPaths} />

        <Button
          value="Filtres"
          onClick={() => setIsSidebarShown(true)}
          type="primary"
          icon={<i className="fa-solid fa-filter" />}
          className={styles.filtersButton}
        />
      </div>

      <div className={styles.container}>
        <FiltersSidebar
          isShown={isSidebarShown}
          onRequestClose={() => setIsSidebarShown(false)}
        />
        <div className={styles.propertiesGrid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <PropertyCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertiesListing;
