def power_price():
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    from sklearn.linear_model import LinearRegression

    # Load the data
    data = {
        'year': [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        
        'price': [3.55, 3.98, 4.55, 5.03, 5.19, 5.21, 5.43, 5.48, 5.6, 6, 6.15, 6.19, 6.29]
    }
    df = pd.DataFrame(data)
    X = df['year'].values.reshape(-1, 1)
    y = df['price'].values

    # Fit Linear Regression model
    model = LinearRegression()
    model.fit(X, y)

    # Forecast for the next 20 years
    future_years = np.arange(2023, 2043).reshape(-1, 1)
    forecasted_prices = model.predict(future_years)
    return forecasted_prices
