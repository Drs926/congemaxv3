import { StyleSheet, Text, View } from 'react-native';

type ScreenTemplateProps = {
  title: string;
  objective: string;
  sections: string[];
  access: 'Freemium' | 'Premium';
};

export function ScreenTemplate({ title, objective, sections, access }: ScreenTemplateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.objective}>{objective}</Text>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Sections (layout uniquement)</Text>
        {sections.map((section) => (
          <Text key={section} style={styles.row}>
            - {section}
          </Text>
        ))}
      </View>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Acces</Text>
        <Text style={styles.row}>{access}</Text>
      </View>
      <Text style={styles.note}>Aucune logique metier ici. A completer.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#121827',
  },
  objective: {
    fontSize: 15,
    color: '#2b3343',
  },
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e8ef',
    gap: 8,
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e2a3b',
  },
  row: {
    fontSize: 14,
    color: '#2f3d52',
  },
  note: {
    fontSize: 13,
    color: '#58657a',
    marginTop: 6,
  },
});
