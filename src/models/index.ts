import { Pool } from 'pg';

export interface Model {
  tableName: string;
  CONN: Pool;
}

export * from './user.model';
export * from './dinner';
// export * from './product.model';
