import pandas as pd
from collections import Counter
import numpy as np

df = pd.read_csv('vacancies_data_updated.csv')


def range_split_salary(df, field):
	salary = df[field]
	max_value = int(salary.max() + 1)
	min_value = int(salary.min())
	bins = pd.cut(
		salary, list(range(min_value, max_value,
						   (max_value - min_value) // (10))),
		right=False
	)
	cols = pd.crosstab(df.index, bins)
	for name in cols:
		df[f"{field}: {name}"] = cols[name]


def dummy_code_categories(df, field):
	cols = pd.crosstab(df.index, df[field])
	for name in cols:
		df[f"{field}: {name}"] = cols[name]


def fill_dummy_skill(df, skill):
	df[skill] = df['key_skills'].apply(
		lambda x: (1 if skill in x.lower() else 0)
	)
	return df[skill]


def dummy_code_skills(df):
	skills_series = df['key_skills']
	skills_str = skills_series.str.cat(sep='|').lower()
	skills_list = list(filter(None, skills_str.split('|')))
	counter = Counter(skills_list)
	most_common = counter.most_common(10)
	most_common_list = [x for x, _ in most_common]
	other = [x for x, _ in counter.most_common()]
	other_list = other[10:] if len(other) > 10 else []
	for skill in most_common_list:
		df[skill] = fill_dummy_skill(df, skill)
	for skill in other_list:
		df['other'] = df['key_skills'].apply(
			lambda x: (1 if skill not in x else 0)
		)
	return df


def vacancy_groups(df):
	groups = ['автор', 'project', 'агент', 'продавец', 'инженер', 'техник', 'менеджер', 'оператор', 'аналитик', 'монтажник', 'преподаватель', 'консультант', '1с', 'java', 'js', 'python',
			  'баз данных', '.net', 'с++', 'sap', 'поддержки', 'администратор', 'web', 'ios', 'android', 'разработчик']
	for _, group in enumerate(groups):
		name_group = df[(df['name'].str.contains(group, na=False, regex=False))]
		name_group = dummy_code_skills(name_group)
		df = df[~df['name'].str.contains(group, na=False, regex=False)]
		name_group.to_csv('groups/'+group+'.csv', index=False, encoding='utf-8')
	other = dummy_code_skills(df)
	other.to_csv('groups/other.csv', index=False, encoding='utf-8')


df['key_skills'].fillna('', inplace=True)
df['days_from_publish'] = (df['days_from_publish']-df['days_from_publish'].min()) / \
	(df['days_from_publish'].max()-df['days_from_publish'].min())
range_split_salary(df, "min-salary")
range_split_salary(df, "max-salary")

# remove all tags from text
df['description'] = df['description'].str.replace('</?p>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?b>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?em>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?strong>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?div.*>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?ul>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?ol>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?li>', ' ', regex=True)
df['description'] = df['description'].str.replace(r'<br\s?/?>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?span>', ' ', regex=True)

categories = ['city', 'experience', 'employment-form', 'employment-schedule']
for field in categories:
	dummy_code_categories(df, field)
vacancy_groups(df)

# name_groups = [x for _, x in df.groupby('name')]
# for name_group in name_groups:
# 	dummy_code_skills(name_group['skills'])


df.to_csv('test.csv',  index=False, encoding='utf-8')
