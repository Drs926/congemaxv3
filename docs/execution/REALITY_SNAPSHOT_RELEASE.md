# REALITY_SNAPSHOT_RELEASE.md

Date: 2026-02-19
Release lot: V3-001

## Identite release
- Commit HEAD: a51989cee076698fb670c0aca91608a9344b333b
- Tag de gel: congemaxv3-proofpass-20260219 (a creer)
- Branche: master

## Statut Proof Pack
- Statut binaire: PASS (avec deviations actives)
- Deviations actives: DEV-001, DEV-002
- Source de verite: `docs/execution/PROOF_PACK_SUMMARY.md`

## Commandes canoniques
- Tests: `npm test` (script canonique = `jest --runInBand`)
- Typecheck: `npx tsc --noEmit`
- Validation dependances Expo: `npx expo install --check`
- Diagnostic Expo: `npx expo-doctor` (deviation DEV-001 active)
- Lint: `npm run lint` (deviation DEV-002 active)

## Emplacement des logs proofpack
- `docs/execution/proofs/proofpack/npm-test.log`
- `docs/execution/proofs/proofpack/tsc-noemit.log`
- `docs/execution/proofs/proofpack/expo-install-check.log`
- `docs/execution/proofs/proofpack/expo-doctor.log`
- `docs/execution/proofs/proofpack/npm-run-lint.log`
- `docs/execution/proofs/proofpack/npm-run.log`
- `docs/execution/proofs/proofpack/command-results.txt`

## Regles de conformite
- IA: commentaire UI uniquement (aucun appel IA dans moteur/usecases de calcul)
- Integrite RulePack gele: PASS (`__tests__/rulepack.freeze.integrity.test.ts`)

## References
- Deviations: `docs/governance/DEVIATIONS.md`
- Checklist validation: `docs/contracts/VALIDATION_CHECKLIST.md`
- Snapshot runtime: `docs/execution/REALITY_SNAPSHOT.md`
- Delta: `docs/execution/DELTA_REPORT.md`
