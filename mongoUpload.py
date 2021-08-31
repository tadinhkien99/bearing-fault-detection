import pymongo
from datetime import datetime


client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.f5qpu.mongodb.net/db1?retryWrites=true&w=majority")
db = client.test
db = client.get_database("db1")
records = db.Bearing_records


def upload_data_to_mongo(_factory_name, _bearing_name, _state_bearing):
    now = datetime.now()
    new_data = {
        'Factory_name': _factory_name,
        'Bearing_name': _bearing_name,
        'Fault_name': _state_bearing,
        'Time': now.strftime("%d/%m/%Y %H:%M:%S"),
    }
    records.insert_one(new_data)
