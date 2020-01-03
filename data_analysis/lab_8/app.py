import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.metrics import pairwise_distances_argmin_min
from collections import Counter

from sklearn.cluster import KMeans
from sklearn.cluster import MeanShift

from sklearn import datasets


def find_nearest_centers(df, df_fit, center):
    closest, _ = pairwise_distances_argmin_min(center, df_fit)
    df_centers = df.iloc[closest, :]
    return df_centers


def get_center_info(center_df):
    min_salary = center_df['min-salary']
    max_salary = center_df['max-salary']
    vacancy = center_df['group']
    info_center = 'Центр класстера:\n'
    info_center += f'Мин. Зарплата - {min_salary}\n'
    info_center += (f'Макс. Зарплата - {max_salary}\n')
    info_center += f'Вакансия: {vacancy}\n'
    return (info_center)


def find_most_common_values(series, count_column=5):
    str = series.str.cat(sep='|').lower()
    vacancies_list = list(filter(None, str.split('|')))
    counter = Counter(vacancies_list)
    most_common = counter.most_common(count_column)
    return most_common


def get_cluster_info(df, center_df):
    cluster_info = ''
    cluster_info += get_center_info(center_df)
    count_objects = df.shape[0]
    cluster_info += f'Кол-во объектов в класстере: {count_objects}\n'

    most_common_skills = find_most_common_values(df['key_skills'])
    cluster_info += f'Топ 5 ключевых навыков: {most_common_skills}\n'

    most_common_city = find_most_common_values(df['city'], 3)
    list = [x for x, _ in most_common_city]
    cluster_info += f'Топ 3 городов: {list}\n'

    max_salary_mean = round(df['max-salary'].mean())
    min_salary_mean = round(df['min-salary'].mean())
    cluster_info += f'Средняя ЗП: минимальная: {min_salary_mean}; максимальная: {max_salary_mean}\n'

    schedules = df['employment-schedule'].unique()
    cluster_info += f'Графики работ: {schedules}\n'

    cluster_info += '\n\n\n\n'
    return cluster_info


def get_grouped_vacancy(df):
    count_objects = df.shape[0]
    vacancy_info = f'Всего объектов: {count_objects}\n'
    str = df['group'].str.cat(sep='|').lower()
    vacancies_list = list(filter(None, str.split('|')))
    counter = Counter(vacancies_list)
    for value, count in counter.items():
        vacancy_info += f'Класс {value} - {count}\n'
    return vacancy_info


df = pd.read_csv('output.csv')
df.dropna(inplace=True)

models = [{'name': 'K-means', 'model': KMeans(6)},
          {'name': 'MeanShift', 'model': MeanShift()}]

for item in models:
    model_name = item['name']
    model = item['model']
    fit_df = current_df = df
    fit_df = fit_df.drop(columns=['key_skills', 'description', 'company-name', 'employment-form',
                                  'employment-schedule', 'experience', 'name', 'requirements', 'responsibilities', 'date', 'city', 'group', 'max-experience', 'min-experience'])
    model.fit(fit_df)

    current_df['labels_salary'] = model.labels_
    clusters = []
    
    for i in range(len(np.unique(model.labels_))):
        current_cluster = current_df.loc[current_df['labels_salary'] == i]
        clusters.append(current_cluster)

    clusters = sorted(
        clusters, key=lambda x: x.shape[0], reverse=True)

    model_info = f'Модель {model_name}\n'

    for i in range(len(clusters)):
        cluster = clusters[i]
        df_centers = find_nearest_centers(
            current_df, fit_df, model.cluster_centers_)
        
        model_info += f'Кластер {str(i)}\n'
        model_info += get_cluster_info(cluster, df_centers.iloc[i])

    file = open(f'Результат {model_name}', 'w', encoding='utf-8')
    file.write(model_info)
    file.close()

    for i in range(len(clusters)):
        cluster = clusters[i]
        if (i < 3):
            cluster_vacancy_info = get_grouped_vacancy(cluster)
            file = open(f'{model_name} кластер {i+1}', 'w', encoding='utf-8')
            file.write(cluster_vacancy_info)
            file.close()
    plt.scatter(current_df['min-salary'], current_df['max-salary'])
    plt.show()
    plt.scatter(current_df['min-salary'],
                current_df['max-salary'], c=model.labels_)
    plt.show()
