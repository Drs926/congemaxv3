# VALIDATION_CHECKLIST.md

## Gates techniques
- [ ] `npm test` PASS
- [ ] `npx tsc --noEmit` PASS
- [ ] `npx expo install --check` PASS
- [ ] `npx expo-doctor` PASS ou deviation active referencee
- [ ] `npm run lint` PASS ou deviation active referencee
- [ ] Integrite RulePack gele (`verifyRulepackIntegrity`) PASS

## Deviation references
- DEV-001: `docs/governance/DEVIATIONS.md` (expo-doctor incoherent) - ACTIVE
- DEV-002: `docs/governance/DEVIATIONS.md` (lint absent) - ACTIVE
