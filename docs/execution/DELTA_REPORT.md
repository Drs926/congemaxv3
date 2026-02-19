# DELTA_REPORT.md

Date: 2026-02-19
Lot: PLAN-HARDEN-001

## Delta ferme par le lot
1. `npm test` robuste
- Avant: echec intermittent `spawn EPERM` (workers jest).
- Apres: script canonique `jest --runInBand` dans `package.json`.

2. Lien runtime RulePack gele
- Ajout verification SHA256 au demarrage (`App.tsx` via UseCase d'integrite).
- Test d'integrite ajoute et PASS.

3. Premium gate clarifie
- Gate technique conservee cote UseCase.
- Clarification explicite ajoutee dans `docs/execution/SPEC.md`.

## Delta restant (non bloquant avec deviation ACTIVE)
1. `expo-doctor` incoherent
- `expo install --check` PASS mais `expo-doctor` FAIL 16/17.
- Couvert par DEV-001.

2. `lint` absent
- Aucun script lint contractuel outille.
- Couvert par DEV-002.

## Action unique recommandee
- Ouvrir un lot outillage dedie pour sortir DEV-001/DEV-002:
  - fiabiliser le gate `expo-doctor`
  - introduire un pipeline lint officiel

Verdict delta: **PASS AVEC DEVIATIONS ACTIVES (DEV-001, DEV-002)**.
