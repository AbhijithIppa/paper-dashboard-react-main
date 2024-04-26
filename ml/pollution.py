
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import pandas as pd,math
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

@app.route('/predict_air_pollution', methods=['POST'])
def predict_air_pollution():
    data = request.get_json()
    num_industries = data['num_industries']
    num_power_houses = data['num_power_houses']
    num_vehicles = data['num_vehicles']
    num_commercial_buildings = data['num_commercial_buildings']
    num_trees = data['num_trees']
    
    # Call the function to train and evaluate the regression model
    predicted_air_pollution = train_and_evaluate_regression(num_industries, num_power_houses, num_vehicles, num_commercial_buildings, num_trees)
    
    return jsonify({'predicted_air_pollution': predicted_air_pollution})


def train_and_evaluate_regression(num_industries, num_power_houses, num_vehicles, num_commercial_buildings,num_trees):
    # Load the dataset
    
    def adjust_x(x):
        if x > 80:
            # Exponential decrease if x is too high
            return 100 - (100 - x) * math.exp(-(x - 80))
        elif x < 20:
            # Exponential increase if x is too low
            return 20 + (x - 20) * math.exp(-(20 - x))
        else:
            return x
    
    
    data = pd.read_csv('air_pollution_dataset.csv')

    # Splitting into features and target variable
    X = data.drop(columns=['Air Pollution Index'])
    y = data['Air Pollution Index']

    # Splitting the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Feature scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Applying linear regression
    regressor = LinearRegression()
    regressor.fit(X_train_scaled, y_train)

    # Predicting on the testing set
    X_custom = [[num_industries, num_power_houses, num_vehicles, num_commercial_buildings,num_trees]]
    X_custom_scaled = scaler.transform(X_custom)
    y_pred = regressor.predict(X_custom_scaled)
    y_pred=100-y_pred
    
    return adjust_x(y_pred[0])


