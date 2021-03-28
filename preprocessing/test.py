import MeCab
import json

m = MeCab.Tagger("-Owakati")

json_open = open("./json_data/01_hokkaido.json", "r", encoding="utf8")
json_load = json.load(json_open)
a = json_load[-3]["目的"]
print(a)
print(m.parse(a))
