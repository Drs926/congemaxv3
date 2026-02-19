import {
  createOptimizeAnnualPremiumUseCase,
  type OptimizeAnnualPremiumInput,
} from '../src/application/optimizeAnnualPremiumUseCase';
import type { RuleEngine, RuleEngineInput } from '../src/domain/types';

const baseInput = (): OptimizeAnnualPremiumInput => ({
  year: 2026,
  periodLengthDays: 3,
  premiumEnabled: true,
  topN: undefined,
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

describe('OptimizeAnnualPremiumUseCase (PLAN 11)', () => {
  it('requires premium flag', () => {
    const fakeEngine: RuleEngine = () => ({
      daysDeducted: 0,
      daysOffGenerated: 0,
      efficiencyScore: 0,
      detailedBreakdown: {},
    });
    const useCase = createOptimizeAnnualPremiumUseCase(fakeEngine);
    const input = baseInput();
    input.premiumEnabled = false;

    expect(() => useCase(input)).toThrow('premium_required');
  });

  it('simulates sliding periods over the civil year', () => {
    const fakeEngine: RuleEngine = () => ({
      daysDeducted: 1,
      daysOffGenerated: 0,
      efficiencyScore: 0,
      detailedBreakdown: {},
    });
    const useCase = createOptimizeAnnualPremiumUseCase(fakeEngine);
    const result = useCase(baseInput());

    expect(result.totalSimulations).toBe(363);
    expect(result.candidates).toHaveLength(363);
  });

  it('sorts candidates by rendement descending', () => {
    const fakeEngine: RuleEngine = (input: RuleEngineInput) => {
      const dayOfMonth = Number(input.startDate.slice(-2));
      const rendement = dayOfMonth % 3;
      return {
        daysDeducted: 1,
        daysOffGenerated: rendement,
        efficiencyScore: rendement,
        detailedBreakdown: {},
      };
    };
    const useCase = createOptimizeAnnualPremiumUseCase(fakeEngine);
    const input = baseInput();
    input.periodLengthDays = 1;
    input.topN = 4;

    const result = useCase(input);

    expect(result.candidates).toHaveLength(4);
    expect(result.candidates[0].rendement).toBeGreaterThanOrEqual(result.candidates[1].rendement);
    expect(result.candidates[1].rendement).toBeGreaterThanOrEqual(result.candidates[2].rendement);
    expect(result.candidates[0].startDate).toBe('2026-01-02');
    expect(result.candidates[1].startDate).toBe('2026-01-05');
  });

  it('is deterministic for identical inputs', () => {
    const fakeEngine: RuleEngine = (input: RuleEngineInput) => ({
      daysDeducted: 2,
      daysOffGenerated: 1,
      efficiencyScore: Number(input.startDate.slice(-2)),
      detailedBreakdown: {},
    });
    const useCase = createOptimizeAnnualPremiumUseCase(fakeEngine);
    const input = baseInput();
    input.topN = 5;

    const first = useCase(input);
    const second = useCase(input);

    expect(second).toEqual(first);
  });
});
