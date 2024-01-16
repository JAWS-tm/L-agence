import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Input from '../../../../components/Input/Input';
import HorizontalSelector from '../HorizontalSelector/HorizontalSelector';
import styles from './FiltersSidebar.module.scss';
import Slider from 'rc-slider';
import classNames from 'classnames';
import 'rc-slider/assets/index.css';

type Props = {
  isShown?: boolean;
  onRequestClose?: () => void;
};

const roomsOptions = [
  { id: 'all', label: 'Tous' },
  { id: 'onePlus', label: '1+' },
  { id: 'twoPlus', label: '2+' },
  { id: 'threePlus', label: '3+' },
  { id: 'fourPlus', label: '4+' },
] as const;

const MIN_PRICE = 100;
const MAX_PRICE = 3000;
const STEP_PRICE = 50;

type RoomsType = 'apartment' | 'house' | 'roomsharing';

const FiltersSidebar = (props: Props) => {
  const [rooms, setRooms] =
    useState<(typeof roomsOptions)[number]['id']>('all');
  const [type, setType] = useState<RoomsType[]>(['apartment']);
  const [price, setPrice] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [isBackdropHidding, setIsBackdropHiding] = useState(false);

  const onCheckType = (value: boolean, checkboxType: RoomsType) => {
    if (value) {
      setType([...type, checkboxType]);
    } else {
      setType(type.filter((t) => t !== checkboxType));
    }
  };

  const closeSidebar = () => {
    setIsBackdropHiding(true);
    props.onRequestClose?.();

    // Use timeout to wait for the animation to finish
    setTimeout(() => {
      setIsBackdropHiding(false);
    }, 300);
  };

  return (
    <>
      {(props.isShown || isBackdropHidding) && (
        <div
          className={classNames(
            styles.filterBackdrop,
            isBackdropHidding && styles.closing
          )}
          onClick={closeSidebar}
        />
      )}
      <div
        className={classNames(
          styles.filtersSidebar,
          props.isShown && styles.shown
        )}>
        <div className={styles.mobileHeader}>
          <h1>Filtres de recherche</h1>

          <i className="fa-solid fa-xmark" onClick={closeSidebar} />
        </div>

        <div className={styles.filtersSidebarSection}>
          <h4 className={styles.sectionTitle}>Type de logement</h4>

          <Checkbox
            className={styles.checkbox}
            label="Appartement"
            checked={type.includes('apartment')}
            onCheck={(val) => onCheckType(val, 'apartment')}
          />
          <Checkbox
            className={styles.checkbox}
            label="Maison"
            checked={type.includes('house')}
            onCheck={(val) => onCheckType(val, 'house')}
          />
        </div>

        <div className={styles.filtersSidebarSection}>
          <h4 className={styles.sectionTitle}>Nombre de pièces</h4>

          <HorizontalSelector
            options={roomsOptions}
            onChange={(id) => setRooms(id)}
            value={rooms}
          />
        </div>

        <div className={styles.filtersSidebarSection}>
          <h4 className={styles.sectionTitle}>Prix</h4>
          <Slider
            range
            allowCross={false}
            value={price}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={STEP_PRICE}
            onChange={(value) => setPrice(value as [number, number])}
            classNames={{
              handle: styles.handle,
              track: styles.track,
              rail: styles.trackBase,
            }}
          />
          <div className={styles.priceValues}>
            <Input placeholder={price[0] + '€'} type="number" disabled />
            -
            <Input placeholder={price[1] + '€'} type="number" disabled />
          </div>
        </div>

        <Button
          value="Rechercher"
          type="primary"
          icon={<i className="fa-solid fa-magnifying-glass" />}
          className={styles.searchButton}
        />
      </div>
    </>
  );
};

export default FiltersSidebar;
