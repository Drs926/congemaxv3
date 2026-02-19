import { ScreenTemplate } from './ScreenTemplate';

export function Resultats() {
  return (
    <ScreenTemplate
      title="Resultats"
      objective="Afficher le resultat deterministe et le commentaire IA readonly."
      sections={['daysDeducted', 'daysOffGenerated', 'efficiencyScore', 'Commentaire IA (lecture seule)']}
      access="Freemium"
    />
  );
}
