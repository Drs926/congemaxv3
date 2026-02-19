# DATA_MODEL_CONTRACT.md

**Titre**
Contrat Modèle de Données — CongéMax

**Objectif**
Définir les entités exactes, types TypeScript stricts, contraintes, relations et index SQLite nécessaires, sans ajout de champ non défini.

**Table des sections**
- Entités exactes
- Types TypeScript stricts
- Contraintes
- Relations
- Index SQLite nécessaires
- QUESTIONS BLOQUANTES
- À DÉCIDER

**Entités exactes**
- User
- ConventionCollective
- RulePack (structure minimale section 4 du document fondateur)
- CompanySettings
- LeaveSimulation
- UserSettings (présent comme entrée du moteur)

**Types TypeScript stricts**
```ts
export type WorkingDaysMode = 'ouvres' | 'ouvrables';
export type RoundingUnit = 'day' | 'half_day';
export type RoundingMode = 'up' | 'down' | 'nearest';

export interface RulePack {
  rulePackId: string;
  conventionName: string;
  idcc: string;
  versionTag: string;
  effectiveFrom: string;
  effectiveTo: string | null;
  leaveAcquisition: {
    periodReferenceStartRule: string;
    periodReferenceEndRule: string;
    baseDaysPerYear: number;
    accrualFrequency: string;
    prorationMethod: string;
    partTimeHandling: string;
  };
  workingDaysMode: {
    defaultMode: WorkingDaysMode;
    saturdayCounted: boolean;
    sundayCounted: boolean;
  };
  publicHolidayPolicy: {
    deductIfOnWorkedDay: boolean;
    shiftIfOnWeekend: boolean;
    customCompanyOverrideAllowed: boolean;
  };
  carryOverPolicy: {
    allowed: boolean;
    maxDays: number;
    deadlineRule: string;
  };
  seniorityBonusPolicy: {
    enabled: boolean;
    tiers: Array<{ years: number; extraDays: number }>;
  };
  fractionnementPolicy: {
    enabled: boolean;
    conditions: string;
    extraDays: number;
  };
  rttPolicy: {
    enabled: boolean;
    calculationMode: string;
    annualAmount: number;
    prorationMethod: string;
  };
  roundingPolicy: {
    unit: RoundingUnit;
    mode: RoundingMode;
  };
  disabledFeatures: string[];
}

export interface User {
  id: string;
  workRate: number;
  rulePackId: string;
  leaveRemaining: number;
  rttRemaining: number;
}

export interface ConventionCollective {
  idcc: string;
  name: string;
  versionTag: string;
  rulePackId: string;
}

export interface CompanySettings {
  holidayCountry: string;
  customHolidays: unknown[];
  deductHolidayOverride: unknown;
  workingDaysModeOverride: unknown;
}

export interface UserSettings {
  // Aucun champ défini par le contrat
  [key: string]: never;
}

export interface RuleEngineInputSnapshot {
  startDate: string;
  endDate: string;
  rulePack: RulePack;
  companySettings: CompanySettings;
  userSettings: UserSettings;
}

export interface RuleEngineOutputSnapshot {
  daysDeducted: number;
  daysOffGenerated: number;
  efficiencyScore: number;
  detailedBreakdown: unknown;
}

export interface LeaveSimulation {
  id: string;
  startDate: string;
  endDate: string;
  rulePackSnapshot: RulePack;
  inputSnapshot: RuleEngineInputSnapshot;
  outputSnapshot: RuleEngineOutputSnapshot;
}
```

**Contraintes**
- Aucun champ supplémentaire n’est autorisé en dehors des champs listés ci-dessus.
- effectiveTo est nullable.
- RulePack doit respecter la structure minimale contractuelle.
- detailedBreakdown est réservé au debug et non défini contractuellement.
- UserSettings ne contient aucun champ défini par le contrat.

**Relations**
- User.rulePackId référence RulePack.rulePackId.
- ConventionCollective.rulePackId référence RulePack.rulePackId.
- LeaveSimulation.rulePackSnapshot est un snapshot RulePack.
- LeaveSimulation.inputSnapshot inclut RulePack, CompanySettings, UserSettings et dates.
- LeaveSimulation.outputSnapshot correspond aux sorties du moteur.

**Index SQLite nécessaires**
- Aucun index n’est défini contractuellement.

**QUESTIONS BLOQUANTES**
- Formats exacts des dates (startDate, endDate, effectiveFrom, effectiveTo).
- Typage exact de CompanySettings.customHolidays, deductHolidayOverride, workingDaysModeOverride.
- Structure exacte de UserSettings.
- Structure détaillée de detailedBreakdown.
- Contraintes numériques (plages, arrondis) sur workRate, leaveRemaining, rttRemaining, baseDaysPerYear, etc.

**À DÉCIDER**
- Aucun.
