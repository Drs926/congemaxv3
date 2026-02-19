import { createSimulateLeaveUseCase } from '../src/application/simulateLeaveUseCase';
import type { RuleEngineInput, RuleEngineOutput } from '../src/domain/types';

const buildInput = (): RuleEngineInput => ({
  startDate: '2026-03-02',
  endDate: '2026-03-03',
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
      sundayCounted: false,
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

describe('simulateLeaveUseCase (PLAN 8)', () => {
  it('delegates execution to the injected domain engine', () => {
    const expected: RuleEngineOutput = {
      daysDeducted: 2,
      daysOffGenerated: 0,
      efficiencyScore: 0,
      detailedBreakdown: { delegated: true },
    };

    const fakeEngine = jest.fn<RuleEngineOutput, [RuleEngineInput]>(() => expected);
    const useCase = createSimulateLeaveUseCase(fakeEngine);
    const input = buildInput();
    const result = useCase(input);

    expect(fakeEngine).toHaveBeenCalledTimes(1);
    expect(fakeEngine).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });
});
