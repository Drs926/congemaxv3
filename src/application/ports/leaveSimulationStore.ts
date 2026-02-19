import type { LeaveSimulation } from '../../domain/types';

export interface LeaveSimulationStore {
  upsert(simulation: LeaveSimulation): Promise<void>;
  findById(id: string): Promise<LeaveSimulation | null>;
  list(): Promise<LeaveSimulation[]>;
  deleteById(id: string): Promise<void>;
}
