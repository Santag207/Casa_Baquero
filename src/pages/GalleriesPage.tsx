import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GALLERY_GROUPS } from '../data/galleries';
import { PhotoGallery } from '../components/gallery/PhotoGallery';
import { media } from '../data/media';

export function GalleriesPage() {
  const { t } = useLanguage();
  return (
    <>
      <header
        className="page-hero"
        style={{
          backgroundImage: `url(${media('/media/29473/a-hotel-villavicencio-casa-baquero-18bb.jpg', 1600)})`,
        }}
      >
        <div className="container">
          <h1>{t.galleries.pageTitle}</h1>
          <p>{t.galleries.pageSubtitle}</p>
        </div>
      </header>
      {GALLERY_GROUPS.map((group, i) => (
        <motion.section
          key={group.id}
          className="section-pad container"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <header className="section-head" style={{ textAlign: 'left' }}>
            <h2>{group.title}</h2>
            <p>{group.subtitle}</p>
          </header>
          <PhotoGallery photos={group.images} columns={3} />
        </motion.section>
      ))}
    </>
  );
}
