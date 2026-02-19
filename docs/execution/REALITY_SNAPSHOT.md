# REALITY_SNAPSHOT.md

Date: 2026-02-19
Repo: `C:\Users\Harib\CascadeProjects\congemaxv3`

## Pre-flight
- `git rev-parse --show-toplevel` => `C:/Users/Harib/CascadeProjects/congemaxv3`
- `git status --short` => clean au lancement du lot HARDEN-001
- `git branch --show-current` => `master`
- `git log -1 --oneline` => `12d1d2e feat: complete PLAN tasks 9-12 (UI v3, sqlite, premium optimization, proofs) [PLAN:9-12]`

## Versions
- `node -v` => `v22.15.0`
- `npm -v` => `10.9.2`

## Commande canonique de test
- `npm test` utilise maintenant `jest --runInBand` (robuste, sans erreur EPERM workers).

## Integrite RulePack gele (runtime)
- Module ajoute: `src/domain/rulepackFreeze.ts`
- UseCase ajoute: `src/application/verifyRulepackIntegrityUseCase.ts`
- Point d'appel au demarrage: `App.tsx`
  - etat `checking` -> verification
  - mismatch -> ecran d'erreur d'integrite
- Test contractuel: `__tests__/rulepack.freeze.integrity.test.ts`

## Scan IA (preuve)
- `rg -n "openai|chatgpt|gpt-|langchain|anthropic|gemini|vertex" src` => aucun match
- `rg -n "Commentaire IA|commentaire IA|readonly|lecture seule" src/ui src/application src/domain`
  - match UI uniquement: `src/ui/screens/Resultats.tsx`

Conclusion:
- Aucune IA detectee dans Domain/Application de calcul.
- IA limitee au texte de commentaire UI (lecture seule).

## Premium gate
- Gate appliquee dans `src/application/optimizeAnnualPremiumUseCase.ts`:
  - `premiumEnabled`
  - `throw new Error('premium_required')` si false
- Clarification documentaire: `docs/execution/SPEC.md` (gate UseCase-only, pas de gate navigation non contractee)

## Proof Pack (logs complets)
Repertoire: `docs/execution/proofs/proofpack/`

- `npm test` => PASS
  - log: `docs/execution/proofs/proofpack/npm-test.log`
- `npx tsc --noEmit` => PASS
  - log: `docs/execution/proofs/proofpack/tsc-noemit.log`
- `npx expo install --check` => PASS
  - log: `docs/execution/proofs/proofpack/expo-install-check.log`
- `npx expo-doctor` => FAIL (16/17)
  - log: `docs/execution/proofs/proofpack/expo-doctor.log`
- `npm run lint` => FAIL (script absent)
  - log: `docs/execution/proofs/proofpack/npm-run-lint.log`
  - preuve scripts: `docs/execution/proofs/proofpack/npm-run.log`

## Deviation governance
- `docs/governance/DEVIATIONS.md`
  - DEV-001: expo-doctor incoherent
  - DEV-002: lint absent
- References:
  - `docs/contracts/VALIDATION_CHECKLIST.md`
  - `docs/execution/SPEC.md`

Statut snapshot: **COMPLET**.
