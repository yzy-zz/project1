# -*- coding: utf-8 -*-
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
from gensim import corpora, models
import numpy as np
import sys
import json

# 求出每一个词出现的词频


def cipin(topicc):
    datafirst = []
    for i in range(0, len(topicc)):
        dataset = []
        dataset.append(topicc[i][1])
        datafirst.append(dataset)
    # print(datafirst[0][0][0])
    data = []
    for i in range(len(datafirst)):
        strr = ""
        datalast = []
        for j in range(len(datafirst[i][0])):
            if datafirst[i][0][j] >= '0' and datafirst[i][0][j] <= '9' or datafirst[i][0][j] == '.':
                strr += datafirst[i][0][j]
            if datafirst[i][0][j] == '*':
                datalast.append(float(strr))
                strr = ""
        data.append(datalast)
    # print(data)
    return data
# 求出每一个主题词


def wordd(topicc):
    datafirst = []
    for i in range(0, len(topicc)):
        dataset = []
        dataset.append(topicc[i][1])
        datafirst.append(dataset)
    # print(datafirst)
    datasett = []
    for i in range(0, len(datafirst)):
        count = 0
        flag = 0
        b = ""
        c = []
        for j in range(0, len(datafirst[i][0])):
            if datafirst[i][0][j] == '"':
                count += 1
                if count % 2 != 0:
                    flag = j+1
                if count % 2 == 0 and count != 0:
                    for z in range(flag, j):
                        b += datafirst[i][0][z]
                    c.append(b)
                    b = ""
        datasett.append(c)
    # print(datasett)
    return datasett


tex = ' '.join(sys.argv[1:])
# print(sys.argv)
textss = []
textss.append(tex)
# print(sys.argv[1])
# f = open('C:\\Users\\yzy\\Desktop\\project1\\src\\nodee\\eng.txt',
#          encoding='UTF-8').read()
# textss = sys.argv[1]
strr = ""
texts = []
for i in range(len(textss[0])):
    if textss[0][i] != '.':
        strr += textss[0][i]
    if textss[0][i] == '.':
        texts.append(strr)
        strr = ""
# print(len(texts))
tokenizer = RegexpTokenizer(r'\w+')
# 分词
word = []
for text in texts:
    raw_words = tokenizer.tokenize(text)
    word.append(raw_words)
# print(word)
# 词形归一化
wordnet_lematizer = WordNetLemmatizer()
data = []
for i in range(len(word)):
    words = []
    for raw_word in word[i]:
        words.append(wordnet_lematizer.lemmatize(raw_word))
    data.append(words)
# print(data)
# 去除停用词
datalast = []
stop = ['I', 'You', 'wa', 'We']
# print(list(set(stopwords.words('english'))))
list_stopwords = list(set(stopwords.words('english')))
for i in range(len(data)):
    filtered_words = []
    for w in data[i]:
        if w not in list_stopwords and w not in stop:
            filtered_words.append(w)
    datalast.append(filtered_words)
# print(datalast)
# print("you" in list_stopwords)
dictionary = corpora.Dictionary(datalast)
corpus = [dictionary.doc2bow(words) for words in datalast]
tfidf = models.TfidfModel(corpus)
corpusTfidf = tfidf[corpus]
lda = models.ldamodel.LdaModel(
    corpus=corpus, id2word=dictionary, num_topics=10, passes=100)
# print(lda)
# 主题推断
# for topic in lda.get_document_topics(corpus):
#     print(topic)

# 打印所有主题，每个主题显示n个词
topicc = []
for topic in lda.print_topics(num_words=20):
    # print(topic)
    topicc.append(topic)
# print(topicc)
pinlv = cipin(topicc)
wordss = wordd(topicc)
# print(wordss)
datatext = []
for i in range(2):
    dataa = {}
    dataa['pin'] = pinlv
    dataa['word'] = wordss
datatext.append(dataa)
print(datatext)
# with open('wordcloud.json', 'w', encoding='utf-8') as f:
#     f.write(json.dumps(datatext, ensure_ascii=False))


# print(u"脚本名：", sys.argv[0])
# for i in range(1, len(sys.argv)):  # 这里参数从1开始
#     print(u"参数", i, sys.argv[i])
#     print(i)
