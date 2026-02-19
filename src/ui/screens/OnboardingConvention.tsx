import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { frozenRulePack, frozenRulePackId } from '../../application/runtimeDefaults';
import { settingsStore } from '../../infrastructure/storage/settingsStore';
import { ROUTES, type RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.OnboardingConvention>;

export function OnboardingConvention({ navigation }: Props) {
  const onActivateConvention = async (): Promise<void> => {
    await settingsStore.setConventionActiveId(frozenRulePackId);
    await settingsStore.setOnboardingComplete(true);
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.TableauDeBord }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding convention</Text>
      <Text style={styles.subtitle}>Une convention active est requise pour demarrer.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{frozenRulePack.conventionName}</Text>
        <Text style={styles.cardMeta}>IDCC {frozenRulePack.idcc}</Text>
        <Text style={styles.cardMeta}>RulePack {frozenRulePack.rulePackId}</Text>
        <Text style={styles.cardMeta}>Version {frozenRulePack.versionTag}</Text>
      </View>

      <View style={styles.warning}>
        <Text style={styles.warningTitle}>Avertissement</Text>
        <Text style={styles.warningBody}>
          Changer de convention reinitialise les scenarios et resultats sauvegardes.
        </Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => void onActivateConvention()}>
        <Text style={styles.primaryButtonLabel}>Activer et terminer l&apos;onboarding</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    padding: 20,
    gap: 14,
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
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9dfeb',
    padding: 14,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d2a3d',
  },
  cardMeta: {
    fontSize: 13,
    color: '#2f3d52',
  },
  warning: {
    backgroundColor: '#fff4e5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffd9a8',
    padding: 12,
    gap: 4,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8f4f00',
  },
  warningBody: {
    fontSize: 13,
    color: '#7a4a0e',
  },
  primaryButton: {
    marginTop: 6,
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

