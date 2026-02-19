import { ScreenTemplate } from './ScreenTemplate';

export function TableauDeBord() {
  return (
    <ScreenTemplate
      title="TableauDeBord"
      objective="Afficher une vue synthese des soldes et des acces principaux."
      sections={['Soldes conges/RTT', 'Convention active', 'Acces planification/simulation/resultats/parametres']}
      access="Freemium"
    />
  );
}
