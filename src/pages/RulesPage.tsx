import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  Volume2,
  Flame,
  Dog,
  Cigarette,
  Waves,
  Music2,
  Shield,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { media } from '../data/media';
import { HOME_GALLERY } from '../data/galleries';
import './RulesPage.scss';

/* ─── DATOS ─── */
interface Rule {
  text: string;
  type: 'allow' | 'restrict' | 'info';
}

interface RuleSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  rules: Rule[];
}

const RULE_SECTIONS: RuleSection[] = [
  {
    id: 'horarios',
    icon: <Clock size={28} strokeWidth={1.5} />,
    title: 'Horarios & Check-in / Out',
    color: '#14b8a6',
    rules: [
      { text: 'Check-in disponible desde las 3:00 p.m.', type: 'info' },
      { text: 'Check-out debe realizarse antes de la 1:00 p.m.', type: 'info' },
      { text: 'Llegadas tardías deben ser notificadas con anticipación.', type: 'info' },
      { text: 'Salidas anticipadas sin aviso previo pueden generar cargo.', type: 'restrict' },
      { text: 'La recepción atiende de 7:00 a.m. a 10:00 p.m.', type: 'info' },
      { text: 'Piscina disponible de 8:00 a.m. a 8:00 p.m.', type: 'allow' },
      { text: 'Zonas comunes hasta las 10:00 p.m.', type: 'allow' },
    ],
  },
  {
    id: 'silencio',
    icon: <Volume2 size={28} strokeWidth={1.5} />,
    title: 'Silencio & Convivencia',
    color: '#a68b5c',
    rules: [
      { text: 'Hora de silencio: 10:00 p.m. a 7:00 a.m.', type: 'info' },
      { text: 'Respetar la tranquilidad de los demás huéspedes.', type: 'allow' },
      { text: 'No se permite música de alto volumen después de las 10:00 p.m.', type: 'restrict' },
      { text: 'Las reuniones y celebraciones deben coordinarse previamente.', type: 'info' },
      { text: 'No se permiten peleas ni altercados en las instalaciones.', type: 'restrict' },
    ],
  },
  {
    id: 'piscina',
    icon: <Waves size={28} strokeWidth={1.5} />,
    title: 'Piscina & Zonas Húmedas',
    color: '#0284c7',
    rules: [
      { text: 'Uso de vestido de baño o ropa de baño obligatorio.', type: 'allow' },
      { text: 'Ducharse antes de ingresar a la piscina.', type: 'allow' },
      { text: 'Niños menores de 12 años deben estar acompañados de un adulto.', type: 'info' },
      { text: 'Prohibido ingresar con alimentos o bebidas alcohólicas a la zona de piscina.', type: 'restrict' },
      { text: 'No se permite correr en el área de la piscina.', type: 'restrict' },
      { text: 'No lanzarse con objetos que puedan dañar las instalaciones.', type: 'restrict' },
      { text: 'Los pañales de bebé no están permitidos en la piscina.', type: 'restrict' },
    ],
  },
  {
    id: 'bbq',
    icon: <Flame size={28} strokeWidth={1.5} />,
    title: 'Zona BBQ & Alimentación',
    color: '#ea580c',
    rules: [
      { text: 'El uso de las zonas BBQ está disponible para todos los huéspedes.', type: 'allow' },
      { text: 'Dejar limpia la zona BBQ después de su uso.', type: 'allow' },
      { text: 'No encender fogatas ni fuego en zonas no habilitadas.', type: 'restrict' },
      { text: 'El consumo de alimentos se permite en las zonas comunes habilitadas.', type: 'allow' },
      { text: 'Reservar la zona BBQ con recepción para uso exclusivo en eventos.', type: 'info' },
    ],
  },
  {
    id: 'mascotas',
    icon: <Dog size={28} strokeWidth={1.5} />,
    title: 'Mascotas',
    color: '#7c3aed',
    rules: [
      { text: 'Se permiten mascotas con cargo adicional. Informar al reservar.', type: 'allow' },
      { text: 'Mascotas con correa en todas las zonas comunes.', type: 'info' },
      { text: 'No se permiten mascotas en el restaurante ni en la piscina.', type: 'restrict' },
      { text: 'Vacunas y desparasitación al día obligatorio.', type: 'info' },
      { text: 'Los propietarios son responsables de los daños causados por sus mascotas.', type: 'info' },
      { text: 'Recoger los desechos de la mascota en toda la finca.', type: 'allow' },
    ],
  },
  {
    id: 'fumadores',
    icon: <Cigarette size={28} strokeWidth={1.5} />,
    title: 'Fumar & Sustancias',
    color: '#dc2626',
    rules: [
      { text: 'Prohibido fumar dentro de las habitaciones.', type: 'restrict' },
      { text: 'Prohibido fumar en las zonas de piscina y restaurante.', type: 'restrict' },
      { text: 'Existe un área designada para fumadores en la finca.', type: 'info' },
      { text: 'Está prohibido el consumo de drogas ilícitas en las instalaciones.', type: 'restrict' },
      { text: 'El consumo de alcohol está permitido en áreas comunes dentro de los horarios permitidos.', type: 'allow' },
    ],
  },
  {
    id: 'eventos',
    icon: <Music2 size={28} strokeWidth={1.5} />,
    title: 'Eventos & Celebraciones',
    color: '#0f3d2e',
    rules: [
      { text: 'Toda celebración o evento debe ser coordinado con anticipación.', type: 'info' },
      { text: 'Se permite música hasta las 10:00 p.m. en zonas habilitadas.', type: 'allow' },
      { text: 'Eventos con amplificación requieren autorización especial.', type: 'info' },
      { text: 'No se permite el ingreso de personas ajenas al hotel sin coordinación.', type: 'restrict' },
      { text: 'Los daños causados durante eventos son responsabilidad del contratante.', type: 'info' },
    ],
  },
  {
    id: 'general',
    icon: <Shield size={28} strokeWidth={1.5} />,
    title: 'Normas Generales',
    color: '#475569',
    rules: [
      { text: 'Tratar con respeto y cordialidad al personal del hotel.', type: 'allow' },
      { text: 'Cuidar las instalaciones y reportar cualquier daño de inmediato.', type: 'allow' },
      { text: 'Está prohibido recibir visitas sin autorización de recepción.', type: 'restrict' },
      { text: 'No sacar muebles, colchones o enseres de las habitaciones.', type: 'restrict' },
      { text: 'El parqueadero es exclusivo para huéspedes registrados.', type: 'info' },
      { text: 'El hotel no se responsabiliza por objetos de valor dejados sin custodia.', type: 'info' },
      { text: 'El incumplimiento de las normas puede resultar en el retiro del huésped sin reembolso.', type: 'restrict' },
    ],
  },
];

/* ─── COMPONENTE ─── */
export function RulesPage() {
  return (
    <div className="rules-page">
      {/* ── HERO ── */}
      <header
        className="rules-hero page-hero"
        style={{
          backgroundImage: `url(${media(
            '/media/29471/a-hotel-villavicencio-casa-baquero-15bb.jpg',
            1920,
            1080
          )})`,
        }}
      >
        <div className="container rules-hero__content">
          <motion.span
            className="rules-hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Información del hotel
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Reglas del Lugar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Para garantizar una estadía agradable para todos nuestros huéspedes,
            te pedimos leer y respetar las siguientes normas de convivencia de
            Finca Hotel Casa Baquero.
          </motion.p>
        </div>
        <div className="rules-hero__wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </header>

      {/* ── NOTICE BANNER ── */}
      <section className="rules-notice">
        <div className="container rules-notice__inner">
          <AlertTriangle size={20} />
          <p>
            El cumplimiento de estas normas garantiza la tranquilidad y bienestar
            de todos los huéspedes. El incumplimiento puede resultar en la
            cancelación de la estadía sin reembolso.
          </p>
        </div>
      </section>

      {/* ── LEGEND ── */}
      <section className="rules-legend">
        <div className="container rules-legend__inner">
          <div className="legend-item">
            <CheckCircle2 size={18} className="legend-icon legend-icon--allow" />
            <span>Permitido / Recomendado</span>
          </div>
          <div className="legend-item">
            <XCircle size={18} className="legend-icon legend-icon--restrict" />
            <span>Prohibido / No permitido</span>
          </div>
          <div className="legend-item">
            <AlertTriangle size={18} className="legend-icon legend-icon--info" />
            <span>Información importante</span>
          </div>
        </div>
      </section>

      {/* ── RULES GRID ── */}
      <section className="rules-grid-section">
        <div className="container">
          <motion.div
            className="rules-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
            }}
          >
            {RULE_SECTIONS.map((section, si) => (
              <motion.div
                key={section.id}
                className="rule-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: si * 0.06 }}
              >
                <div
                  className="rule-card__header"
                  style={{ '--rule-color': section.color } as React.CSSProperties}
                >
                  <div className="rule-card__icon">{section.icon}</div>
                  <h2 className="rule-card__title">{section.title}</h2>
                </div>
                <ul className="rule-card__list">
                  {section.rules.map((rule, ri) => (
                    <li key={ri} className={`rule-item rule-item--${rule.type}`}>
                      {rule.type === 'allow' && (
                        <CheckCircle2 size={16} className="rule-item__icon" />
                      )}
                      {rule.type === 'restrict' && (
                        <XCircle size={16} className="rule-item__icon" />
                      )}
                      {rule.type === 'info' && (
                        <AlertTriangle size={16} className="rule-item__icon" />
                      )}
                      <span>{rule.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HORARIOS CARDS (estilo Footer) ── */}
      <section className="rules-schedules">
        <div className="container rules-schedules__grid">
          {[
            { icon: <Clock size={32} strokeWidth={1.5} />, title: 'Check-in', value: 'Desde las 3:00 p.m.' },
            { icon: <Clock size={32} strokeWidth={1.5} />, title: 'Check-out', value: 'Antes de la 1:00 p.m.' },
            { icon: <Waves size={32} strokeWidth={1.5} />, title: 'Piscina', value: '8:00 a.m. – 8:00 p.m.' },
            { icon: <Volume2 size={32} strokeWidth={1.5} />, title: 'Silencio nocturno', value: 'Desde las 10:00 p.m.' },
          ].map((s) => (
            <div key={s.title} className="rules-schedule-card">
              <div className="rules-schedule-card__icon">{s.icon}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPLIT CTA ── */}
      <section className="rules-cta">
        <div
          className="rules-cta__image"
          style={{
            backgroundImage: `url(${media(
              HOME_GALLERY[1]?.src || '/media/23214/finca-hotel-casa-baquero-villavicencio-piscina-2.jpeg',
              900,
              700
            )})`,
          }}
        />
        <div className="rules-cta__content">
          <span className="rules-cta__eyebrow">¿Todo listo?</span>
          <h2 className="rules-cta__title">
            Conoces las reglas, ahora vive la experiencia
          </h2>
          <p className="rules-cta__desc">
            Cumpliendo estas normas garantizamos que cada huésped tenga una
            estadía perfecta. Reserva ahora y ven a disfrutar del Llano colombiano.
          </p>
          <div className="rules-cta__actions">
            <Link to="/reservar" className="btn btn--primary btn--lg">
              Reservar mi estadía
            </Link>
            <Link to="/faq" className="rules-cta__link">
              Ver preguntas frecuentes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
