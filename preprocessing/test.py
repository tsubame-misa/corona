import MeCab
import json
import mojimoji
import neologdn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import random
import numpy as np
import re

#m = MeCab.Tagger("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd -Owakati")
m = MeCab.Tagger("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd -Ochasen")
file_name = ["../json_data/01_hokkaido.json"]#,"../json_data/02_touhoku.json","../json_data/03_kanto.json","../json_data/04_tyubu.json", "../json_data/05_kansai.json", "../json_data/06_tyugoku.json","../json_data/07_shikoku.json","../json_data/08_kyushu.json"]
#file_name = ["../json_data/02_touhoku.json"]
#file_name = ["../json_data/08_kyushu.json"]

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
    for i in range(len(json_load)):
        text = json_load[i]["目的"]
        w = []
        if text!=None:
            text = normalize_text(text)
            for c in m.parse(text).splitlines()[:-1]:
                surface = c.split("\t")
                pos = surface[3].split('-')
                if pos[0] == '名詞':
                    w.append(surface[0])
            w = rm_num(w) 
            word.append(" ".join(w))
            """
            text = m.parse(text)
            text = rm_num(text)
            #m_text = text.split()
            #print(text)
            nouns = [line for line in text.split("\n")]
            print(nouns)
            word.append(text)
            """

print(len(word))            
vectorizer = CountVectorizer()
docs = np.array(word)
X = vectorizer.fit_transform(docs)
features = vectorizer.get_feature_names()

# tf-idf
tfidf = TfidfTransformer(use_idf=True, norm='l2', smooth_idf=True)
np.set_printoptions(precision=2)
tf_idf = tfidf.fit_transform(X)
tf_idf_array = tf_idf.toarray()

#tf_idfが0.6以上の単語のfeaturesでのindexを取得
words_idx=[]
count = 0
print(len(tf_idf_array[0]))
for i in range(len(tf_idf_array)):
    for j in range(len(tf_idf_array[0])):
        a = tf_idf_array[i][j]
        if a >= 0.6:
            words_idx.append(j)
            count += 1
print(count)
words_idx = list(set(words_idx))
print(len(words_idx))

#wordsの出現回数を調べる
Data = []
matrix = []
for i, bow in enumerate(X.toarray()):
    Data.append({"word":word[i], "bow":bow})

Count = []
print(len(words_idx))
for i in range(len(words_idx)):
    c = 0
    for j in range(len(Data)):
        c += Data[j]["bow"][words_idx[i]]
    Count.append([features[i], c])
#a = sorted(Count, key=lambda x: x[1], reverse=True)


D = []
for t, c in Count:
    d ={"text":t, "value":int(c)}
    D.append(d)
print(D)
D = sorted(D, key=lambda x:x["value"], reverse=True)

if len(D) >= 300:
    D = D[:300]
print(len(D))

path_w = "../json_data/01_data_hokkaido.json"
with open(path_w, mode='a', encoding='utf-8') as f:
    f.write(json.dumps(D, sort_keys=False, ensure_ascii=False, indent=4))