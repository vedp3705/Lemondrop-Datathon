import sqlite3
import pandas as pd

# Path to your local SQLite file
db_path = "firedata.sqlite"  # Ensure this matches the actual filename

# Connect to the SQLite database
conn = sqlite3.connect(db_path)

# List all tables in the database
query = "SELECT name FROM sqlite_master WHERE type='table';"
tables = pd.read_sql(query, conn)
print("Tables in database:\n", tables)

# Choose the correct table name (replace 'Fires' if needed)
table_name = tables.iloc[0, 0]  # Selects the first table found

# Get column names from the selected table
query = f"PRAGMA table_info({table_name});"
columns = pd.read_sql(query, conn)
print("\nColumn names:\n", columns['name'].tolist())

# Close the connection
conn.close()


# import sqlite3
# import pandas as pd

# # Path to your local SQLite file
# db_path = "firedata.sqlite"  # Make sure this matches the actual filename

# # Connect to the SQLite database
# conn = sqlite3.connect(db_path)

# # List all tables in the database (to check the correct table name)
# query = "SELECT name FROM sqlite_master WHERE type='table';"
# tables = pd.read_sql(query, conn)
# print("Tables in database:", tables)

# # Load the first 5 rows from the main table (Replace 'Fires' with the correct table name)
# query = "SELECT * FROM Fires LIMIT 5;"
# df = pd.read_sql(query, conn)

# # Close the database connection
# conn.close()

# # Print the data
# print(df)

