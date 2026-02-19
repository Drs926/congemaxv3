import type { LeaveSimulation } from '../src/domain/types';
import {
  fromLeaveSimulationRow,
  toLeaveSimulationRow,
} from '../src/infrastructure/sqlite/leaveSimulationRowMapper';

describe('LeaveSimulation row mapper', () => {
  it('serializes and deserializes snapshots without data loss', () => {
    const simulation: LeaveSimulation = {
      id: 'sim-001',
      startDate: '2026-03-02',
      endDate: '2026-03-06',
      rulePackSnapshot: {
        rulePackId: 'rp-001',
        conventionName: 'Convention Test',
        idcc: '1234',
        versionTag: 'v1',
        effectiveFrom: '2026-01-01',
        effectiveTo: null,
        leaveAcquisition: {
          periodReferenceStartRule: 'jan-1',
          periodReferenceEndRule: 'dec-31',
          baseDaysPerYear: 25,
          accrualFrequency: 'monthly',
          prorationMethod: 'calendar_days',
          partTimeHandling: 'pro_rata',
        },
        workingDaysMode: {
          defaultMode: 'ouvres',
          saturdayCounted: false,
          sundayCounted: false,
        },
        publicHolidayPolicy: {
          deductIfOnWorkedDay: false,
          shiftIfOnWeekend: false,
          customCompanyOverrideAllowed: true,
        },
        carryOverPolicy: {
          allowed: false,
          maxDays: 0,
          deadlineRule: 'none',
        },
        seniorityBonusPolicy: {
          enabled: false,
          tiers: [],
        },
        fractionnementPolicy: {
          enabled: false,
          conditions: 'none',
          extraDays: 0,
        },
        rttPolicy: {
          enabled: true,
          calculationMode: 'fixed',
          annualAmount: 10,
          prorationMethod: 'calendar_days',
        },
        roundingPolicy: {
          unit: 'half_day',
          mode: 'nearest',
        },
        disabledFeatures: [],
      },
      inputSnapshot: {
        startDate: '2026-03-02',
        endDate: '2026-03-06',
        rulePack: {
          rulePackId: 'rp-001',
          conventionName: 'Convention Test',
          idcc: '1234',
          versionTag: 'v1',
          effectiveFrom: '2026-01-01',
          effectiveTo: null,
          leaveAcquisition: {
            periodReferenceStartRule: 'jan-1',
            periodReferenceEndRule: 'dec-31',
            baseDaysPerYear: 25,
            accrualFrequency: 'monthly',
            prorationMethod: 'calendar_days',
            partTimeHandling: 'pro_rata',
          },
          workingDaysMode: {
            defaultMode: 'ouvres',
            saturdayCounted: false,
            sundayCounted: false,
          },
          publicHolidayPolicy: {
            deductIfOnWorkedDay: false,
            shiftIfOnWeekend: false,
            customCompanyOverrideAllowed: true,
          },
          carryOverPolicy: {
            allowed: false,
            maxDays: 0,
            deadlineRule: 'none',
          },
          seniorityBonusPolicy: {
            enabled: false,
            tiers: [],
          },
          fractionnementPolicy: {
            enabled: false,
            conditions: 'none',
            extraDays: 0,
          },
          rttPolicy: {
            enabled: true,
            calculationMode: 'fixed',
            annualAmount: 10,
            prorationMethod: 'calendar_days',
          },
          roundingPolicy: {
            unit: 'half_day',
            mode: 'nearest',
          },
          disabledFeatures: [],
        },
        companySettings: {
          holidayCountry: 'FR',
          customHolidays: ['2026-03-03'],
          deductHolidayOverride: false,
          workingDaysModeOverride: 'ouvrables',
        },
        userSettings: {},
      },
      outputSnapshot: {
        daysDeducted: 3.5,
        daysOffGenerated: 1.5,
        efficiencyScore: 30,
        detailedBreakdown: {
          any: 'value',
        },
      },
    };

    const row = toLeaveSimulationRow(simulation);
    const hydrated = fromLeaveSimulationRow(row);

    expect(hydrated).toEqual(simulation);
  });
});
