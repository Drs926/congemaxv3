import { StyleSheet, Text, View } from 'react-native';

export function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash</Text>
      <Text style={styles.subtitle}>Chargement de votre espace conges...</Text>
      <Text style={styles.hint}>A completer</Text>
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
  hint: {
    fontSize: 14,
    color: '#58657a',
  },
});
