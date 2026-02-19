import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { defaultCompanySettings, defaultUserSettings, frozenRulePack } from '../../application/runtimeDefaults';
import { persistSimulationUseCase } from '../../application/runtimeServices';
import { simulateLeaveUseCase } from '../../application/simulateLeaveUseCase';
import { ROUTES, type RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.SimulationConfig>;

const isDateOnly = (value: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(value);

export function SimulationConfig({ navigation }: Props) {
  const [startDate, setStartDate] = useState('2026-03-10');
  const [endDate, setEndDate] = useState('2026-03-17');
  const [includeRtt, setIncludeRtt] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const onRunSimulation = async (): Promise<void> => {
    if (!isDateOnly(startDate) || !isDateOnly(endDate)) {
      setStatusMessage('Format attendu: AAAA-MM-JJ');
      return;
    }

    const input = {
      startDate,
      endDate,
      rulePack: frozenRulePack,
      companySettings: defaultCompanySettings,
      userSettings: defaultUserSettings,
    };

    try {
      const output = simulateLeaveUseCase(input);
      const simulationId = `sim-${Date.now()}`;
      await persistSimulationUseCase({
        id: simulationId,
        ...input,
      });
      setStatusMessage(
        `Simulation calculee: ${output.daysDeducted} jours deduits, ${output.daysOffGenerated} jours off.`,
      );
      navigation.navigate(ROUTES.Resultats, { simulationId });
    } catch (error) {
      setStatusMessage(`Erreur simulation: ${String(error)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuration simulation</Text>
      <Text style={styles.subtitle}>Le calcul reste 100% deterministe.</Text>

      <Text style={styles.label}>Date de debut (AAAA-MM-JJ)</Text>
      <TextInput value={startDate} onChangeText={setStartDate} style={styles.input} />

      <Text style={styles.label}>Date de fin (AAAA-MM-JJ)</Text>
      <TextInput value={endDate} onChangeText={setEndDate} style={styles.input} />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Inclure RTT (UI)</Text>
        <Switch value={includeRtt} onValueChange={setIncludeRtt} />
      </View>

      <Text style={styles.meta}>Option RTT selectionnee: {includeRtt ? 'Oui' : 'Non'}</Text>

      <Pressable style={styles.primaryButton} onPress={() => void onRunSimulation()}>
        <Text style={styles.primaryButtonLabel}>Lancer la simulation</Text>
      </Pressable>

      {statusMessage ? <Text style={styles.status}>{statusMessage}</Text> : null}
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
    marginBottom: 8,
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
  switchRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9dfeb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  meta: {
    fontSize: 12,
    color: '#56647a',
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: '#1457d9',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  status: {
    marginTop: 6,
    fontSize: 13,
    color: '#2f3d52',
  },
});

