import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { optimizeAnnualPremiumUseCase } from '../../application/optimizeAnnualPremiumUseCase';
import { defaultCompanySettings, defaultUserSettings, frozenRulePack } from '../../application/runtimeDefaults';
import { settingsStore } from '../../infrastructure/storage/settingsStore';

export function Parametres() {
  const [premiumEnabled, setPremiumEnabled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const load = async (): Promise<void> => {
        const settings = await settingsStore.getSettings();
        if (mounted) {
          setPremiumEnabled(settings.premiumEnabled);
        }
      };
      void load();
      return () => {
        mounted = false;
      };
    }, []),
  );

  const onTogglePremium = async (value: boolean): Promise<void> => {
    setPremiumEnabled(value);
    await settingsStore.setPremiumEnabled(value);
  };

  const onRunOptimization = (): void => {
    try {
      const output = optimizeAnnualPremiumUseCase({
        year: 2026,
        periodLengthDays: 5,
        premiumEnabled,
        rulePack: frozenRulePack,
        companySettings: defaultCompanySettings,
        userSettings: defaultUserSettings,
        topN: 1,
      });
      const best = output.candidates[0];
      if (!best) {
        setMessage('Aucun resultat d optimisation disponible.');
        return;
      }
      setMessage(
        `Meilleure plage ${best.startDate} au ${best.endDate} (rendement ${best.rendement}%).`,
      );
    } catch (error) {
      if (error instanceof Error && error.message === 'premium_required') {
        setMessage('Fonction premium indisponible. Activez Premium dans les parametres.');
        return;
      }
      setMessage(`Erreur optimisation: ${String(error)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parametres</Text>
      <Text style={styles.subtitle}>Configuration locale de votre application.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statut Premium</Text>
        <View style={styles.switchRow}>
          <Text style={styles.cardValue}>{premiumEnabled ? 'Active' : 'Desactive'}</Text>
          <Switch value={premiumEnabled} onValueChange={(value) => void onTogglePremium(value)} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Decouvrir Premium</Text>
        <Text style={styles.cardBody}>
          Premium debloque l optimisation annuelle et les suggestions avancees.
        </Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={onRunOptimization}>
        <Text style={styles.primaryButtonLabel}>Tester optimisation annuelle</Text>
      </Pressable>

      {message ? <Text style={styles.message}>{message}</Text> : null}
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
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2d41',
  },
  cardValue: {
    fontSize: 14,
    color: '#2f3d52',
    fontWeight: '600',
  },
  cardBody: {
    fontSize: 13,
    color: '#2f3d52',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  message: {
    fontSize: 13,
    color: '#2f3d52',
    marginTop: 6,
  },
});

