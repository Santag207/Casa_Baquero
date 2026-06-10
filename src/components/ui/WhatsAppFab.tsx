import { MessageCircle } from 'lucide-react';
import { SITE } from '../../data/site';
import { useLanguage } from '../../context/LanguageContext';
import './WhatsAppFab.scss';

export function WhatsAppFab() {
  const { t } = useLanguage();
  const defaultMessage = 'Hola, encontré el número de WhatsApp de Finca Hotel Casa Baquero en su página web. Me gustaría recibir información.';
  const text = encodeURIComponent(defaultMessage);

  return (
    <a
      className="whatsapp-fab"
      href={`https://api.whatsapp.com/send?phone=${SITE.phones.whatsappDigits}&text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.footer.whatsappAria}
    >
      <MessageCircle size={28} />
    </a>
  );
}
