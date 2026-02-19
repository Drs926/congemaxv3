# VALIDATION_CHECKLIST.md

## Gates techniques
- [ ] `npm test` PASS
- [ ] `npx tsc --noEmit` PASS
- [ ] `npx expo install --check` PASS
- [ ] `npx expo-doctor` PASS ou deviation active referencee
- [ ] `npm run lint` PASS ou deviation active referencee
- [ ] Integrite RulePack gele (`verifyRulepackIntegrity`) PASS
- [x] USABLE_FLOW PASS
  - Definition courte: flux utilisable onboarding -> simulation -> resultats -> premium gate, sans blocage Splash.
  - PASS: onboarding atteignable/validable, simulation lancable, resultats affiches, `premium_required` prouve en non-premium.

## Deviation references
- DEV-001: `docs/governance/DEVIATIONS.md` (expo-doctor incoherent) - ACTIVE
- DEV-002: `docs/governance/DEVIATIONS.md` (lint absent) - ACTIVE

## Exception policy
- Si DEV-001 et/ou DEV-002 sont ACTIVE, les gates `expo-doctor` et `lint` restent acceptables sous conditions de mitigation documentees dans `docs/governance/DEVIATIONS.md`.
