import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'congemax.sqlite';

const SCHEMA_SQL = `
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS leave_simulations (
  id TEXT PRIMARY KEY NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  rulepack_snapshot TEXT NOT NULL,
  input_snapshot TEXT NOT NULL,
  output_snapshot TEXT NOT NULL
);
`;

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

const createDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  const database = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await database.execAsync(SCHEMA_SQL);
  return database;
};

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!databasePromise) {
    databasePromise = createDatabase();
  }
  return databasePromise;
};
