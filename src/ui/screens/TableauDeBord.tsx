import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { settingsStore, type ProfileSettings } from '../../infrastructure/storage/settingsStore';
import { ROUTES, type RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.TableauDeBord>;

export function TableauDeBord({ navigation }: Props) {
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [conventionActiveId, setConventionActiveId] = useState<string>('Non definie');

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const load = async (): Promise<void> => {
        const settings = await settingsStore.getSettings();
        if (!mounted) {
          return;
        }
        setProfile(settings.profile);
        setConventionActiveId(settings.conventionActiveId ?? 'Non definie');
      };
      void load();

      return () => {
        mounted = false;
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableau de bord</Text>
      <Text style={styles.subtitle}>Vue synthese de votre situation actuelle.</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Conges restants</Text>
        <Text style={styles.cardValue}>{profile?.leaveRemaining ?? 0} jours</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>RTT restants</Text>
        <Text style={styles.cardValue}>{profile?.rttRemaining ?? 0} jours</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Convention active</Text>
        <Text style={styles.cardValueSmall}>{conventionActiveId}</Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate(ROUTES.CalendrierPlanification)}
      >
        <Text style={styles.primaryButtonLabel}>Ouvrir calendrier planification</Text>
      </Pressable>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate(ROUTES.SimulationConfig)}
      >
        <Text style={styles.primaryButtonLabel}>Configurer une simulation</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate(ROUTES.Parametres)}
      >
        <Text style={styles.secondaryButtonLabel}>Parametres</Text>
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
    padding: 14,
    gap: 2,
  },
  cardLabel: {
    fontSize: 13,
    color: '#4b5b72',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 22,
    color: '#152942',
    fontWeight: '700',
  },
  cardValueSmall: {
    fontSize: 14,
    color: '#152942',
    fontWeight: '600',
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
  secondaryButton: {
    marginTop: 4,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9dfeb',
  },
  secondaryButtonLabel: {
    color: '#233149',
    fontWeight: '700',
    fontSize: 14,
  },
});

