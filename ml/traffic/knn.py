def knn_alg(x_cor, y_cor, arr):
    import pandas as pd
    from sklearn.neighbors import KNeighborsClassifier
    
    map_dict = {"residential": 0, "industry": 1, "commercial": 2, "power-plant": 3, "road": 4, "tree": 5, "power-line": 6}

    # Create DataFrame
    df = pd.DataFrame(arr)

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