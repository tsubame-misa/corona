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
from sklearn.datasets import load_wine
from sklearn.manifold import MDS
import matplotlib.pyplot as plt

#m = MeCab.Tagger("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd -Owakati")
m = MeCab.Tagger("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd -Ochasen")
#file_name = ["../json_data/01_hokkaido.json","../json_data/02_touhoku.json","../json_data/03_kanto.json","../json_data/04_tyubu.json", "../json_data/05_kansai.json", "../json_data/06_tyugoku.json","../json_data/07_shikoku.json","../json_data/08_kyushu.json"]
#file_name = ["../json_data/03_kanto.json"]
file_name = ["../json_data/03_kanto.json"]
word_list = []


def mds_calc(data):
    mds = MDS(
        n_components=2,
        metric=True,
        dissimilarity='euclidean'
    )
    mds = MDS(n_components=2,metric=True,dissimilarity='euclidean')
    print(len(data), len(data[0]))
    X = mds.fit_transform(data)
    print(X)
    plt.scatter(X[:,0],X[:,1])
    plt.show()
    return X

def normalize_text(text):
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
    rm_idx = []
    for i in range(len(text)):
        number = re.findall('1|2|3|4|5|6|7|8|9|0', text[i])
        if len(number)> 0:
            rm_idx.append(i)
    if len(rm_idx)!=0:
        for i in sorted(rm_idx, reverse=True):
            text.pop(i)
    return(text)

def my_index2(l, x, default=False):
    return l.index(x) if x in l else default





word = []
for name in file_name:
    json_open = open(name, "r", encoding="utf8")
    json_load = json.load(json_open)
    prefecture = list(set([f.get("県名") for f in json_load]))
    #city = list(set([f.get("市町村名") for f in json_load]))
    #city =  ["横浜市","川崎市","相模原市","横須賀市","平塚市","鎌倉市","藤沢市","小田原市","茅ヶ崎市","逗子市","三浦市","秦野市","厚木市","大和市","伊勢原市","海老名市","座間市","南足柄市","綾瀬市","葉山町","寒川町","大磯町","二宮町","中井町","大井町","松田町","山北町","開成町","箱根町","真鶴町","湯河原町","愛川町","清川村"]
    city = ["千代田区","中央区","港区","新宿区","墨田区","文京区","台東区","江東区","品川区","目黒区","大田区","世田谷区","渋谷区","中野区","杉並区","豊島区","北区","荒川区","板橋区","足立区","葛飾区","江戸川区","八王子市","立川市","練馬区","武蔵野市","三鷹市","青梅市","府中市","昭島市","調布市","町田市","小金井市","小平市","日野市","東村山市","国分寺市","国立市","福生市","狛江市","東大和市","清瀬市","東久留米市","武蔵村山市","多摩市","稲城市","羽村市","あきる野市","西東京市","瑞穂町","日の出町","檜原村","奥多摩町","大島町","利島村","新島村","神津島村","三宅村","御蔵島村","八丈町","青ヶ島村","小笠原村"]
    word = [[] for i in range(len(prefecture))]
    word_c = [[] for i in range(len(city))]
    print(word, prefecture, len(prefecture))
    for i in range(len(json_load)):
        text = json_load[i]["目的"]
        p = json_load[i]["県名"]
        c_name = json_load[i]["市町村名"]
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
            for ww in w:
                word_c[city.index(c_name)].append(ww)
            """
            if p=="東京都" and c_name!=None:
                for ww in w:
                    word_c[city.index(c_name)].append(ww)


    print(name)

    Data = []
for p_idx in range(len(prefecture)):
    if prefecture[p_idx]!="東京都":
        continue
    print("tokyo!", prefecture[p_idx])

    tfidf = TfidfVectorizer()
    t_x = tfidf.fit_transform(word[p_idx])
    df_tfidf = t_x.toarray()

    wc = CountVectorizer()
    x = wc.fit_transform(word[p_idx])
    wcX = np.array(x.toarray())
    names = wc.get_feature_names()

    #Data = []
    D_pre = []
    for j in range(len(wcX[0])):
        count = 0
        p = False
        if not(names[j] in word_list):
            for i in range(len(wcX)):
                if df_tfidf[i][j] >= 0.5:
                    p = True
                if wcX[i][j] >= 0:
                    count += wcX[i][j]
            d ={"text":names[j], "value":int(count)}
        if p==True:
            D_pre.append(d)
        if j%1000==0:
            print(j)
   

    D_pre = sorted(D_pre,key=lambda x: x["value"], reverse=True)
    key_word = [d.get("text") for d in D_pre]
    if len(key_word) > 100:
        key_word[:100]
    
    ##########
    
    Datas = [[0]*len(key_word) for i in range(len(city))]
    for c_idx in range(len(city)):
        for c_name in word_c[c_idx]:
            #print(city[c_idx], c_name)
            #k_idx = key_word.index(c_name)
            k_idx = my_index2(key_word, c_name)
            #print(k_idx)
            if k_idx!=False:
                Datas[c_idx][k_idx] += 1

    mds = mds_calc(Datas)
    D = []
    for m in range(len(mds)):
        d ={"x":mds[m][0], "y":mds[m][1], "label":city[m]}
        D.append(d)
    print(D)
    
   
    """
            
    D_pre = []
    for j in range(len(wcX[0])):
        count = 0
        p = False
        if not(names[j] in word_list):
            for i in range(len(wcX)):
                if df_tfidf[i][j] >= 0.5:
                    p = True
                if wcX[i][j] >= 0:
                    count += wcX[i][j]
            d ={"text":names[j], "value":int(count)}
        if p==True:
            D_pre.append(d)
        if j%1000==0:
            print(j)

    D_pre = sorted(D_pre,key=lambda 
    """
   
"""
path_w = "../json_data/sample.json"
with open(path_w, mode='a', encoding='utf-8') as f:
    f.write(json.dumps(Data, sort_keys=False, ensure_ascii=False, indent=4))
"""

"""
wine = load_wine()
print(wine.data)
print(wine.feature_names)
print(len(wine.feature_names))
print(len(wine.data[0]))
"""
