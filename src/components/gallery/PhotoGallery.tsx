import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { media } from '../../data/media';
import './PhotoGallery.scss';

interface Photo {
  src: string;
  alt: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  columns?: 1 | 2 | 3 | 4;
}

export function PhotoGallery({ photos, columns }: PhotoGalleryProps) {
  const [index, setIndex] = useState(-1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const slides = photos.map((p) => ({ src: media(p.src, 1400), alt: p.alt }));
  const resolvedColumns =
    columns ?? (photos.length <= 1 ? 1 : photos.length === 2 ? 2 : photos.length <= 4 ? 2 : 3);
  const galleryClassName = `photo-gallery photo-gallery--cols-${resolvedColumns}`;

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    const t = setInterval(() => setCarouselIndex((i) => (i + 1) % photos.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div className="photo-gallery__carousel">
        <div className="photo-gallery__viewport">
          <div
            className="photo-gallery__track"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {photos.map((photo, i) => (
              <button
                key={photo.src + i}
                type="button"
                className="photo-gallery__carousel-item"
                onClick={() => setIndex(i)}
              >
                <img src={media(photo.src, 480, 320)} alt={photo.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="photo-gallery__btn photo-gallery__btn--prev"
          aria-label="Anterior"
          onClick={() => setCarouselIndex((i) => (i === 0 ? photos.length - 1 : i - 1))}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          type="button"
          className="photo-gallery__btn photo-gallery__btn--next"
          aria-label="Siguiente"
          onClick={() => setCarouselIndex((i) => (i === photos.length - 1 ? 0 : i + 1))}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        <div className="photo-gallery__dots">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`photo-gallery__dot${i === carouselIndex ? ' photo-gallery__dot--active' : ''}`}
              aria-label={`Ir a imagen ${i + 1}`}
              onClick={() => setCarouselIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className={galleryClassName}>
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src + i}
            type="button"
            className="photo-gallery__item"
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <img src={media(photo.src, 480, 320)} alt={photo.alt} loading="lazy" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </>
  );
}
