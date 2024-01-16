import React, { useRef, useState } from 'react';
import styles from './ImagesCard.module.scss';

interface CarouselProps {
  images: string[];
}

const ImagesCard: React.FC<CarouselProps> = ({ images }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const newIndex = (currentImage + 1) % images.length;
      setCurrentImage(newIndex);
      carouselRef.current.scrollTo({
        left: carouselWidth * newIndex,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const newIndex = (currentImage - 1 + images.length) % images.length;
      setCurrentImage(newIndex);
      carouselRef.current.scrollTo({
        left: carouselWidth * newIndex,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slider} ref={carouselRef}>
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Carousel image ${index}`}
            className={`${styles.image} ${
              index === currentImage ? styles.active : ''
            } col-6`}
          />
        ))}

        <button className={styles.prev} onClick={handlePrevClick}>
          ←
        </button>

        <button className={styles.next} onClick={handleNextClick}>
          →
        </button>
      </div>
    </div>
  );
};

export default ImagesCard;
