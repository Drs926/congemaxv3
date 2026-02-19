import type { LeaveSimulation } from '../domain/types';
import { SqliteLeaveSimulationStore } from '../infrastructure/sqlite/leaveSimulationRepository';
import {
  createDefaultPersistSimulationUseCase,
  createReadSimulationUseCase,
  type PersistSimulationInput,
} from './persistSimulationUseCase';

const sqliteStore = new SqliteLeaveSimulationStore();

export const persistSimulationUseCase = async (input: PersistSimulationInput): Promise<LeaveSimulation> => {
  return createDefaultPersistSimulationUseCase(sqliteStore)(input);
};

export const readSimulationUseCase = async (id: string): Promise<LeaveSimulation | null> => {
  return createReadSimulationUseCase(sqliteStore)(id);
};
