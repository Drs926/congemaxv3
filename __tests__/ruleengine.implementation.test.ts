import { ruleEngine } from '../src/domain/ruleEngine';
import type { RuleEngineInput } from '../src/domain/types';

const baseInput = (): RuleEngineInput => ({
  startDate: '2026-03-01',
  endDate: '2026-03-07',
  rulePack: {
    rulePackId: 'idcc-1801-v1',
    conventionName: 'Convention collective nationale des societes d assistance',
    idcc: '1801',
    versionTag: 'v1.0.0',
    effectiveFrom: '1994-04-13',
    effectiveTo: null,
    leaveAcquisition: {
      periodReferenceStartRule: 'periode_reference_complete',
      periodReferenceEndRule: 'periode_reference_complete',
      baseDaysPerYear: 25,
      accrualFrequency: 'non_defini_dans_source_v1',
      prorationMethod: 'prorata_temps_partiel',
      partTimeHandling: 'prorata_temps_partiel',
    },
    workingDaysMode: {
      defaultMode: 'ouvres',
      saturdayCounted: false,
      sundayCounted: true,
    },
    publicHolidayPolicy: {
      deductIfOnWorkedDay: true,
      shiftIfOnWeekend: false,
      customCompanyOverrideAllowed: true,
    },
    carryOverPolicy: {
      allowed: false,
      maxDays: 0,
      deadlineRule: 'non_defini_dans_source_v1',
    },
    seniorityBonusPolicy: {
      enabled: true,
      tiers: [{ years: 1, extraDays: 1 }],
    },
    fractionnementPolicy: {
      enabled: false,
      conditions: 'non_defini_dans_source_v1',
      extraDays: 0,
    },
    rttPolicy: {
      enabled: false,
      calculationMode: 'non_defini_dans_source_v1',
      annualAmount: 0,
      prorationMethod: 'non_defini_dans_source_v1',
    },
    roundingPolicy: {
      unit: 'day',
      mode: 'nearest',
    },
    disabledFeatures: [],
  },
  companySettings: {
    holidayCountry: 'FR',
    customHolidays: [],
    deductHolidayOverride: undefined,
    workingDaysModeOverride: undefined,
  },
  userSettings: {},
});

describe('RuleEngine implementation (PLAN 7)', () => {
  it('is deterministic for identical input', () => {
    const input = baseInput();
    const first = ruleEngine(input);
    const second = ruleEngine(input);
    expect(second).toEqual(first);
  });

  it('applies company workingDaysMode override before rulePack mode', () => {
    const withoutOverride = baseInput();
    const withOverride = baseInput();
    withOverride.companySettings.workingDaysModeOverride = 'ouvrables';

    const resultWithoutOverride = ruleEngine(withoutOverride);
    const resultWithOverride = ruleEngine(withOverride);

    expect(resultWithoutOverride.daysDeducted).toBe(6);
    expect(resultWithOverride.daysDeducted).toBe(5);
  });

  it('applies company deductHolidayOverride when custom override is allowed', () => {
    const input = baseInput();
    input.startDate = '2026-03-02';
    input.endDate = '2026-03-02';
    input.companySettings.customHolidays = ['2026-03-02'];
    input.companySettings.deductHolidayOverride = false;

    const result = ruleEngine(input);
    expect(result.daysDeducted).toBe(0);
  });
});
