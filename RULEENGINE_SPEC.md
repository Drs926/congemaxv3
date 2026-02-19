# RULEENGINE_SPEC.md

**Titre**
Spécification RuleEngine — CongéMax

**Objectif**
Spécifier le moteur de calcul conformément au contrat : entrées, sorties, ordre d’application des règles, signature TypeScript pure, cas limites obligatoires, structure de detailedBreakdown.

**Table des sections**
- Ordre hiérarchique exact
- Signature TypeScript pure
- Diagramme logique
- Cas limites obligatoires
- Structure détaillée de detailedBreakdown
- QUESTIONS BLOQUANTES
- À DÉCIDER

**Ordre hiérarchique exact**
1. Override entreprise (si autorisé par RulePack)
2. RulePack
3. Paramètre utilisateur
4. Fallback générique

**Signature TypeScript pure**
```ts
export interface RuleEngineInput {
  startDate: string;
  endDate: string;
  rulePack: RulePack;
  companySettings: CompanySettings;
  userSettings: UserSettings;
}

export interface RuleEngineOutput {
  daysDeducted: number;
  daysOffGenerated: number;
  efficiencyScore: number;
  detailedBreakdown: unknown; // debug only
}

export type RuleEngine = (input: RuleEngineInput) => RuleEngineOutput;
```

**Diagramme logique**
- Entrées : startDate, endDate, RulePack, CompanySettings, UserSettings.
- Appliquer l’ordre hiérarchique strict des règles.
- Produire outputs : daysDeducted, daysOffGenerated, efficiencyScore, detailedBreakdown.

**Cas limites obligatoires**
- Période traversant mois.
- Période traversant année.
- Férié un samedi (ouvré vs ouvrable).
- Solde insuffisant.
- Arrondi demi-journée.
- RTT cumulée.
- Override entreprise actif.

**Structure détaillée de detailedBreakdown**
- Non définie par le contrat.
- Aucun champ autorisé tant que la structure n’est pas contractuellement définie.

**QUESTIONS BLOQUANTES**
- Formats exacts des dates (startDate, endDate).
- Définition exacte de daysOffGenerated et efficiencyScore.
- Structure exacte de detailedBreakdown.
- Définition des paramètres utilisateur utilisés par le moteur (UserSettings).
- Règles exactes d’arrondi et de proratisation en absence de précision dans RulePack.

**À DÉCIDER**
- Aucun.
