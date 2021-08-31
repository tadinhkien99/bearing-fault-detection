import requests
from requests.auth import HTTPBasicAuth

url = 'http://127.0.0.1:3000/'
urlLogin = 'login'
urlDiagnose = 'diagnose'

response = requests.get(url + urlLogin, verify=False, auth=HTTPBasicAuth('admin', 'admin'))
responseToken = response.json()['token']

files = {"file":('1.txt',open('1.txt',"r"))}
responseResult = requests.post(url + urlDiagnose, headers={'x-access-token': responseToken}, files=files)
print(responseResult.text)
