import { getNextRouteFromState } from '../src/ui/navigation/splashRouting';
import { ROUTES } from '../src/ui/navigation/routes';

test('Splash route vers OnboardingProfil si onboarding incomplet', () => {
  const nextRoute = getNextRouteFromState({
    integrityOk: true,
    onboardingComplete: false,
  });

  expect(nextRoute).toBe(ROUTES.OnboardingProfil);
});
