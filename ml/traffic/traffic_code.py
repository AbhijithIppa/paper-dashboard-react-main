from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import pandas as pd
# Initialize MinMaxScaler
scaler = MinMaxScaler()
data=pd.read_csv("traffic_data.csv")
# Extract features and target variable
X = data[['Commercial', 'Residential', 'Industrial','Connections_CR', 'Connections_IR', 'Connections_IC']]
y = data['Traffic_Volume']  # Assuming 'Traffic_Volume' is the target variable, you should replace it with the actual target variable name

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize the features
X_train_normalized = scaler.fit_transform(X_train)
X_test_normalized = scaler.transform(X_test)

# Train the linear regression model on the normalized features
model = LinearRegression()
model.fit(X_train_normalized, y_train)

# Predict traffic volume on the test set
y_pred = model.predict(X_test_normalized)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')
