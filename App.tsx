import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { verifyRulepackIntegrityUseCase } from './src/application/verifyRulepackIntegrityUseCase';
import { Splash } from './src/ui/screens/Splash';

export default function App() {
  const [integrityStatus, setIntegrityStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const [integrityMessage, setIntegrityMessage] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    const verify = async (): Promise<void> => {
      try {
        const result = await verifyRulepackIntegrityUseCase();
        if (!mounted) {
          return;
        }

        if (result.ok) {
          setIntegrityStatus('ok');
          return;
        }

        setIntegrityStatus('error');
        setIntegrityMessage(
          `Integrite RulePack invalide. attendu=${result.expected} actuel=${result.actual}`,
        );
      } catch (error) {
        if (!mounted) {
          return;
        }
        setIntegrityStatus('error');
        setIntegrityMessage(`Verification RulePack impossible: ${String(error)}`);
      }
    };

    void verify();

    return () => {
      mounted = false;
    };
  }, []);

  if (integrityStatus === 'error') {
    return (
      <>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Erreur integrite RulePack</Text>
          <Text style={styles.errorBody}>{integrityMessage}</Text>
        </View>
        <StatusBar style="auto" />
      </>
    );
  }

  if (integrityStatus === 'checking') {
    return (
      <>
        <View style={styles.checkContainer}>
          <Text style={styles.checkText}>Verification du RulePack gele...</Text>
        </View>
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      <Splash />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  checkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f6f7fb',
  },
  checkText: {
    fontSize: 16,
    color: '#2b3343',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff6f6',
    gap: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#a31b1b',
    textAlign: 'center',
  },
  errorBody: {
    fontSize: 14,
    color: '#5a1a1a',
    textAlign: 'center',
  },
});
