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

export interface CompanySettings {
  holidayCountry: string;
  customHolidays: unknown[];
  deductHolidayOverride: unknown;
  workingDaysModeOverride: unknown;
}

export interface UserSettings {
  [key: string]: never;
}

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
  detailedBreakdown: unknown;
}

export interface LeaveSimulation {
  id: string;
  startDate: string;
  endDate: string;
  rulePackSnapshot: RulePack;
  inputSnapshot: RuleEngineInput;
  outputSnapshot: RuleEngineOutput;
}

export type RuleEngine = (input: RuleEngineInput) => RuleEngineOutput;
