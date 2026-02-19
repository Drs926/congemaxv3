import { verifyRulepackIntegrity } from '../src/domain/rulepackFreeze';

describe('RulePack freeze integrity', () => {
  it('returns ok=true for the frozen rulepack artifact', async () => {
    const result = await verifyRulepackIntegrity();
    expect(result.ok).toBe(true);
  });
});
