import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ROUTES, type RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.CalendrierPlanification>;

export function CalendrierPlanification({ navigation }: Props) {
  const [startDate, setStartDate] = useState('2026-03-10');
  const [endDate, setEndDate] = useState('2026-03-17');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendrier planification</Text>
      <Text style={styles.subtitle}>Preparez la plage qui sera ensuite simulee.</Text>

      <Text style={styles.label}>Date de debut (AAAA-MM-JJ)</Text>
      <TextInput value={startDate} onChangeText={setStartDate} style={styles.input} />

      <Text style={styles.label}>Date de fin (AAAA-MM-JJ)</Text>
      <TextInput value={endDate} onChangeText={setEndDate} style={styles.input} />

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>Apercu de plage</Text>
        <Text style={styles.previewBody}>
          Debut: {startDate} | Fin: {endDate}
        </Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() =>
          navigation.navigate(ROUTES.SimulationConfig)
        }
      >
        <Text style={styles.primaryButtonLabel}>Continuer vers simulation</Text>
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
  preview: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9dfeb',
    padding: 12,
    gap: 3,
  },
  previewTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2d41',
  },
  previewBody: {
    fontSize: 13,
    color: '#2f3d52',
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
});

