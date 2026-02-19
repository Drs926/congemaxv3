import { ruleEngine } from '../domain/ruleEngine';
import type { RuleEngine, RuleEngineInput, RuleEngineOutput } from '../domain/types';

export type SimulateLeaveUseCase = (input: RuleEngineInput) => RuleEngineOutput;

export const createSimulateLeaveUseCase = (engine: RuleEngine): SimulateLeaveUseCase => {
  return (input: RuleEngineInput): RuleEngineOutput => engine(input);
};

export const simulateLeaveUseCase = createSimulateLeaveUseCase(ruleEngine);
