import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES, type RootStackParamList } from './routes';
import {
  CalendrierPlanification,
  OnboardingConvention,
  OnboardingProfil,
  Parametres,
  Resultats,
  SimulationConfig,
  Splash,
  TableauDeBord,
} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.Splash} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.Splash} component={Splash} />
        <Stack.Screen name={ROUTES.OnboardingProfil} component={OnboardingProfil} />
        <Stack.Screen name={ROUTES.OnboardingConvention} component={OnboardingConvention} />
        <Stack.Screen name={ROUTES.TableauDeBord} component={TableauDeBord} />
        <Stack.Screen
          name={ROUTES.CalendrierPlanification}
          component={CalendrierPlanification}
        />
        <Stack.Screen name={ROUTES.SimulationConfig} component={SimulationConfig} />
        <Stack.Screen name={ROUTES.Resultats} component={Resultats} />
        <Stack.Screen name={ROUTES.Parametres} component={Parametres} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
