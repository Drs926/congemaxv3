const REQUIRED_EDGE_CASES = [
  'periode_traversant_mois',
  'periode_traversant_annee',
  'ferie_un_samedi_ouvre_vs_ouvrable',
  'solde_insuffisant',
  'arrondi_demi_journee',
  'rtt_cumulee',
  'override_entreprise_actif',
] as const;

describe('RuleEngine contract tests (PLAN 6)', () => {
  it('lists all mandatory edge cases from RULEENGINE_SPEC.md', () => {
    expect(REQUIRED_EDGE_CASES).toEqual([
      'periode_traversant_mois',
      'periode_traversant_annee',
      'ferie_un_samedi_ouvre_vs_ouvrable',
      'solde_insuffisant',
      'arrondi_demi_journee',
      'rtt_cumulee',
      'override_entreprise_actif',
    ]);
  });

  it.todo('periode_traversant_mois');
  it.todo('periode_traversant_annee');
  it.todo('ferie_un_samedi_ouvre_vs_ouvrable');
  it.todo('solde_insuffisant');
  it.todo('arrondi_demi_journee');
  it.todo('rtt_cumulee');
  it.todo('override_entreprise_actif');
});
