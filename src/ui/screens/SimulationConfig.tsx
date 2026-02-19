import { ScreenTemplate } from '../components/ScreenTemplate';

export function SimulationConfig() {
  return (
    <ScreenTemplate
      title="Simulation_Config"
      objective="Configurer un scenario et lancer le calcul deterministe."
      sections={['Option inclure RTT', 'Notes scenario', 'Lancer simulation']}
      access="Freemium"
    />
  );
}

