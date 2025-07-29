// This file should only be imported in server-side code (API routes, server components)
import 'server-only'
import Database from 'better-sqlite3'
import * as fs from 'fs'
import * as path from 'path'

let db: Database.Database | null = null

export function getServerDatabase(): Database.Database {
  if (db) return db

  const dbPath = process.env.DATABASE_PATH || './painting_quotes_app.db'
  
  try {
    console.log('Initializing server database at:', dbPath)
    
    db = new Database(dbPath, { verbose: console.log })
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON')
    
    // Run schema if database is new
    const schemaPath = path.join(process.cwd(), 'lib', 'database', 'unified-schema.sql')
    
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8')
      console.log('Schema loaded, executing...')
      
      try {
        db.exec(schema)
        console.log('Schema executed successfully')
      } catch (error) {
        console.error('Error executing schema:', error)
        // Schema might already exist, continue
      }
    }
    
    return db
  } catch (error) {
    console.error('Server database initialization error:', error)
    throw error
  }
}

export function closeServerDatabase() {
  if (db) {
    db.close()
    db = null
  }
}