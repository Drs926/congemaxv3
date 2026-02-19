# PLAN Execution - CongéMax V3

## ETAT ACTUEL (prouve)
- HEAD actuel: `3cac942 chore(proof): product proof pack + web export deps [RELEASE:V3-002]`
- Tag present: `congemaxv3-proofpass-20260219`
- Tag present: `congemaxv3-productproof-20260219`
- Deviations actives:
  - DEV-001 (expo-doctor incoherent) -> `docs/governance/DEVIATIONS.md`
  - DEV-002 (lint absent) -> `docs/governance/DEVIATIONS.md`
- Baseline prouvee:
  - Hardening proof pack et integrite RulePack gele (commit `a51989c`)
  - Snapshot release + tag proofpass (commit `a993603`, tag `congemaxv3-proofpass-20260219`)
  - Product proof pack + export web (commit `3cac942`, tag `congemaxv3-productproof-20260219`)

## Gate bloquant
### USABLE_FLOW
Definition:
- Le flux utilisateur minimum est testable de bout en bout depuis l'application lancee (pas seulement ecrans statiques).

Critere PASS:
- L'app ne reste pas bloquee sur Splash.
- Onboarding (profil + convention) est atteignable et validable.
- Une simulation peut etre lancee depuis l'UI et affiche un resultat deterministe.
- La tentative optimisation en non-premium remonte `premium_required` (preuve UI/log).
- Les 8 ecrans contractuels V3 sont atteignables via un flux utilisable (pas necessairement final UX).

Critere BLOCK:
- Un des points PASS ci-dessus non prouvable.

## Roadmap minimale vers gel usable

### LOT-A - VERIFY_BASELINE (PROOF ONLY)
But:
- Re-prouver la baseline et etablir explicitement BLOCK USABLE_FLOW si `App.tsx` rend Splash seul.

Fichiers touches autorises:
- `docs/execution/**`
- `docs/contracts/**` (checklists uniquement)
- `docs/governance/**`

Commandes de preuves:
- `git checkout congemaxv3-productproof-20260219`
- `cat App.tsx`
- `npm test`
- `npx tsc --noEmit`
- `npx expo export --platform web --clear`
- scans IA sur `src/**` (absence SDK IA de calcul)

PASS:
- Baseline compile/test/export confirmee et statut USABLE_FLOW documente (PASS ou BLOCK).

BLOCK:
- Preuve baseline manquante ou contradictoire.

Commit message attendu:
- `docs(proof): verify baseline and usable-flow gate [APP:V3-BASELINE]`

Tag attendu:
- Aucun.

### LOT-B - FINISH_USABLE_FLOW (ACTION)
But:
- Sortie Splash + navigation minimale + onboarding persiste + wiring usecases UI pour rendre le flux usable.

Fichiers touches autorises:
- `App.tsx`
- `src/ui/**`
- `docs/execution/**`
- `docs/contracts/**`

Interdits:
- Modifier `src/domain/**`, `src/application/**`, `src/infrastructure/sqlite/**` sauf bug bloquant prouve.

Commandes de preuves:
- `npm test`
- `npx tsc --noEmit`
- `npx expo export --platform web --clear`
- preuve que `App.tsx` rend un flux navigable (pas Splash unique)
- preuve que 8 ecrans contractuels sont atteignables
- preuve `premium_required` sur tentative optimisation non premium

PASS:
- Gate USABLE_FLOW = PASS.

BLOCK:
- Gate USABLE_FLOW = BLOCK.

Commit message attendu:
- `feat(app): wire usable flow (navigation+onboarding+wiring) [APP:V3-USABLE]`

Tag attendu:
- Aucun.

### LOT-C - FINAL_PROOF_AND_GEL (ACTION)
But:
- Finaliser preuves E2E + resume final + gel usable.

Fichiers touches autorises:
- `docs/execution/**`
- `docs/contracts/**`
- `docs/governance/**`

Commandes de preuves:
- `npm test`
- `npx tsc --noEmit`
- `npx expo export --platform web --clear`
- protocole E2E complet + preuves collectees
- verification coherence deviations actives

PASS:
- Proof final complet + repo clean + tag de gel usable cree.

BLOCK:
- Proof final incomplet ou repo non clean.

Commit message attendu:
- `chore(release): final proof and usable gel [RELEASE:V3-USABLE]`

Tag attendu:
- `congemaxv3-usable-20260219`
