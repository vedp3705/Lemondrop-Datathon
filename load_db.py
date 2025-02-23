import sqlite3
import pandas as pd

conn = sqlite3.connect("firedata.sqlite")  

# Load data from the 'Fires' table which contains most of the data we want to use
query = "SELECT * FROM Fires"
df = pd.read_sql(query, conn)

print("Initial Data Overview:")
df.info()

# List of columns we want to train our model on
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

df_cleaned = df[columns_to_keep]

df_cleaned = df_cleaned.dropna(subset=['COUNTY'])

df_cleaned.to_sql("Fires_Cleaned", conn, if_exists="replace", index=False)

conn.close()

print("Final Data Overview:")
df_cleaned.info()

# Convert the cleaned DataFrame to a CSV file which we can run more pre-processing before inputting to model
csv_filename = "cleaned_fire_data.csv"
df_cleaned.to_csv(csv_filename, index=False)
print(f"Cleaned data has been successfully saved to {csv_filename}")