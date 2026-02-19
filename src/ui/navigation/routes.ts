export const ROUTES = {
  Splash: 'Splash',
  OnboardingProfil: 'OnboardingProfil',
  OnboardingConvention: 'OnboardingConvention',
  TableauDeBord: 'TableauDeBord',
  CalendrierPlanification: 'CalendrierPlanification',
  SimulationConfig: 'SimulationConfig',
  Resultats: 'Resultats',
  Parametres: 'Parametres',
} as const;

export type RootStackParamList = {
  Splash: undefined;
  OnboardingProfil: undefined;
  OnboardingConvention: undefined;
  TableauDeBord: undefined;
  CalendrierPlanification: undefined;
  SimulationConfig: undefined;
  Resultats: { simulationId?: string } | undefined;
  Parametres: undefined;
};
