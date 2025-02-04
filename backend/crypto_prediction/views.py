import logging
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
import keras
from keras import layers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests
from requests_oauthlib import OAuth2Session
from django.conf import settings

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@csrf_exempt
def predict_crypto_price(request):
    logger.info("Received request to predict stock price.")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            symbol = data.get("symbol")
            if not symbol:
                logger.error("No symbol provided in the request.")
                return JsonResponse({"error": "No symbol was provided"}, status=400)
            logger.info(f"Fetching predictions for symbol: {symbol}")
            predicted_price, last_input = predict_price(symbol=symbol)
            logger.info(f"Prediction completed for symbol: {symbol}")
            return JsonResponse({"symbol": symbol, "predicted_price": predicted_price, "last_input": last_input.tolist()})
        except Exception as e:
            logger.exception(f"Error occurred while processing the request: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)
    logger.warning("Invalid request method used.")
    return JsonResponse({"error": "Invalid request method. Use POST"}, status=400)

def predict_price(symbol):
    logger.info(f"Starting price prediction for symbol: {symbol}")
    price_output = []
    i = 0
    n_steps = 30
    model, X_train, y_train, X_test, y_test, scaler_train, scalar_test = create_model(symbol=symbol)
    logger.info(f"Length of X_test is {len(X_test)}")
    temp_input = list(X_test[-1].flatten().tolist())
    print(X_test[-1].flatten().tolist())
    logger.info(f"Length of temp_input is {len(temp_input)}")
    while i < 30:
        x_input = np.array(temp_input)
        x_input = x_input.reshape((1, n_steps, 1))
        yhat = model.predict(x_input, verbose=0)
        temp_input.extend(yhat[0].tolist())
        temp_input = temp_input[1:]
        yhat[0] = scalar_test.inverse_transform(yhat[0].reshape(-1, 1))
        price_output.extend(yhat[0].tolist())
        i += 1
    logger.info(f"Finished generating predictions for symbol: {symbol}")
    return price_output, X_test[-30]

def fetch_data(symbol, n_days=365):
    end_date = datetime.today()
    start_date = end_date - timedelta(days=n_days)
    start_date=start_date.strftime('%Y-%m-%d')
    headers = {
        'Content-Type': 'application/json'
    }
    try:
        requestResponse = requests.get(f"https://api.tiingo.com/tiingo/daily/aapl/prices?startDate={start_date}&token=4853bb9b61e94076bf5c126206b85b12da07233e", headers=headers)
        data=requestResponse.json()
        df=pd.DataFrame(data)
        df['symbol']=symbol
        return df
    except Exception as e:
        logging.error(f"Error fetching data for {symbol}: {e}")
        raise ValueError(f"Error fetching data for {symbol}: {e}")

def process_data(symbol, timestep=30):
    logger.info(f"Processing data for symbol: {symbol}")
    df = fetch_data(symbol=symbol, n_days=365)
    df = df.reset_index()['close']
    scaler_train = MinMaxScaler(feature_range=(0, 1))
    scaler_test = MinMaxScaler(feature_range=(0, 1))
    train_len = int(len(df) * 0.65)
    train_data = df[0:train_len]
    test_data = df[train_len:]
    train_data = scaler_train.fit_transform(np.array(train_data).reshape(-1, 1))
    test_data = scaler_test.fit_transform(np.array(test_data).reshape(-1, 1))
    X_train, y_train = create_dataset(train_data, timestep)
    X_test, y_test = create_dataset(test_data, timestep)
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)
    logger.info(f"Data processing completed for symbol: {symbol}")
    return X_train, y_train, X_test, y_test, scaler_train, scaler_test

def create_model(symbol):
    logger.info(f"Creating model for symbol: {symbol}")
    model = keras.Sequential()
    model.add(layers.LSTM(50, return_sequences=True, input_shape=(30, 1)))
    model.add(layers.LSTM(50, return_sequences=True))
    model.add(layers.LSTM(50))
    model.add(layers.Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')
    X_train, y_train, X_test, y_test, scaler_train, scalar_test = process_data(symbol=symbol,timestep=30)
    model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=100, batch_size=64, verbose=1)
    logger.info(f"Model training completed for symbol: {symbol}")
    return model, X_train, y_train, X_test, y_test, scaler_train, scalar_test

def create_dataset(dataset, timestep):
    logger.info("Creating dataset for time-series modeling.")
    data_X, data_Y = [], []
    for i in range(len(dataset) - timestep - 1):
        data_X.append(dataset[i:(i + timestep), :])
        data_Y.append(dataset[i + timestep, :])
    logger.info("Dataset creation completed.")
    return np.array(data_X), np.array(data_Y)

@csrf_exempt
def optimize_portfolio(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            symbols = data.get("symbols")
            logger.info(f"Request received for the symbols {symbols}")
            
            price_data_hist = []
            for symbol in symbols:
                logger.info(f"Fetching data for the symbol {symbol}")
                df = fetch_data(symbol=symbol, n_days=365)
                logger.info(f"Finished fetching data for the symbol {symbol}")
                price_data_hist.append(df)

            combined_df = pd.concat(price_data_hist, ignore_index=True)
            
            df = combined_df[['symbol', 'date', 'close']]
            df_pivot = df.pivot(
                index='date',
                columns='symbol',
                values='close'
            )
            
            logger.info("Portfolio data prepared successfully.")

            log_return=np.log(1+df_pivot.pct_change())

            logger.info("Calling monte carlo simulator")
            max_sharpe_ratio,min_vol=monte_carlo_simulator(log_return=log_return,symbols=symbols)
            return JsonResponse({"message": "Portfolio data optimized successfully.","max_sharpe_ratio":max_sharpe_ratio.to_json(),"min_vol":min_vol.to_json()}, status=200)
        
        except Exception as e:
            logger.error(f"Error optimizing portfolio: {e}")
            return JsonResponse({"error": str(e)}, status=500)

def monte_carlo_simulator(log_return,symbols):
    no_of_simulations = 3000
    weights_record = np.zeros((no_of_simulations,len(symbols)))
    ret_record = np.zeros(no_of_simulations)
    vol_record = np.zeros(no_of_simulations)
    sharpe_record = np.zeros(no_of_simulations)
    logger.info("Staring monte carlo simulation")
    for i in range(no_of_simulations):
        weights_record[i] = np.random.random(len(symbols))
        weights_record[i] = weights_record[i]/np.sum(weights_record[i])
        ret_record[i] = np.sum((log_return.mean()*weights_record[i])*252)
        vol_record[i] = np.sqrt( 
            np.dot(
                weights_record[i].T,
                np.dot(
                    log_return.cov()*252,
                    weights_record[i]
                )
            )
            )
        sharpe_record[i] = ret_record[i]/vol_record[i]

    logger.info("Finished monte carlo simulation")
    simulations_data = [ret_record,vol_record,sharpe_record,weights_record]

    simulations_df = pd.DataFrame(data=simulations_data).T
    simulations_df.columns = ['Returns','Volatility','Sharpe Ratio','Portfolio Weights']

    simulations_df = simulations_df.infer_objects()

    max_sharpe_ratio = simulations_df.loc[simulations_df['Sharpe Ratio'].idxmax()]
    min_vol = simulations_df.loc[simulations_df['Volatility'].idxmin()]

    return max_sharpe_ratio,min_vol