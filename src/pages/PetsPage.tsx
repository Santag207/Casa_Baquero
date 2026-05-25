import { Link } from 'react-router-dom';
import { ContentPage } from './ContentPage';
import { media } from '../data/media';

export function PetsPage() {
  return (
    <>
      <ContentPage
        config={{
          title: 'Mascotas Bienvenidas',
          subtitle: 'Trae a tu mejor amigo',
          heroImage: '/media/28781/image-banner-2-hotel-casa-baquero.png',
          cta: { label: 'Contactar', to: '/contacto' },
          sections: [
            {
              heading: 'Amigos de los animales',
              paragraphs: [
                'Entendemos que divertirse en las vacaciones junto con tu mejor amigo es fundamental; por eso en Finca Hotel Casa Baquero las mascotas son un huésped más.',
                'Vive la mejor experiencia con tu mejor amigo peludo.',
              ],
            },
            {
              heading: 'Política de mascotas',
              paragraphs: [
                'Consulta nuestras políticas antes de viajar. Las mascotas deben estar bajo supervisión en áreas comunes y se requiere coordinación previa para habitaciones.',
                'Para detalles específicos (tamaño, número, zonas permitidas), escríbenos por WhatsApp o el formulario de contacto.',
              ],
            },
          ],
          gallery: [
            { src: '/media/46438/hotel-villavicencio-finca-casa-baquero-aeropuerto-restrepo-meta-piscina.jpg', alt: 'Zonas verdes pet friendly' },
          ],
        }}
      />
      <section className="full-bleed" style={{ background: '#faf6f0', padding: '2rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge--pet">🐾 Somos Pet Friendly</span>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/reservar" className="btn btn--primary">
              Reservar con mascota
            </Link>
          </p>
          <img
            src={media('/media/28781/image-banner-2-hotel-casa-baquero.png', 200)}
            alt=""
            style={{ margin: '2rem auto', maxWidth: 180 }}
          />
        </div>
      </section>
    </>
  );
}
