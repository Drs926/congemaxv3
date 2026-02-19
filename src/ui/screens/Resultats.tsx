import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { readSimulationUseCase } from '../../application/runtimeServices';
import type { LeaveSimulation } from '../../domain/types';
import { ROUTES, type RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.Resultats>;

export function Resultats({ navigation, route }: Props) {
  const [simulation, setSimulation] = useState<LeaveSimulation | null>(null);
  const [message, setMessage] = useState<string>('Chargement du resultat...');

  useEffect(() => {
    let mounted = true;

    const load = async (): Promise<void> => {
      const simulationId = route.params?.simulationId;
      if (!simulationId) {
        setMessage('Aucun resultat disponible. Lancez une simulation.');
        return;
      }

      const saved = await readSimulationUseCase(simulationId);
      if (!mounted) {
        return;
      }

      if (!saved) {
        setMessage('Simulation introuvable dans le stockage local.');
        return;
      }

      setSimulation(saved);
      setMessage('');
    };

    void load();
    return () => {
      mounted = false;
    };
  }, [route.params?.simulationId]);

  const result = simulation?.outputSnapshot;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultats</Text>
      <Text style={styles.subtitle}>Sortie du moteur deterministe.</Text>

      {result ? (
        <>
          <View style={styles.card}>
            <Text style={styles.label}>Jours deduits</Text>
            <Text style={styles.value}>{result.daysDeducted}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Jours de repos generes</Text>
            <Text style={styles.value}>{result.daysOffGenerated}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Score d&apos;efficacite</Text>
            <Text style={styles.value}>{result.efficiencyScore}%</Text>
          </View>
          <View style={styles.commentBox}>
            <Text style={styles.commentTitle}>Commentaire IA (lecture seule)</Text>
            <Text style={styles.commentBody}>
              Cette simulation respecte les regles appliquees. Ajustez vos dates si vous souhaitez
              comparer plusieurs scenarios.
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.message}>{message}</Text>
      )}

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: ROUTES.TableauDeBord }] })}
      >
        <Text style={styles.primaryButtonLabel}>Retour au tableau de bord</Text>
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9dfeb',
    padding: 12,
    gap: 2,
  },
  label: {
    fontSize: 13,
    color: '#4b5b72',
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#152942',
  },
  commentBox: {
    backgroundColor: '#eef4ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c9dafb',
    padding: 12,
    gap: 4,
  },
  commentTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1347a8',
  },
  commentBody: {
    fontSize: 13,
    color: '#20314b',
  },
  message: {
    fontSize: 14,
    color: '#2f3d52',
    marginTop: 8,
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

