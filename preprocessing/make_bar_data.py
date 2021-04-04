import MeCab
import json
import mojimoji
import neologdn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
import random
import numpy as np
import re
import pandas as pd


#m = MeCab.Tagger("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd -Owakati")
m = MeCab.Tagger("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd -Ochasen")
#file_name = ["../json_data/01_hokkaido.json","../json_data/02_touhoku.json","../json_data/03_kanto.json","../json_data/04_tyubu.json", "../json_data/05_kansai.json", "../json_data/06_tyugoku.json","../json_data/07_shikoku.json","../json_data/08_kyushu.json"]
#file_name = ["../json_data/03_kanto.json"]
file_name = ["../json_data/08_kyushu.json"]
color=[["#f3edf6","#e9dbf1","#ddbeed","#d39aef","#cd6ef8","#aa64ca","#8c58a4","#724c84","#5c4068","#3e2e45"],
    ["#eeeff6","#dddfef","#c3c7e9","#a7abe7","#8d8eee","#776ef8","#6561c3","#55539b","#464679","#31314e"],
["#ebeff7","#d8e1f1","#b8c9ed","#92aff0","#6d95f2","#617fc6","#556ca1","#495b82","#3e4b68","#2c3444"],
["#e6f1f8","#cbe4f5","#98d0f6","#6bb8e8","#639ec4","#5986a4","#4f7188","#455e6f","#3a4d5a","#2b353d"],
["#c1f9fa","#6ff4f6","#6bdadc","#65bebf","#5ea3a3","#558a8a","#4b7474","#426161","#384f4f","#293636"],
["#c3faea","#6ff7d5","#6bdcbf","#65c0a7","#5da591","#548b7c","#4b7568","#426158","#385048","#293732"],
["#ccfad8","#6ffaa0","#6be092","#65c382","#5ea673","#558d64","#4b7756","#426349","#38513d","#29382c"],
["#d0fbbc","#9ef66e","#91dc68","#82c060","#73a558","#658c4f","#577646","#4b623d","#3e5034","#2c3726"],
["#e4fb70","#d6eb6b","#c0d265","#a8b85d","#919e55","#7c864c","#697143","#585e3b","#484d32","#333625"]]
#word_list = ["感染症", "コロナウイルス感染症","新型コロナウイルス", "対策", "防止", "感染拡大", "実施", "事業者", "事業", "新型コロナウイルス感染症", "拡大", "経費", "支援", "感染", "コロナ", "目的", "新型コロナ"]
word_list = []

def normalize_text(text):
    #result = mojimoji.zen_to_han(text, kana=False)
    text =  text.replace('①', '')
    text =  text.replace('②', '')
    text =  text.replace('③', '')
    text =  text.replace('④', '')
    text =  text.replace('⑤', '')
    text =  text.replace('⑥', '')
    text =  text.replace('⑦', '')
    text =  text.replace('⑧', '')
    text =  text.replace('⑨', '')
    text =  text.replace('⑩', '')
    result = neologdn.normalize(text)
    return result

def rm_num(text):
    #text = text.split()
    rm_idx = []
    for i in range(len(text)):
        number = re.findall('1|2|3|4|5|6|7|8|9|0', text[i])
        if len(number)> 0:
            rm_idx.append(i)
    if len(rm_idx)!=0:
        for i in sorted(rm_idx, reverse=True):
            text.pop(i)
    #text = " ".join(text)
    return(text)


word = []
for name in file_name:
    json_open = open(name, "r", encoding="utf8")
    json_load = json.load(json_open)
    prefecture = list(set([f.get("県名") for f in json_load]))
    word = [[] for i in range(len(prefecture))]
    print(word, prefecture, len(prefecture))
    for i in range(len(json_load)):
        text = json_load[i]["目的"]
        p = json_load[i]["県名"]
        w = []*len(prefecture)
        if text!=None:
            text = normalize_text(text)
            for c in m.parse(text).splitlines()[:-1]:
                surface = c.split("\t")
                pos = surface[3].split('-')
                if pos[0] == '名詞':
                    w.append(surface[0])
            w = rm_num(w) 
            word[prefecture.index(p)].append(" ".join(w))
            """
            text = m.parse(text)
            text = rm_num(text)
            #m_text = text.split()
            #print(text)
            nouns = [line for line in text.split("\n")]
            print(nouns)
            word.append(text)
            """
    print(name)

Data = []
for p_idx in range(len(prefecture)):
    tfidf = TfidfVectorizer()
    t_x = tfidf.fit_transform(word[p_idx])
    df_tfidf = t_x.toarray()

    wc = CountVectorizer()
    x = wc.fit_transform(word[p_idx])
    wcX = np.array(x.toarray())
    names = wc.get_feature_names()

    #Data = []
    D = []
    for j in range(len(wcX[0])):
        count = 0
        p = False
        if not(names[j] in word_list):
            for i in range(len(wcX)):
                if df_tfidf[i][j] >= 0.6:
                    p = True
                if wcX[i][j] >= 0:
                    count += wcX[i][j]
            d ={"text":names[j], "value":int(count)}
        #Data.append(d)
        #Data.append([wc.get_feature_names()[j], count])
        if p==True:
            D.append(d)
        if j%1000==0:
            print(j)

    #D = sorted(Data, key=lambda x: x["value"], reverse=True)
    D = sorted(D,key=lambda x: x["value"], reverse=True)
    if len(D) >= 10:
        D = D[:10]
    
    for i in range(len(D)):
        if i < 5:
            d =  { "type": "stackedBar100", "name": D[i]["text"], 
            "dataPoints": [{ "label": prefecture[p_idx],
             "y": D[i]["value"], "x": p_idx , "color": color[p_idx][-i-1],
            "indexLabelFontColor": "white",
            "indexLabelPlacement": "inside",
            "indexLabel": D[i]["text"]}]}
        else:
             d =  {
            "type": "stackedBar100",
            "name": D[i]["text"],
            "dataPoints": [{ "label": prefecture[p_idx], "y": D[i]["value"], "x": p_idx , "color": color[p_idx][-i-1],
            "indexLabelFontColor": "black",
            "indexLabelPlacement": "inside",
            "indexLabel": D[i]["text"]}]}

        Data.append(d)
    
    """
    path_w = "../json_data/02_tohoku_" + prefecture[p_idx] +".json"
    with open(path_w, mode='a', encoding='utf-8') as f:
        f.write(json.dumps(D, sort_keys=False, ensure_ascii=False, indent=4))
    """

    print(prefecture[p_idx], " fin")

path_w = "../json_data/sample.json"
with open(path_w, mode='a', encoding='utf-8') as f:
    f.write(json.dumps(Data, sort_keys=False, ensure_ascii=False, indent=4))
    