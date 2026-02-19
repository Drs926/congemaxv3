# DEVIATIONS.md

## DEV-001 - Expo Doctor incoherent
- Contexte:
  - `npx expo-doctor` signale `16/17 checks passed` avec echec sur "packages match versions required by installed Expo SDK".
  - En parallele, `npx expo install --check` retourne "Dependencies are up to date" et `Incorrect dependencies: []`.
- Preuves:
  - `docs/execution/proofs/proofpack/expo-doctor.log`
  - `docs/execution/proofs/proofpack/expo-install-check.log`
- Risque:
  - Faux negatif sur la qualite du build si `expo-doctor` est utilise comme gate binaire unique.
- Mitigation:
  - Gate technique temporaire: `npm test` PASS + `npx tsc --noEmit` PASS + `npx expo install --check` PASS.
- Condition de sortie:
  - `npx expo-doctor` repasse vert sans contradiction.
- Statut:
  - ACTIVE

## DEV-002 - Lint non contractuel non outille
- Contexte:
  - Aucun script `lint` n'existe dans `package.json`.
  - Ajouter ESLint complet impliquerait un lot outillage hors scope fonctionnel du hardening minimal.
- Preuves:
  - `docs/execution/proofs/proofpack/npm-run.log`
- Risque:
  - Absence de controle statique style/qualite par lint.
- Mitigation:
  - Typecheck strict (`npx tsc --noEmit`) + tests unitaires/contractuels obligatoires.
- Condition de sortie:
  - Ajout d'un pipeline lint dedie et valide par contrat.
- Statut:
  - ACTIVE
