import re
import joblib
import time

from flask_login import login_required, current_user
from requests.auth import HTTPBasicAuth
from scipy.stats import kurtosis, skew, weibull_min
from scipy.ndimage import gaussian_filter1d
from flask import Blueprint, Flask, render_template, request, jsonify, send_from_directory, url_for, g, session, \
    redirect
import numpy as np
import os
import json
import pandas as pd
import requests
from datetime import datetime, timedelta
from mongoUpload import upload_data_to_mongo
from Utils import PrepareData

main = Blueprint('main', __name__)

from collections import namedtuple

# class User:
#     def __init__(self, id, username, password):
#         self.id = id
#         self.username = username
#         self.password = password
#
#     def __repr__(self):
#         return f'<User: {self.username}>'
#
# users = []
# users.append(User(id=1, username='admin', password='admin'))

# application = Blueprint('main', __name__)

# TEMPLATE_DIR = os.path.abspath('templates')
# STATIC_DIR = os.path.abspath('static')
#
# application = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)
#
#
application_ROOT = os.path.dirname(os.path.abspath(__file__))


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/home', methods=['GET'])
@login_required
def home():
    return render_template('home.html')


# @main.route('/predictAWS', methods=["POST"])
# def predict():
#     url = 'https://3w8i371all.execute-api.us-east-1.amazonaws.com/species/irispredict'
#     filename = ''
#     x = {"data": ''}
#     target = os.path.join(application_ROOT, 'temp_file/')
#     print(target)
#     if not os.path.isdir(target):
#         os.mkdir(target)
#     print(request.files.getlist("text_file"))
#     for upload in request.files.getlist("text_file"):
#         print(upload)
#         print("{} is the file name".format(upload.filename))
#         filename = upload.filename
#         destination = "/".join([target, filename])
#         print("Accept incoming file:", filename)
#         print("Save it to:", destination)
#         upload.save(destination)
#     try:
#         with open("temp_file/" + filename, 'r', encoding='utf-8') as file_to_be_sent:
#             content = file_to_be_sent.read()
#     except PermissionError:
#         return jsonify({'error': "You haven't chosen file yet"})
#     x["data"] = content
#     data = json.dumps(x)
#     response = requests.post(url, data=data, headers={"Content-Type": "applicationlication/json"})
#     print(response)
#     try:
#         return jsonify({'filename': filename, 'result': response.text})
#     except AttributeError:
#         return jsonify({'error': "File has not been uploaded"})


@main.route('/predict', methods=["POST"])
def predict():
    url = 'https://flaskapi-test.herokuapp.com/'
    urlLogin = 'login'
    urlDiagnose = 'diagnose'
    response = requests.get(url + urlLogin, verify=False, auth=HTTPBasicAuth('admin', 'admin'))
    responseToken = response.json()['token']
    filename = ''
    target = os.path.join(application_ROOT, 'temp_file/')
    print(target)
    if not os.path.isdir(target):
        os.mkdir(target)
    # print(request.files.get('file').read())
    for upload in request.files.getlist("text_file"):
        print(upload)
        print("{} is the file name".format(upload.filename))
        filename = upload.filename
        destination = "/".join([target, filename])
        print("Accept incoming file:", filename)
        print("Save it to:", destination)
        upload.save(destination)
    try:
        files = {"file": ('1.txt', open(application_ROOT + "/temp_file/" + filename, 'r', encoding='utf-8'))}
    except PermissionError:
        return jsonify({'error': "You haven't chosen file yet"})

    response = requests.post(url + urlDiagnose, headers={'x-access-token': responseToken}, files=files)

    try:
        return jsonify({'filename': filename, 'result': response.text})
    except AttributeError:
        return jsonify({'error': "File has not been uploaded"})


@main.route('/readdatabase', methods=['POST'])
def readdatabase():
    data_time = []
    data_name = []
    data_value = []
    data_quality = []
    df = pd.read_csv('../data_kepware.txt', engine='python', sep='\s*', header=None)
    # print(df)
    s_array = df[[0, 1, 2, 3]].to_numpy()
    for d in s_array:
        data_time.append(d[3])
        data_name.append(d[0])
        data_value.append(d[2])
        data_quality.append(d[1])
    data_dict = [{"name": val[0], "quality": val[1], "value": val[2], "time": val[3]} for val
                 in zip(data_name, data_quality, data_value, data_time)]
    case = data_dict
    print(case)
    return 'case'


@main.route('/linechart', methods=['POST'])
def linechart():
    url = 'https://flaskapi-test.herokuapp.com/'
    urlLogin = 'login'
    urlDiagnose = 'diagnose'
    data_train_dir = r"D:\Download_data\LV\IMS\data_train\inner/"

    data_folder = request.form["url_folder"]
    data_folder = data_folder.split(',')
    result_array = []
    # print(data_folder)
    for data_dir in data_folder:
        prepare_data = PrepareData()
        prepare_data.set_data_n_buffer_path(data_train_dir, data_dir)
        # prepare_data.rename()
        prepare_data.simulate_buffer()
        # time.sleep(5)

        print(os.listdir(data_dir))
        all_labels = []
        all_values = {'id': '', 'ar_values': []}
        id = re.findall(r'\d+', data_dir)
        id = ''.join(id)
        # print(id)
        # merged_data = pd.DataFrame()
        dataset = pd.read_csv(os.path.join(data_dir, os.listdir(data_dir)[0]), sep='\t', usecols=[0])
        dataset_mean_abs = np.array(dataset[:100])
        dataset_mean_abs = pd.DataFrame(dataset_mean_abs)
        values = np.asarray(dataset_mean_abs.iloc[:, 0]).tolist()
        labels = list(range(0, 100))

        # for filename in os.listdir(data_dir):
        #    dataset = pd.read_csv(os.path.join(data_dir, filename), sep='\t', usecols=[0, 1, 2, 3])
        #    dataset_mean_abs = np.array(dataset.abs().mean())
        #    dataset_mean_abs = pd.DataFrame(dataset_mean_abs.reshape(1, 4))
        #    dataset_mean_abs.index = [filename]
        #    merged_data = merged_data.append(dataset_mean_abs)
        # merged_data.columns = ['Bearing 1', 'Bearing 2', 'Bearing 3', 'Bearing 4']
        # merged_data.index = pd.to_datetime(merged_data.index, format='%Y.%m.%d.%H.%M.%S')
        # # merged_data = merged_data.sort_index()
        # merged_data = merged_data.reset_index().set_index('index', drop=False)
        # # print(merged_data.head())
        # labels = pd.Series(merged_data['index']).tolist()
        # values = np.asarray(merged_data['Bearing 1']).tolist()
        tmax = 0
        for i in range(len(values)):
            if values[i] > tmax:
                tmax = values[i]
        tmax = tmax + 0.02

        print(data_dir + os.listdir(data_dir)[0])
        response = requests.get(url + urlLogin, verify=False, auth=HTTPBasicAuth('admin', 'admin'))
        responseToken = response.json()['token']
        files = {"file": (os.listdir(data_dir)[0], open(data_dir + os.listdir(data_dir)[0], 'r', encoding='utf-8'))}
        response = requests.post(url + urlDiagnose, headers={'x-access-token': responseToken}, files=files)

        state_bearing = response.text
        factory_name = data_dir[10:19]
        bearing_name = data_dir[20:29]
        upload_data_to_mongo(factory_name, bearing_name, state_bearing)
        all_labels.append({'labels': labels, 'values': values, 'max': tmax, 'state': state_bearing.upper()})
        if int(id) > 27:
            id = int(id) - 25
        elif int(id) < 15:
            id = int(id) - 11
        else:
            id = int(id) - 18
        all_values['id'] = id
        all_values['ar_values'] = all_labels
        result_array.append(all_values)
    return jsonify(result_array)


@main.route('/lifebar', methods=['POST'])
def lifebar():
    url = 'https://flaskapi-test.herokuapp.com/'
    urlLogin = 'login'
    urlLife = 'life'
    response = requests.get(url + urlLogin, verify=False, auth=HTTPBasicAuth('admin', 'admin'))
    responseToken = response.json()['token']
    data_folder = request.form["url_folder"]
    data_folder = data_folder.split(',')
    result_array = []
    for data_dir in data_folder:
        all_values = {'id': '', 'life_past': '', 'life': '', 'life_percent': ''}
        id = re.findall(r'\d+', data_dir)
        id = ''.join(id)

        for file in os.listdir(data_dir):
            if file[-3:] == "csv":
                dir = os.path.join(data_dir, file)
                files = {"file": (file, open(dir, 'r', encoding='utf-8'))}
                response = requests.post(url + urlLife, headers={'x-access-token': responseToken, 'time': str(200)},
                                         files=files)

        expectancy, life_percent, left_expectancy = response.text.split("\n")

        all_values['id'] = id
        all_values['life'] = expectancy
        all_values['life_percent'] = str(100 - float(life_percent))
        all_values['life_past'] = left_expectancy
        result_array.append(all_values)
    print(result_array)
    return jsonify(result_array)

# if __name__ == '__main__':
#     application.run(host='127.0.0.1', port=2000, debug=True)
