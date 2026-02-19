import { ruleEngine } from '../domain/ruleEngine';
import type {
  CompanySettings,
  RuleEngine,
  RuleEngineInput,
  RuleEngineOutput,
  RulePack,
  UserSettings,
} from '../domain/types';

export interface OptimizeAnnualPremiumInput {
  year: number;
  periodLengthDays: number;
  premiumEnabled: boolean;
  rulePack: RulePack;
  companySettings: CompanySettings;
  userSettings: UserSettings;
  topN?: number;
}

export interface AnnualOptimizationCandidate {
  rank: number;
  startDate: string;
  endDate: string;
  rendement: number;
  outputSnapshot: RuleEngineOutput;
}

export interface OptimizeAnnualPremiumResult {
  year: number;
  periodLengthDays: number;
  totalSimulations: number;
  candidates: AnnualOptimizationCandidate[];
}

const toDateOnlyIso = (date: Date): string =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
    date.getUTCDate(),
  ).padStart(2, '0')}`;

const addUtcDays = (date: Date, days: number): Date => {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
};

const startOfYearUtc = (year: number): Date => new Date(Date.UTC(year, 0, 1));
const endOfYearUtc = (year: number): Date => new Date(Date.UTC(year, 11, 31));

const toRuleEngineInput = (
  input: OptimizeAnnualPremiumInput,
  startDate: string,
  endDate: string,
): RuleEngineInput => ({
  startDate,
  endDate,
  rulePack: input.rulePack,
  companySettings: input.companySettings,
  userSettings: input.userSettings,
});

const validateInput = (input: OptimizeAnnualPremiumInput): void => {
  if (!Number.isInteger(input.year) || input.year < 1900 || input.year > 2100) {
    throw new Error('year must be an integer between 1900 and 2100');
  }

  if (!Number.isInteger(input.periodLengthDays) || input.periodLengthDays <= 0) {
    throw new Error('periodLengthDays must be a positive integer');
  }

  if (!input.premiumEnabled) {
    throw new Error('premium_required');
  }
};

export type OptimizeAnnualPremiumUseCase = (
  input: OptimizeAnnualPremiumInput,
) => OptimizeAnnualPremiumResult;

export const createOptimizeAnnualPremiumUseCase = (
  engine: RuleEngine,
): OptimizeAnnualPremiumUseCase => {
  return (input: OptimizeAnnualPremiumInput): OptimizeAnnualPremiumResult => {
    validateInput(input);

    const yearStart = startOfYearUtc(input.year);
    const yearEnd = endOfYearUtc(input.year);
    const rawCandidates: Array<Omit<AnnualOptimizationCandidate, 'rank'>> = [];

    for (
      let currentStart = yearStart;
      currentStart.getTime() <= yearEnd.getTime();
      currentStart = addUtcDays(currentStart, 1)
    ) {
      const currentEnd = addUtcDays(currentStart, input.periodLengthDays - 1);
      if (currentEnd.getTime() > yearEnd.getTime()) {
        break;
      }

      const startDate = toDateOnlyIso(currentStart);
      const endDate = toDateOnlyIso(currentEnd);
      const outputSnapshot = engine(toRuleEngineInput(input, startDate, endDate));

      rawCandidates.push({
        startDate,
        endDate,
        rendement: outputSnapshot.efficiencyScore,
        outputSnapshot,
      });
    }

    rawCandidates.sort((left, right) => {
      if (right.rendement !== left.rendement) {
        return right.rendement - left.rendement;
      }
      if (right.outputSnapshot.daysOffGenerated !== left.outputSnapshot.daysOffGenerated) {
        return right.outputSnapshot.daysOffGenerated - left.outputSnapshot.daysOffGenerated;
      }
      return left.startDate.localeCompare(right.startDate);
    });

    const limitedCandidates =
      input.topN && input.topN > 0 ? rawCandidates.slice(0, input.topN) : rawCandidates;

    return {
      year: input.year,
      periodLengthDays: input.periodLengthDays,
      totalSimulations: rawCandidates.length,
      candidates: limitedCandidates.map((candidate, index) => ({
        rank: index + 1,
        ...candidate,
      })),
    };
  };
};

export const optimizeAnnualPremiumUseCase =
  createOptimizeAnnualPremiumUseCase(ruleEngine);
