import { ScreenTemplate } from '../components/ScreenTemplate';

export function OnboardingProfil() {
  return (
    <ScreenTemplate
      title="Onboarding_Profil"
      objective="Collecter les informations minimales du profil local."
      sections={['Timezone', 'Locale fr-FR', 'Semaine commence lundi']}
      access="Freemium"
    />
  );
}

