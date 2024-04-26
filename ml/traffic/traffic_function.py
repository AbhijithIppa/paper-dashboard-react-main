
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import pandas as pd,math
import buildingData from 'D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json';

app = Flask(__name__)
CORS(app, origins='*')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    Commercial = data['Commercial']
    Residential = data['Residential']
    Industrial = data['Industrial']
    Connections_CR = data['Connections_CR']
    Connections_IR = data['Connections_IR']
    Connections_IC = data['Connections_IC']
    
    scaler = joblib.load('D:/abhijith/MERN/dholakpur_developers/my_react/ml/traffic/traffic_scaler.pkl')   
    loaded_model = joblib.load('D:/abhijith/MERN/dholakpur_developers/my_react/ml/traffic/traffic_model.sav')
    
    input_features = [[Commercial, Residential, Industrial, Connections_CR, Connections_IR, Connections_IC]]
    input_features_scaled = scaler.transform(input_features)
    
    predicted_traffic_volume_scaled = loaded_model.predict(input_features_scaled)
    
    return jsonify({'predicted_traffic_volume_scaled': predicted_traffic_volume_scaled.tolist()})


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
    
    
    data = pd.read_csv('D:/abhijith/MERN/dholakpur_developers/my_react/ml/traffic/air_pollution_dataset.csv')

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




@app.route('/forecast_power_price', methods=['GET'])
def forecast_power_price():
    def power_price():
        data = {
            'year': [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
            'price': [3.55, 3.98, 4.55, 5.03, 5.19, 5.21, 5.43, 5.48, 5.6, 6, 6.15, 6.19, 6.29]
        }
        df = pd.DataFrame(data)
        X = df['year'].values.reshape(-1, 1)
        y = df['price'].values

        model = LinearRegression()
        model.fit(X, y)

        future_years = np.arange(2023, 2043).reshape(-1, 1)
        forecasted_prices = model.predict(future_years)
        return forecasted_prices.tolist()

    forecasted_prices = power_price()
    return jsonify({'forecasted_prices': forecasted_prices})

@app.route('/knn', methods=['GET'])

def knn_alg(x_cor, y_cor):
    import pandas as pd
    from sklearn.neighbors import KNeighborsClassifier
    
    map_dict = {"residential": 0, "industry": 1, "commercial": 2, "power-plant": 3, "road": 4, "tree": 5, "power-line": 6}

    # Create DataFrame
    df = pd.DataFrame(buildingData)

    # Map buildingType
    df['buildingType_mapped'] = df['buildingType'].map(map_dict)

    # Drop NaN values
    df.dropna(inplace=True)

    # Filter out 'road' type
    df = df[df['buildingType_mapped'] != 4]

    X = df[['x', 'y']]
    y = df['buildingType_mapped']

    # Create and fit the KNN model
    knn = KNeighborsClassifier(n_neighbors=3)
    knn.fit(X, y)

    # Predict using the trained model
    new_point = {'x': [x_cor], 'y': [y_cor]}  # New data point coordinates
    new_df_point = pd.DataFrame(new_point)
    predicted_building_type = knn.predict(new_df_point)

    return predicted_building_type[0]














if __name__ == '__main__':
    app.run(debug=True)
