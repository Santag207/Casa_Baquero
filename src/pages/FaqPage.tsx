import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  BedDouble,
  CreditCard,
  Waves,
  UtensilsCrossed,
  MapPin,
  Dog,
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { SITE } from '../data/site';
import { media } from '../data/media';
import { HOME_GALLERY } from '../data/galleries';
import './FaqPage.scss';

/* ─── DATOS ─── */
interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  icon: React.ReactNode;
  label: string;
  faqs: FaqItem[];
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'reservas',
    icon: <BedDouble size={22} strokeWidth={1.5} />,
    label: 'Reservas & Check-in',
    faqs: [
      {
        q: '¿Cómo puedo hacer una reserva?',
        a: 'Puedes reservar directamente desde nuestra página web en la sección "Reservar", por WhatsApp al +57 310 818 8183 o al teléfono fijo (608) 678 3807. También puedes escribirnos al correo reservascasabaquero@gmail.com.',
      },
      {
        q: '¿Cuál es el horario de check-in y check-out?',
        a: 'El check-in está disponible a partir de las 3:00 p.m. El check-out debe realizarse antes de la 1:00 p.m. Si necesitas horarios diferentes, comunícate con nosotros con anticipación y lo coordinaremos según disponibilidad.',
      },
      {
        q: '¿Con cuánta anticipación debo reservar?',
        a: 'Te recomendamos reservar con al menos 1 semana de anticipación, especialmente en temporada alta (Semana Santa, junio-julio, diciembre-enero y festivos). Para grupos o eventos, lo ideal es reservar con 2 a 4 semanas de anticipación.',
      },
      {
        q: '¿Puedo modificar o cancelar mi reserva?',
        a: 'Sí. Las cancelaciones realizadas con más de 72 horas de anticipación no generan cargo. Las cancelaciones con menos de 72 horas o no presentaciones (no-show) pueden estar sujetas a cobro del 50% del valor de la primera noche. Contáctanos directamente para gestionar cambios.',
      },
      {
        q: '¿Hay un número mínimo de noches para reservar?',
        a: 'En temporada baja puedes reservar desde 1 noche. En temporadas altas (Semana Santa, fin de año y festivos largos) puede aplicar un mínimo de 2 a 3 noches. Consúltanos para tu fecha específica.',
      },
    ],
  },
  {
    id: 'pagos',
    icon: <CreditCard size={22} strokeWidth={1.5} />,
    label: 'Pagos & Tarifas',
    faqs: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos efectivo, transferencia bancaria y pagos por PSE. Para reservas anticipadas solicitamos un abono del 50% del total de la estadía como garantía. El saldo restante se cancela al momento del check-in.',
      },
      {
        q: '¿Las tarifas incluyen impuestos?',
        a: 'Las tarifas publicadas en nuestra web no incluyen IVA (19%). El valor final con impuestos se detalla en la cotización que te enviamos al confirmar tu reserva.',
      },
      {
        q: '¿Qué incluye el precio de la habitación?',
        a: 'El precio incluye alojamiento, acceso a la piscina, zonas verdes y áreas comunes, parqueadero y WiFi. El desayuno es opcional y tiene un costo adicional. Los huéspedes adicionales a la capacidad base tienen un sobrecargo por noche.',
      },
      {
        q: '¿Ofrecen descuentos por estadías prolongadas?',
        a: 'Sí, para estadías de 5 noches o más podemos ofrecer tarifas especiales. Contáctanos directamente para recibir una cotización personalizada.',
      },
    ],
  },
  {
    id: 'instalaciones',
    icon: <Waves size={22} strokeWidth={1.5} />,
    label: 'Instalaciones & Servicios',
    faqs: [
      {
        q: '¿La piscina está disponible todo el día?',
        a: 'La piscina está disponible para los huéspedes de 8:00 a.m. a 8:00 p.m. todos los días. Contamos con zona de hamacas, sillas longas y sombrillas para tu comodidad.',
      },
      {
        q: '¿Tienen zona BBQ disponible?',
        a: 'Sí, contamos con zonas BBQ equipadas disponibles para los huéspedes. Para uso exclusivo o en eventos, te recomendamos reservarlo con anticipación a través de recepción.',
      },
      {
        q: '¿Qué juegos y deportes hay disponibles?',
        a: 'Disponemos de billar, ping-pong, mini-tejo, cancha de voleibol y zonas de juego para niños. Todos los equipos están disponibles sin costo adicional para los huéspedes.',
      },
      {
        q: '¿El WiFi es gratuito y de buena velocidad?',
        a: 'Sí, ofrecemos WiFi gratuito en todas las habitaciones y zonas comunes. Contamos con una conexión de fibra óptica para garantizar buena velocidad durante tu estadía.',
      },
      {
        q: '¿Tienen parqueadero?',
        a: 'Sí, contamos con parqueadero privado con vigilancia incluido en el precio de la habitación. Tenemos espacio para vehículos particulares, camionetas y buses pequeños.',
      },
    ],
  },
  {
    id: 'restaurante',
    icon: <UtensilsCrossed size={22} strokeWidth={1.5} />,
    label: 'Restaurante & Alimentación',
    faqs: [
      {
        q: '¿El desayuno está incluido en la tarifa?',
        a: 'El desayuno no está incluido por defecto, pero lo puedes agregar al momento de la reserva. Se sirve de 7:30 a.m. a 10:00 a.m. y contamos con opciones típicas llaneras y opción continental.',
      },
      {
        q: '¿Cuál es el horario del restaurante?',
        a: 'El restaurante atiende almuerzo de 12:30 p.m. a 3:00 p.m. y cena de 6:00 p.m. a 9:00 p.m. Para grupos grandes, recomendamos hacer el pedido con anticipación.',
      },
      {
        q: '¿Tienen opciones vegetarianas o para dietas especiales?',
        a: 'Sí, podemos adaptarnos a restricciones alimentarias como vegetarianismo, alergias o intolerancias. Te pedimos que nos informes al momento de la reserva para tener todo preparado con anticipación.',
      },
      {
        q: '¿Puedo llevar mi propia comida para preparar en la zona BBQ?',
        a: 'Por supuesto. Los huéspedes pueden usar las zonas BBQ con sus propios alimentos. También ofrecemos servicio de parrilla si deseas que nuestro personal prepare los alimentos.',
      },
    ],
  },
  {
    id: 'ubicacion',
    icon: <MapPin size={22} strokeWidth={1.5} />,
    label: 'Ubicación & Transporte',
    faqs: [
      {
        q: '¿Dónde está ubicado Casa Baquero?',
        a: 'Estamos ubicados en la Antigua vía a Restrepo, 150 metros adelante de Pozo Azul, Vereda Vanguardia, Villavicencio, Meta. A solo 10 minutos del centro de Villavicencio y 8 minutos del Aeropuerto La Vanguardia.',
      },
      {
        q: '¿Ofrecen servicio de transporte desde el aeropuerto?',
        a: 'No contamos con servicio de transporte propio, pero podemos orientarte sobre las mejores opciones de taxi o plataformas de transporte disponibles en Villavicencio para llegar a nuestra finca.',
      },
      {
        q: '¿Es fácil llegar en vehículo propio?',
        a: 'Sí. Desde el centro de Villavicencio tomas la antigua vía a Restrepo y en aproximadamente 10 minutos llegas a Casa Baquero. La vía está pavimentada y en buen estado. Te enviamos la ubicación exacta por WhatsApp al confirmar tu reserva.',
      },
    ],
  },
  {
    id: 'mascotas',
    icon: <Dog size={22} strokeWidth={1.5} />,
    label: 'Mascotas',
    faqs: [
      {
        q: '¿Permiten mascotas?',
        a: 'Sí, somos un hotel pet-friendly. Aceptamos perros y gatos de cualquier tamaño, siempre y cuando estén al día con sus vacunas y desparasitación. Se aplica un cargo adicional por mascota por noche.',
      },
      {
        q: '¿Hay restricciones para las mascotas dentro de la finca?',
        a: 'Las mascotas deben permanecer con correa en áreas comunes y no están permitidas en el restaurante, la piscina ni las habitaciones de otros huéspedes sin consentimiento. Los dueños son responsables del comportamiento y limpieza de sus mascotas.',
      },
      {
        q: '¿Las mascotas tienen cargo adicional?',
        a: 'Sí, se cobra un valor adicional por mascota por noche. Consulta el valor actual al momento de tu reserva, ya que puede variar según el tamaño de la mascota.',
      },
    ],
  },
];

/* ─── ACCORDION ITEM ─── */
function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-accordion__item ${isOpen ? 'is-open' : ''}`}>
      <button className="faq-accordion__trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-accordion__question">{item.q}</span>
        <span className="faq-accordion__chevron">
          <ChevronDown size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-accordion__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="faq-accordion__answer">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── PÁGINA ─── */
export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>('reservas');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const toggleItem = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faq-page">
      {/* ── HERO ── */}
      <header
        className="faq-hero page-hero"
        style={{
          backgroundImage: `url(${media(
            '/media/29473/a-hotel-villavicencio-casa-baquero-18bb.jpg',
            1920,
            1080
          )})`,
        }}
      >
        <div className="container faq-hero__content">
          <motion.span
            className="faq-hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Información & Ayuda
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Preguntas Frecuentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Encuentra aquí las respuestas a las dudas más comunes sobre tu estadía
            en Finca Hotel Casa Baquero.
          </motion.p>
        </div>
        <div className="faq-hero__wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </header>

      {/* ── INTRO STATS ── */}
      <section className="faq-intro-bar">
        <div className="container faq-intro-bar__grid">
          {[
            { value: '30+', label: 'Preguntas resueltas' },
            { value: '6', label: 'Categorías de ayuda' },
            { value: '24h', label: 'Tiempo de respuesta' },
          ].map((s) => (
            <div key={s.label} className="faq-intro-stat">
              <span className="faq-intro-stat__value">{s.value}</span>
              <span className="faq-intro-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="faq-main">
        <div className="container faq-main__inner">
          {/* Sidebar de categorías */}
          <aside className="faq-sidebar">
            <p className="faq-sidebar__title">Categorías</p>
            <nav className="faq-sidebar__nav">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`faq-sidebar__btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span className="faq-sidebar__btn-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </nav>

            {/* Card de contacto rápido */}
            <div className="faq-contact-card">
              <HelpCircle size={28} strokeWidth={1.5} />
              <h4>¿No encontraste tu respuesta?</h4>
              <p>Escríbenos directamente y te ayudamos.</p>
              <a
                href={`https://wa.me/${SITE.phones.whatsappDigits}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </aside>

          {/* Acordeón */}
          <main className="faq-content">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="faq-content__header">
                <span className="faq-content__icon">{currentCategory.icon}</span>
                <h2 className="faq-content__title">{currentCategory.label}</h2>
              </div>

              <div className="faq-accordion">
                {currentCategory.faqs.map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    isOpen={openIndex === i}
                    onToggle={() => toggleItem(i)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Mobile category chips */}
            <div className="faq-category-chips">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`faq-chip ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* ── CTA SPLIT ── */}
      <section className="faq-cta">
        <div
          className="faq-cta__image"
          style={{
            backgroundImage: `url(${media(HOME_GALLERY[4]?.src || '/media/29466/a-hotel-villavicencio-casa-baquero-9bb.jpg', 900, 700)})`,
          }}
        />
        <div className="faq-cta__content">
          <span className="faq-cta__eyebrow">¿Todo claro?</span>
          <h2 className="faq-cta__title">¿Listo para hacer tu reserva?</h2>
          <p className="faq-cta__desc">
            Si ya resolviste todas tus dudas, el siguiente paso es reservar tu
            estadía en Casa Baquero y vivir la experiencia del Llano colombiano.
          </p>
          <div className="faq-cta__actions">
            <Link to="/reservar" className="btn btn--primary btn--lg">
              Reservar ahora
            </Link>
            <Link to="/reglas" className="faq-cta__link">
              Ver reglas del lugar <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
