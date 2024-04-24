import pandas as pd
import random
from datetime import datetime, timedelta

# Function to generate random power and calculate cost
def generate_data():
    # power = round(random.uniform(0.00072,0.00078), 7)
    power = 0
    cost = round(power * 0.1564, 7)
    return power, cost

# Function to generate day of the week
def get_day_of_week(date):
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return days[date.weekday()]

# Function to generate datetime with 5 minutes interval
def generate_datetime(start_date, end_date):
    current_date = start_date
    while current_date <= end_date:
        yield current_date
        current_date += timedelta(minutes=5)

# Format datetime for MongoDB
def format_datetime(dt):
    return dt.strftime('%Y-%m-%dT%H:%M:%S.000+00:00')

# Main function to generate CSV
def generate_csv(start_date, end_date):
    data = []
    for dt in generate_datetime(start_date, end_date):
        power, cost = generate_data()
        day = get_day_of_week(dt)
        formatted_dt = format_datetime(dt)
        data.append({'datetime': formatted_dt, 'day': day, 'power': power, 'cost': cost, 'currentState': 'New Jersey'})
    df = pd.DataFrame(data)
    df.to_csv('example_data.csv', index=False)

# Example usage
start_date = datetime(2024, 4, 24)
end_date = datetime(2024, 4, 25)
generate_csv(start_date, end_date)
