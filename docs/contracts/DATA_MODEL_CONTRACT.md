# Data Model Contract - CongéMax V3

## Objectif
Definir les donnees minimales pour supporter les 8 ecrans V3 sans ajout hors scope.

## Entites minimales
1. Profile
- `profileId: string`
- `locale: "fr-FR"`
- `timezone: string`
- `weekStart: 1`

2. Balances
- `balanceId: string`
- `profileId: string`
- `congesDays: number`
- `rttDays: number`
- `allowHalfDay: boolean`

3. ConventionActive
- `idcc: string`
- `name: string`
- `versionTag: string`
- `sourceRef: string`

4. Scenario
- `scenarioId: string`
- `profileId: string`
- `startDate: string`
- `endDate: string`
- `includeRtt: boolean`
- `notes: string`
- `status: "draft" | "configured" | "simulated" | "optimized"`

5. PremiumStatus
- `profileId: string`
- `enabled: boolean`
- `updatedAt: string`

6. LastResults
- `scenarioId: string`
- `daysDeducted: number`
- `daysOffGenerated: number`
- `efficiencyScore: number`
- `breakdown: string`
- `computedAt: string`
- `deterministic: true`

7. LastCommentary
- `scenarioId: string`
- `text: string`
- `readonly: true`
- `commentedAt: string`

## Regles de coherence
- Toutes les dates sont au format `YYYY-MM-DD`.
- Un seul enregistrement `ConventionActive` est actif.
- Changement de `ConventionActive`:
- suppression des `Scenario` existants.
- suppression des `LastResults`.
- suppression des `LastCommentary`.
- Le moteur lit uniquement `Scenario`, `Balances`, `ConventionActive`.
- `LastCommentary` ne modifie jamais `LastResults`.
