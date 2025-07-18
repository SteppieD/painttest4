#!/bin/sh

# Initialize database if it doesn't exist
if [ ! -f "$DATABASE_PATH" ]; then
    echo "Initializing database at $DATABASE_PATH..."
    # Create directory if needed
    mkdir -p $(dirname "$DATABASE_PATH")
    
    # Initialize with schema
    if [ -f "./lib/database/unified-schema.sql" ]; then
        sqlite3 "$DATABASE_PATH" < "./lib/database/unified-schema.sql"
        echo "Database initialized successfully!"
    else
        echo "Warning: Schema file not found, creating empty database"
        touch "$DATABASE_PATH"
    fi
else
    echo "Database already exists at $DATABASE_PATH"
fi

# Execute the main command
exec "$@"