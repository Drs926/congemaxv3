import { StatusBar } from 'expo-status-bar';

import { Splash } from './src/ui/screens/Splash';

export default function App() {
  return (
    <>
      <Splash />
      <StatusBar style="auto" />
    </>
  );
}
