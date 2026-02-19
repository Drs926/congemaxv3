import type { LeaveSimulationStore } from './ports/leaveSimulationStore';
import type { LeaveSimulation, RuleEngine, RuleEngineInput } from '../domain/types';
import { ruleEngine } from '../domain/ruleEngine';

export interface PersistSimulationInput extends RuleEngineInput {
  id: string;
}

export type PersistSimulationUseCase = (input: PersistSimulationInput) => Promise<LeaveSimulation>;
export type ReadSimulationUseCase = (id: string) => Promise<LeaveSimulation | null>;
export type ListSimulationsUseCase = () => Promise<LeaveSimulation[]>;
export type DeleteSimulationUseCase = (id: string) => Promise<void>;

export const createPersistSimulationUseCase = (
  engine: RuleEngine,
  store: LeaveSimulationStore,
): PersistSimulationUseCase => {
  return async (input: PersistSimulationInput): Promise<LeaveSimulation> => {
    const outputSnapshot = engine(input);
    const simulation: LeaveSimulation = {
      id: input.id,
      startDate: input.startDate,
      endDate: input.endDate,
      rulePackSnapshot: input.rulePack,
      inputSnapshot: input,
      outputSnapshot,
    };

    await store.upsert(simulation);
    return simulation;
  };
};

export const createReadSimulationUseCase = (store: LeaveSimulationStore): ReadSimulationUseCase => {
  return (id: string): Promise<LeaveSimulation | null> => store.findById(id);
};

export const createListSimulationsUseCase = (store: LeaveSimulationStore): ListSimulationsUseCase => {
  return (): Promise<LeaveSimulation[]> => store.list();
};

export const createDeleteSimulationUseCase = (
  store: LeaveSimulationStore,
): DeleteSimulationUseCase => {
  return (id: string): Promise<void> => store.deleteById(id);
};

export const createDefaultPersistSimulationUseCase = (
  store: LeaveSimulationStore,
): PersistSimulationUseCase => createPersistSimulationUseCase(ruleEngine, store);
