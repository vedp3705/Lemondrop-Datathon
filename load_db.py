import sqlite3
import pandas as pd

# Connect to the SQLite database
conn = sqlite3.connect("firedata.sqlite")  # Replace with your database filename

# Load data from the 'Fires' table (assuming this is the main table of interest)
query = "SELECT * FROM Fires"
df = pd.read_sql(query, conn)

# Display initial data overview
print("Initial Data Overview:")
df.info()

# List of columns to drop
columns_to_drop = [
    "FOD_ID", "FPA_ID", "SOURCE_SYSTEM_TYPE", "SOURCE_SYSTEM", 
    "NWCG_REPORTING_AGENCY", "NWCG_REPORTING_UNIT_ID", "NWCG_REPORTING_UNIT_NAME",
    "SOURCE_REPORTING_UNIT", "SOURCE_REPORTING_UNIT_NAME", "LOCAL_FIRE_REPORT_ID",
    "LOCAL_INCIDENT_ID", "FIRE_CODE", "FIRE_NAME", "ICS_209_INCIDENT_NUMBER"
]

# Drop specified columns and remove missing values
df_cleaned = df.drop(columns=columns_to_drop, errors="ignore")
df_cleaned = df_cleaned.dropna()

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
