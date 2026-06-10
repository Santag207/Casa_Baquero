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

      {/* VIRTUAL TOUR */}
      <section className="home-virtual-tour">
        <div className="container">
          <div id="informacion" className="informacion-block">
            <p>
              <iframe
                className="paniframe"
                name="_pano"
                src="https://webmastersac.com/Tour360fincahotelbaquero/index.html?tour_soundson=false&tour_soundsvolume=0"
                frameBorder="0"
                scrolling="no"
                height="500"
                width="100%"
                allowFullScreen
                allow="autoplay 'none'; microphone 'none'"
              />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
