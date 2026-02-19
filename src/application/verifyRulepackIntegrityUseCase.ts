import {
  verifyRulepackIntegrity,
  type RulepackIntegrityResult,
} from '../domain/rulepackFreeze';

export type VerifyRulepackIntegrityUseCase = () => Promise<RulepackIntegrityResult>;

export const verifyRulepackIntegrityUseCase: VerifyRulepackIntegrityUseCase = () => {
  return verifyRulepackIntegrity();
};
