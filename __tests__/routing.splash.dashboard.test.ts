import { getNextRouteFromState } from '../src/ui/navigation/splashRouting';
import { ROUTES } from '../src/ui/navigation/routes';

test('Splash route vers TableauDeBord si onboarding termine', () => {
  const nextRoute = getNextRouteFromState({
    integrityOk: true,
    onboardingComplete: true,
  });

  expect(nextRoute).toBe(ROUTES.TableauDeBord);
});
