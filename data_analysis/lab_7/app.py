import plotly.graph_objects as go
import plotly.express as exp
import pandas as pd
from wordcloud import WordCloud
import plotly.express as px
from collections import Counter
from numpy import percentile
from sklearn import svm
import matplotlib.pyplot as plt


def print_word_cloud(text):
    wc = WordCloud(background_color='white', width=1000, height=800)
    wc.generate_from_frequencies(text)
    plt.imshow(wc)
    plt.axis('off')
    plt.show()


def count_skills_frequency(df):
    skills_series = df['key_skills']
    skills_str = skills_series.str.cat(sep='|').lower()
    skills_list = list(filter(None, skills_str.split('|')))
    freq = Counter()
    for skill in skills_list:
        freq[skill] += 1
    # all_skills = df.key_skills.apply(
    #     lambda x: [val.lower() for val in x.split("|")])
    # for row in all_skills:
    #     for item in row:
    #         freq[item] += 1
    return freq


def get_outliers(df):
    print_outliers(df)
    clf = svm.OneClassSVM(nu=0.1, kernel="rbf", gamma=0.1)
    clf.fit(df)
    y_pred_train = clf.predict(df)
    return [i for i, elem in enumerate(y_pred_train.tolist()) if elem == -1]

def print_outliers(df):
    fig = px.box(df, y="max-salary", notched=True)
    fig.show()
    fig = px.box(df, y="min-salary", notched=True)
    fig.show()

def replace_outliers(df, field):
    data = df[field]
    perc_25 = percentile(data, 25)
    perc_75 = percentile(data, 75)
    cut_off = (perc_75 - perc_25) * 1.5
    low_bound = perc_25 - cut_off
    high_bound = perc_75 + cut_off
    outliers = [x for x in data if x < low_bound or x > high_bound]
    df[field] = df[field].apply(lambda x: (low_bound if low_bound > x else high_bound) if x in outliers else x)
    return df


def part_1(data):
    fig = go.Figure(data=go.Heatmap(
        z=data.values,
        x=data.keys(),
        y=data.keys()))
    fig.show()
    modified_data = data.unstack()
    attr = modified_data.sort_values(ascending=False).to_frame()
    attr.reset_index(inplace=True)
    attr.columns = ['first_attribute', 'second_attribute', 'correlation']
    print(attr)
    attr = attr.loc[attr.first_attribute != attr.second_attribute][0:10:2]
    print(attr)
    attr = attr.sort_values(by='first_attribute')
    fig = exp.line(attr, x='first_attribute',
                   y='correlation', text='second_attribute')
    fig.show()
    fig = exp.histogram(attr, x='first_attribute',
                        y='correlation', histfunc='max')
    fig.show()
    fig = exp.scatter_matrix(attr, color='second_attribute')
    fig.show()
    print_word_cloud(skills)


def part_2(data):
    outliers = get_outliers(data)
    df_field = replace_outliers(data, 'max-salary')
    df_field = replace_outliers(df_field, 'min-salary')
    outliers2 = get_outliers(df_field)
    rem_obj = [val1 for val1, val2 in zip(outliers, outliers2) if val1 == val2]
    data.drop(data.index[[rem_obj]]).to_csv('output_without_outliers.csv')


df = pd.read_csv('output.csv')
skills = count_skills_frequency(df)
df = df.drop(
    ['responsibilities', 'requirements',  'description', 'name', 'city', 'min-salary', 'max-salary', 'company-name',
     'max-experience', 'min-experience', 'key_skills', 'min-salary-group', 'max-salary-group',
     #   'city: Москва', 'city: Новосибирск', 'city: Казань', 'city: Санкт-Петербург', 'city: Екатеринбург'
     ], axis=1)
correlation = df.corr().abs()
part_1(correlation)

df = pd.read_csv('output.csv')[['min-salary', 'max-salary']].dropna(axis=0)
part_2(df)
