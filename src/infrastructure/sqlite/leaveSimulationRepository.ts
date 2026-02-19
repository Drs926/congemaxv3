import type { LeaveSimulationStore } from '../../application/ports/leaveSimulationStore';
import type { LeaveSimulation } from '../../domain/types';
import { getDatabase } from './database';
import {
  fromLeaveSimulationRow,
  toLeaveSimulationRow,
  type LeaveSimulationRow,
} from './leaveSimulationRowMapper';

const SELECT_COLUMNS = `
id,
start_date,
end_date,
rulepack_snapshot,
input_snapshot,
output_snapshot
`;

const UPSERT_SQL = `
INSERT INTO leave_simulations (
  id,
  start_date,
  end_date,
  rulepack_snapshot,
  input_snapshot,
  output_snapshot
) VALUES (?, ?, ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  rulepack_snapshot = excluded.rulepack_snapshot,
  input_snapshot = excluded.input_snapshot,
  output_snapshot = excluded.output_snapshot;
`;

export class SqliteLeaveSimulationStore implements LeaveSimulationStore {
  async upsert(simulation: LeaveSimulation): Promise<void> {
    const db = await getDatabase();
    const row = toLeaveSimulationRow(simulation);
    await db.runAsync(
      UPSERT_SQL,
      row.id,
      row.start_date,
      row.end_date,
      row.rulepack_snapshot,
      row.input_snapshot,
      row.output_snapshot,
    );
  }

  async findById(id: string): Promise<LeaveSimulation | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<LeaveSimulationRow>(
      `SELECT ${SELECT_COLUMNS} FROM leave_simulations WHERE id = ?`,
      id,
    );

    return row ? fromLeaveSimulationRow(row) : null;
  }

  async list(): Promise<LeaveSimulation[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<LeaveSimulationRow>(
      `SELECT ${SELECT_COLUMNS} FROM leave_simulations ORDER BY rowid DESC`,
    );
    return rows.map(fromLeaveSimulationRow);
  }

  async deleteById(id: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM leave_simulations WHERE id = ?', id);
  }
}
