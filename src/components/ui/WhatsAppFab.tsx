import { MessageCircle } from 'lucide-react';
import { SITE } from '../../data/site';
import './WhatsAppFab.scss';

export function WhatsAppFab() {
  const text = encodeURIComponent(
    'Hola, encontré el número de WhatsApp de Finca Hotel Casa Baquero en su página web. Me gustaría recibir información.',
  );

  return (
    <a
      className="whatsapp-fab"
      href={`https://api.whatsapp.com/send?phone=${SITE.phones.whatsappDigits}&text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chatear por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
