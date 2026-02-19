import { ScreenTemplate } from './ScreenTemplate';

export function CalendrierPlanification() {
  return (
    <ScreenTemplate
      title="Calendrier_Planification"
      objective="Saisir une plage de dates candidate."
      sections={['Date de debut', 'Date de fin', 'Enregistrement de plage']}
      access="Freemium"
    />
  );
}
