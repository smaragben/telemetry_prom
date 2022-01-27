
from influxdb_client import InfluxDBClient
client = InfluxDBClient(url="http://localhost:8086", token = "jz5rmmjRqZCSMQHo6THPN_IHTizitM9nsJLByGxK03ly_tsxXh_mmqY_VD8s4x9K_HLfFwtTMzVxP3I-tdWxTA==", org = "smaben")
write_api = client.write_api();
write_api.write("tel", "smaben", [{"measurement": "temp1", "fields": {'degrees1': 88}}])
