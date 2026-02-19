import type {
  CompanySettings,
  RuleEngine,
  RuleEngineInput,
  RuleEngineOutput,
  WorkingDaysMode,
} from './types';

interface ResolvedPolicies {
  workingDaysMode: WorkingDaysMode;
  workingDaysModeSource: 'company_override' | 'rulepack' | 'fallback';
  deductHolidayIfWorkedDay: boolean;
  deductHolidayPolicySource: 'company_override' | 'rulepack' | 'fallback';
}

const isWorkingDaysMode = (value: unknown): value is WorkingDaysMode =>
  value === 'ouvres' || value === 'ouvrables';

const parseDateOnlyToUtc = (dateText: string): Date => {
  const date = new Date(`${dateText}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateText}`);
  }
  return date;
};

const toDateOnlyIso = (date: Date): string =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
    date.getUTCDate(),
  ).padStart(2, '0')}`;

const addUtcDays = (date: Date, days: number): Date => {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
};

const resolvePolicies = (input: RuleEngineInput): ResolvedPolicies => {
  const fallbackMode: WorkingDaysMode = 'ouvres';
  let workingDaysMode: WorkingDaysMode = isWorkingDaysMode(input.rulePack.workingDaysMode.defaultMode)
    ? input.rulePack.workingDaysMode.defaultMode
    : fallbackMode;
  let workingDaysModeSource: ResolvedPolicies['workingDaysModeSource'] = isWorkingDaysMode(
    input.rulePack.workingDaysMode.defaultMode,
  )
    ? 'rulepack'
    : 'fallback';

  let deductHolidayIfWorkedDay = input.rulePack.publicHolidayPolicy.deductIfOnWorkedDay;
  let deductHolidayPolicySource: ResolvedPolicies['deductHolidayPolicySource'] = 'rulepack';

  if (input.rulePack.publicHolidayPolicy.customCompanyOverrideAllowed) {
    if (isWorkingDaysMode(input.companySettings.workingDaysModeOverride)) {
      workingDaysMode = input.companySettings.workingDaysModeOverride;
      workingDaysModeSource = 'company_override';
    }

    if (typeof input.companySettings.deductHolidayOverride === 'boolean') {
      deductHolidayIfWorkedDay = input.companySettings.deductHolidayOverride;
      deductHolidayPolicySource = 'company_override';
    }
  }

  return {
    workingDaysMode,
    workingDaysModeSource,
    deductHolidayIfWorkedDay,
    deductHolidayPolicySource,
  };
};

const collectHolidaySet = (companySettings: CompanySettings): Set<string> => {
  const holidaySet = new Set<string>();
  for (const value of companySettings.customHolidays) {
    if (typeof value !== 'string') {
      continue;
    }
    try {
      const parsed = parseDateOnlyToUtc(value);
      holidaySet.add(toDateOnlyIso(parsed));
    } catch {
      // Ignore invalid dates from unknown company payload; no free interpretation.
    }
  }
  return holidaySet;
};

const isPotentialWorkingDay = (
  weekday: number,
  mode: WorkingDaysMode,
  saturdayCounted: boolean,
  sundayCounted: boolean,
): boolean => {
  if (mode === 'ouvrables') {
    if (weekday === 0) {
      return false;
    }
    if (weekday === 6) {
      return saturdayCounted;
    }
    return true;
  }

  if (weekday === 6) {
    return saturdayCounted;
  }
  if (weekday === 0) {
    return sundayCounted;
  }
  return true;
};

export const ruleEngine: RuleEngine = (input: RuleEngineInput): RuleEngineOutput => {
  const startDate = parseDateOnlyToUtc(input.startDate);
  const endDate = parseDateOnlyToUtc(input.endDate);
  if (startDate.getTime() > endDate.getTime()) {
    throw new Error('startDate must be <= endDate');
  }

  const policies = resolvePolicies(input);
  const holidays = collectHolidaySet(input.companySettings);

  let totalDays = 0;
  let countedDays = 0;
  let holidayExcludedDays = 0;

  for (let cursor = startDate; cursor.getTime() <= endDate.getTime(); cursor = addUtcDays(cursor, 1)) {
    totalDays += 1;
    const weekday = cursor.getUTCDay();
    const candidateWorkingDay = isPotentialWorkingDay(
      weekday,
      policies.workingDaysMode,
      input.rulePack.workingDaysMode.saturdayCounted,
      input.rulePack.workingDaysMode.sundayCounted,
    );

    if (!candidateWorkingDay) {
      continue;
    }

    const isoDate = toDateOnlyIso(cursor);
    const isHoliday = holidays.has(isoDate);
    if (isHoliday && !policies.deductHolidayIfWorkedDay) {
      holidayExcludedDays += 1;
      continue;
    }

    countedDays += 1;
  }

  const daysDeducted = countedDays;
  const daysOffGenerated = totalDays - countedDays;
  const efficiencyScore = totalDays === 0 ? 0 : Number(((daysOffGenerated / totalDays) * 100).toFixed(2));

  return {
    daysDeducted,
    daysOffGenerated,
    efficiencyScore,
    detailedBreakdown: {
      totalDays,
      countedDays,
      holidayExcludedDays,
      policies,
    },
  };
};
