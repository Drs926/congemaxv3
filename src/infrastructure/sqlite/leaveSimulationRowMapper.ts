import type { LeaveSimulation } from '../../domain/types';

export interface LeaveSimulationRow {
  id: string;
  start_date: string;
  end_date: string;
  rulepack_snapshot: string;
  input_snapshot: string;
  output_snapshot: string;
}

export const toLeaveSimulationRow = (simulation: LeaveSimulation): LeaveSimulationRow => ({
  id: simulation.id,
  start_date: simulation.startDate,
  end_date: simulation.endDate,
  rulepack_snapshot: JSON.stringify(simulation.rulePackSnapshot),
  input_snapshot: JSON.stringify(simulation.inputSnapshot),
  output_snapshot: JSON.stringify(simulation.outputSnapshot),
});

export const fromLeaveSimulationRow = (row: LeaveSimulationRow): LeaveSimulation => ({
  id: row.id,
  startDate: row.start_date,
  endDate: row.end_date,
  rulePackSnapshot: JSON.parse(row.rulepack_snapshot),
  inputSnapshot: JSON.parse(row.input_snapshot),
  outputSnapshot: JSON.parse(row.output_snapshot),
});
