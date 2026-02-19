import type { LeaveSimulation } from '../domain/types';
import type { LeaveSimulationStore } from './ports/leaveSimulationStore';
import {
  createPersistSimulationUseCase,
  createReadSimulationUseCase,
  type PersistSimulationInput,
} from './persistSimulationUseCase';
import { ruleEngine } from '../domain/ruleEngine';

const memoryStore = new Map<string, LeaveSimulation>();

const inMemoryStore: LeaveSimulationStore = {
  async upsert(simulation: LeaveSimulation): Promise<void> {
    memoryStore.set(simulation.id, simulation);
  },
  async findById(id: string): Promise<LeaveSimulation | null> {
    return memoryStore.get(id) ?? null;
  },
  async list(): Promise<LeaveSimulation[]> {
    return Array.from(memoryStore.values());
  },
  async deleteById(id: string): Promise<void> {
    memoryStore.delete(id);
  },
};

export const persistSimulationUseCase = async (input: PersistSimulationInput): Promise<LeaveSimulation> => {
  return createPersistSimulationUseCase(ruleEngine, inMemoryStore)(input);
};

export const readSimulationUseCase = async (id: string): Promise<LeaveSimulation | null> => {
  return createReadSimulationUseCase(inMemoryStore)(id);
};
