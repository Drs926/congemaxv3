import type { CompanySettings, RulePack, UserSettings } from '../domain/types';

const frozenRulePackArtifact = require('../../SOURCES/rulepack.v1.json') as RulePack;
const frozenRulePackMetadata = require('../../SOURCES/rulepack.v1.freeze.json') as {
  rulePackId: string;
};

export const frozenRulePack = frozenRulePackArtifact;
export const frozenRulePackId = frozenRulePackMetadata.rulePackId;

export const defaultCompanySettings: CompanySettings = {
  holidayCountry: 'FR',
  customHolidays: [],
  deductHolidayOverride: null,
  workingDaysModeOverride: null,
};

export const defaultUserSettings: UserSettings = {};
