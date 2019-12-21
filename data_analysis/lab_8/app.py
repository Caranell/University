import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.metrics import pairwise_distances_argmin_min
from collections import Counter

from sklearn.cluster import KMeans
from sklearn import datasets


def find_nearest_centers(df, center):
	closest, _ = pairwise_distances_argmin_min(
		center, df[["min-salary", "max-salary"]])
	df_centers = df.loc[closest, :]
	return df_centers


def print_center(center_df):
	min_salary = center_df['min-salary']
	max_salary = center_df['max-salary']
	info_center = "Центр класстера:\n"
	info_center += f"Мин. Зарплата - {min_salary}\n"
	info_center += (f"Макс. Зарплата - {max_salary}")
	print(info_center)

	# most_common_list = [x for x, _ in most_common]


def find_most_common_values(series, count_column=5):
	str = series.str.cat(sep='|').lower()
	values_list = list(filter(None, str.split('|')))
	counter = Counter(values_list)
	most_common = counter.most_common(count_column)
	return most_common


def print_classter(df, center_df):
	print_center(center_df)
	count_objects = df.shape[0]
	print(f"Кол-во объектов в класстере: {count_objects}")

	most_common_skills = find_most_common_values(df["skills"])
	print(f"Топ 5 ключевых навыков: {most_common_skills}")

	most_common_city = find_most_common_values(df["city"], 3)
	list = [x for x, _ in most_common_city]
	print(f"Топ 3 городов: {list}")

	mean_max_salary = round(df["max-salary"].mean())
	mean_min_salary = round(df["min-salary"].mean())
	print(
		f"Средняя ЗП: минимальная: {mean_min_salary}; максимальная: {mean_max_salary}")

	work_schedules = df["work_schedule"].unique()
	print(f"Графики работ: {work_schedules}")

	print("-----------------------")


def print_grouped_vacancy(df):
	count_objects = df.shape[0]
	print(f"Всего объектов: {count_objects}")
	intersected_df = pd.merge(orig_df, df, how='inner')
	str = intersected_df["group"].str.cat(sep='|').lower()
	values_list = list(filter(None, str.split('|')))
	counter = Counter(values_list)
	info = ""
	for values, count in counter.items():
		info += f"Класс {values} - {count}\n"
	print(info)


count_classters = 13
df = pd.read_csv("output.csv")
orig_df = pd.read_csv("output.csv")
df = df.drop(columns=['key_skills', 'description', 'company-name', 'employment-form',
					  'employment-schedule', 'experience', 'name', 'requirements', 'responsibilities', 'date', 'city', 'group'])
# df[["max-salary", "min-salary"]].head()
df[["min-salary", "max-salary"]].dropna(inplace=True)
df.dropna(inplace=True)

# df[["max-salary", "min-salary"]].head()
df[["min-salary", "max-salary"]].dropna()
plt.scatter(df["min-salary"], df["max-salary"])
plt.show()


model = KMeans(count_classters)
model.fit(df[["min-salary", "max-salary"]])
df["labels_salary"] = model.labels_
list_classters = []
for i in range(count_classters):
	one_classter = df.loc[df["labels_salary"] == i]
	list_classters.append(one_classter)
list_classters = sorted(list_classters, key=lambda x: x.shape[0], reverse = True)
for i in range(len(list_classters)):
	# print(f"Класстер {i}")
	# one_classter = df.loc[df["labels_salary"] == i]
	classter = list_classters[i]
	df_centers = find_nearest_centers(df, model.cluster_centers_)

	if (i<3):
		print(f"Класстер {i}")
		print_grouped_vacancy(classter)
	# print_classter(one_classter, df_centers.iloc[i])
	# print_grouped_vacancy(classter)
	# print(df_centers.head())


plt.scatter(df["min-salary"], df["max-salary"], c=model.labels_)
plt.show()
