import { ROUTES } from './routes';

export interface SplashRoutingState {
  integrityOk: boolean;
  onboardingComplete: boolean;
}

export const getNextRouteFromState = ({
  integrityOk,
  onboardingComplete,
}: SplashRoutingState): typeof ROUTES.OnboardingProfil | typeof ROUTES.TableauDeBord => {
  if (!integrityOk || !onboardingComplete) {
    return ROUTES.OnboardingProfil;
  }

  return ROUTES.TableauDeBord;
};
