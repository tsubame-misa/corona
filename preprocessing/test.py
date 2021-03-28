import MeCab
import json

m = MeCab.Tagger("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd -Owakati")
file_name = ["../json_data/01_hokkaido.json","../json_data/02_touhoku.json","../json_data/03_kanto.json","../json_data/04_tyubu.json", "../json_data/05_kansai.json", "../json_data/06_tyugoku.json","../json_data/07_shikoku.json","../json_data/08_kyushu.json"]

word = []

for name in file_name:
    json_open = open(name, "r", encoding="utf8")
    json_load = json.load(json_open)
    for i in range(len(json_load)):
        a = json_load[i]["目的"]
        if a != None:
            a =  a.replace('①', '')
            a =  a.replace('②', '')
            a =  a.replace('③', '')
            a =  a.replace('④', '')
            a =  a.replace('⑤', '')
            a =  a.replace('⑥', '')
            a =  a.replace('⑦', '')
            a =  a.replace('⑧', '')
            a =  a.replace('⑨', '')
            a =  a.replace('⑩', '')
            _a = m.parse(a)
            l = _a.split()
            word.append(l)
        
print(len(word))
       

