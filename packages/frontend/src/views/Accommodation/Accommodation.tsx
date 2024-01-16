import React from 'react';
import TitleCard from './component/TitleCard/TitleCard';
import OverviewCard from './component/OverviewCard/OverviewCard';
import PropertyDetailsCard from './component/PropertyDetailsCard/PropertyDetailsCard';
import ImageCard from './component/ImagesCard/ImagesCard';
import ContactProperty from './component/ContactProperty/ContactProperty';
import styles from './Accommodation.module.scss';


const images = [
  'https://picsum.photos/id/1015/1000/600',
  'https://picsum.photos/id/1016/1000/600',
  'https://picsum.photos/id/1018/1000/600',
  'https://picsum.photos/id/1019/1000/600',
];

const Accommodation: React.FC = () => {
 return (
    <div className={styles.container}>
      <TitleCard name={"La chambre secrete"} location={"chez ta mere"} beds={2} baths={1} size={250} yearBuilt={2025}/>
      <ImageCard images={images} />
      <div className={styles.cardContainer}>
      <div className={styles.cardContainerColumn}>

        <OverviewCard beds={2} baths={1} size={250} rooms={25} garages={2} yearBuilt={2025} propertyType='Villa'/>
        <PropertyDetailsCard id={20} price={250} size={250} chargesPrice={25} roomsCount={2} description='Une belle villa au bord de mer' propertyType='Villa'/>
        </div>
        <ContactProperty/>
      </div>
    </div>
 );
};

export default Accommodation;