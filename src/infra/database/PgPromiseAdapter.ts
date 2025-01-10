import pgp from 'pg-promise'
import { DatabaseConnection } from './DatabaseConnection'

export class PgPromiseAdapter implements DatabaseConnection {
  private readonly connection: any

  constructor() {
    this.connection = pgp()('')
  }

  async query(statement: string, params: any): Promise<any> {
    this.connection.query(statement, params)
  }

  async close(): Promise<void> {
    this.connection.$pool.end()
  }
}
