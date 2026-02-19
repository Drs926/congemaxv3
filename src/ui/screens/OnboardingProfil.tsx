import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { settingsStore } from '../../infrastructure/storage/settingsStore';
import { ROUTES, type RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.OnboardingProfil>;

export function OnboardingProfil({ navigation }: Props) {
  const [leaveRemaining, setLeaveRemaining] = useState<string>('25');
  const [rttRemaining, setRttRemaining] = useState<string>('0');
  const [timezone, setTimezone] = useState<string>('Europe/Paris');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onNext = async (): Promise<void> => {
    const leave = Number(leaveRemaining);
    const rtt = Number(rttRemaining);
    if (Number.isNaN(leave) || Number.isNaN(rtt) || leave < 0 || rtt < 0) {
      setErrorMessage('Saisissez des valeurs numeriques positives pour les soldes.');
      return;
    }

    await settingsStore.setProfile({
      leaveRemaining: leave,
      rttRemaining: rtt,
      timezone: timezone.trim() || 'Europe/Paris',
    });
    navigation.navigate(ROUTES.OnboardingConvention);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding profil</Text>
      <Text style={styles.subtitle}>Renseignez vos soldes de conges pour continuer.</Text>

      <Text style={styles.label}>Solde conges (jours)</Text>
      <TextInput
        value={leaveRemaining}
        onChangeText={setLeaveRemaining}
        keyboardType="decimal-pad"
        style={styles.input}
        placeholder="Ex: 25"
      />

      <Text style={styles.label}>Solde RTT (jours)</Text>
      <TextInput
        value={rttRemaining}
        onChangeText={setRttRemaining}
        keyboardType="decimal-pad"
        style={styles.input}
        placeholder="Ex: 8"
      />

      <Text style={styles.label}>Fuseau horaire (optionnel)</Text>
      <TextInput
        value={timezone}
        onChangeText={setTimezone}
        style={styles.input}
        placeholder="Europe/Paris"
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable style={styles.primaryButton} onPress={() => void onNext()}>
        <Text style={styles.primaryButtonLabel}>Continuer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#121827',
    marginTop: 18,
  },
  subtitle: {
    fontSize: 15,
    color: '#2f3d52',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2d41',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9dfeb',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  error: {
    color: '#a31b1b',
    fontSize: 13,
    marginTop: 6,
  },
  primaryButton: {
    marginTop: 14,
    backgroundColor: '#1457d9',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});

