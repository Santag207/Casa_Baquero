import { useState } from 'react';
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
  const slides = photos.map((p) => ({ src: media(p.src, 1400), alt: p.alt }));
  const resolvedColumns = columns ?? (photos.length <= 1 ? 1 : photos.length === 2 ? 2 : photos.length <= 4 ? 2 : 3);
  const galleryClassName = `photo-gallery photo-gallery--cols-${resolvedColumns}`;

  return (
    <>
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
