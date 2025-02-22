import sqlite3
import pandas as pd

# Connect to the SQLite database
conn = sqlite3.connect("firedata.sqlite")  # Replace with your database filename

# Load data from the 'Fires' table (assuming this is the main table of interest)
query = "SELECT * FROM Fires"
df = pd.read_sql(query, conn)

# Display initial data overview
print("Initial Data Overview:")
df.info()git 

# List of columns to keep
columns_to_keep = [
    "OBJECTID",
    "FOD_ID",
    "NWCG_REPORTING_UNIT_NAME",
    "FIRE_YEAR",
    "DISCOVERY_DATE",
    "STAT_CAUSE_DESCR",
    "FIRE_SIZE",
    "FIRE_SIZE_CLASS",
    "LATITUDE",
    "LONGITUDE",
    "COUNTY",
    "STATE"
]

# Drop specified columns and remove missing values
df_cleaned = df[columns_to_keep]

df_cleaned = df_cleaned.dropna(subset=['COUNTY'])

# Save the cleaned data back to SQLite (optional)
df_cleaned.to_sql("Fires_Cleaned", conn, if_exists="replace", index=False)

# Close connection
conn.close()

# Display cleaned data overview
print("Final Data Overview:")
df_cleaned.info()

# Convert the cleaned DataFrame to a CSV file
csv_filename = "cleaned_fire_data.csv"
df_cleaned.to_csv(csv_filename, index=False)
print(f"Cleaned data has been successfully saved to {csv_filename}")