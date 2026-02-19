import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { verifyRulepackIntegrityUseCase } from '../../application/verifyRulepackIntegrityUseCase';
import { settingsStore } from '../../infrastructure/storage/settingsStore';
import { getNextRouteFromState } from '../navigation/splashRouting';
import { ROUTES, type RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.Splash>;

export function Splash({ navigation }: Props) {
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  const runRouting = useCallback(async (): Promise<void> => {
    setStatus('loading');
    setMessage('');

    try {
      const integrity = await verifyRulepackIntegrityUseCase();
      if (!integrity.ok) {
        setStatus('error');
        setMessage('Integrite du RulePack invalide. Veuillez recommencer.');
        return;
      }

      const settings = await settingsStore.getSettings();
      const nextRoute = getNextRouteFromState({
        integrityOk: true,
        onboardingComplete: settings.onboardingComplete === true,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: nextRoute }],
      });
    } catch (error) {
      setStatus('error');
      setMessage(`Verification impossible: ${String(error)}`);
    }
  }, [navigation]);

  useEffect(() => {
    void runRouting();
  }, [runRouting]);

  if (status === 'error') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erreur de demarrage</Text>
        <Text style={styles.subtitle}>{message}</Text>
        <Pressable style={styles.primaryButton} onPress={() => void runRouting()}>
          <Text style={styles.primaryButtonLabel}>Recommencer</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash</Text>
      <Text style={styles.subtitle}>Chargement de votre espace conges...</Text>
      <ActivityIndicator size="small" color="#1457d9" />
      <Text style={styles.hint}>Verification en cours</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f6f7fb',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    color: '#121827',
  },
  subtitle: {
    fontSize: 16,
    color: '#2b3343',
    textAlign: 'center',
    marginBottom: 14,
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#1457d9',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  primaryButtonLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  hint: {
    fontSize: 14,
    color: '#58657a',
    marginTop: 10,
  },
});
