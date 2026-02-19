import { ScreenTemplate } from '../components/ScreenTemplate';

export function Parametres() {
  return (
    <ScreenTemplate
      title="Parametres"
      objective="Centraliser les reglages, le statut premium et la convention active."
      sections={['Profil local', 'Statut Premium', 'Changer convention active', 'Decouvrir Premium']}
      access="Freemium"
    />
  );
}

