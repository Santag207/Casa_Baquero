import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SITE } from '../data/site';
import { media } from '../data/media';
import { openWhatsAppReservation } from '../utils/whatsapp';
import './ContactPage.scss';

export function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      '💚 *Consulta — Casa Baquero*',
      '',
      `👤 ${form.name}`,
      `📧 ${form.email}`,
      `📱 ${form.phone}`,
      '',
      form.message,
    ].join('\n');
    openWhatsAppReservation(text);
    setSent(true);
  };

  return (
    <div className="contact-page">
      <header
        className="page-hero"
        style={{ backgroundImage: `url(${media('/media/29214/hotel-villavicencio-finca-casa-baquero-7c.jpg', 1600)})` }}
      >
        <div className="container">
          <h1>{t.contact.pageTitle}</h1>
          <p>{t.contact.pageSubtitle}</p>
        </div>
      </header>

      <section className="section-pad container contact-page__grid">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2>{t.contact.askTitle}</h2>
          {sent ? (
            <p className="contact-page__success">
              {t.contact.successMsg}
            </p>
          ) : (
            <form className="contact-page__form" onSubmit={handleSubmit}>
              <label>
                {t.contact.nameLabel}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>
                {t.contact.emailLabel}
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label>
                {t.contact.phoneLabel}
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <label>
                {t.contact.messageLabel}
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.contact.messagePlaceholder} />
              </label>
              <button type="submit" className="btn btn--primary">
                {t.contact.sendBtn}
              </button>
            </form>
          )}
        </motion.div>

        <div className="contact-page__info">
          <img src={media('/images/hero/logo-hotel-casa-baquero.png')} alt="" width={160} style={{ borderRadius: 6 }} />
          <h2>{t.contact.phonesTitle}</h2>
          <p>
            Contacto: {SITE.phones.landline}
            <br />
            WhatsApp:{' '}
            <a href={`https://wa.me/${SITE.phones.whatsappDigits}`} target="_blank" rel="noreferrer">
              {SITE.phones.whatsapp}
            </a>
          </p>
          <h2>{t.contact.emailTitle}</h2>
          <p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <h2>{t.contact.howToGet}</h2>
          <p>
            {SITE.location}{' '}
            <a href={`https://maps.google.com/maps?q=${SITE.mapCoords.lat},${SITE.mapCoords.lng}`} target="_blank" rel="noreferrer">
              {t.contact.viewMap}
            </a>
          </p>
        </div>
      </section>

      <div className="contact-page__map container">
        <iframe title={t.contact.mapTitle} src={SITE.mapEmbed} loading="lazy" allowFullScreen />
      </div>
    </div>
  );
}
