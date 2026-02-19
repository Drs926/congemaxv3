import { ScreenTemplate } from './ScreenTemplate';

export function OnboardingConvention() {
  return (
    <ScreenTemplate
      title="Onboarding_Convention"
      objective="Selectionner et activer une convention unique."
      sections={['Liste des conventions', 'Convention active', 'Avertissement reset scenarios/resultats']}
      access="Freemium"
    />
  );
}
