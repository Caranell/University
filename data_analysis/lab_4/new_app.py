import pandas as pd
from datetime import datetime

df = pd.read_csv("vacancies_data.csv")
# dates = pd.to_datetime(df['date'])
# now = datetime.today().replace(tzinfo=None)

df['days_from_publish'] = [
    date.days for date in datetime.today().replace(tzinfo=None) - pd.to_datetime(df['date']).dt.tz_convert(None)]
df.to_csv('vacancies_data_updated.csv', index=False, encoding='utf-8')
# normalize strings
df['name'] = df['name'].str.lower().replace('[-,/]', ' ', regex=True).replace('\(.*\)',
                                                                              '', regex=True).replace('c', 'с', regex=True)
# remove

############

# names = names.str.replace('(.*)г\..*', '\g<1>', regex=True)
# names = names.str.replace('автор.*', 'автор', regex=True)
# names = names.str.replace('агент.*', 'агент', regex=True)
# names = names.str.replace('продавец.*', 'продавец', regex=True)
# names = names.str.replace(
#     'серверный|сервис|сервисный|сетевой', 'системный', regex=True)
# names = names.str.replace('инженер.*', 'инженер', regex=True)
# names = names.str.replace('техник.*', 'техник', regex=True)
# names = names.str.replace('.*менеджер.*', 'менеджер', regex=True)
# names = names.str.replace('оператор.*', 'оператор', regex=True)
# names = names.str.replace('монтажник.*', 'монтажник', regex=True)
# names = names.str.replace('.*аналитик.*', 'аналитик', regex=True)
# names = names.str.replace(
#     'руководитель.*|начальник.*|главный.*|ведущий.*', 'руководитель', regex=True)
df['name'] = df['name'].str.replace(
    'педагог.*|преподаватель.*|учитель.*', 'преподаватель', regex=True)
# names = names.str.replace('\[.*\]', '', regex=True)
# names = names.str.replace('(.*)(\s\d?\s)категории.*', '\g<1>', regex=True)
df['name'] = df['name'].str.replace('программист|developer', ' разработчик ',
                                    regex=True).replace('веб', 'web', regex=True)
# names = names.str.replace(
#     'стажер|младший|junior|middle|senior|старший|software', '', regex=True)
df['name'] = df['name'].str.replace('1\s?с', '1с', regex=True)
# names = names.str.replace('(.*)\sразработчик', 'разработчик \g<1>', regex=True)
df['name'] = df['name'].str.replace(
    '.*web.*|.*full\s?staсk.*|.*baсkend.*|.*frontend.*', 'web', regex=True)

df['name'] = df['name'].str.strip().replace('\s+', ' ', regex=True)
df['name'] = df['name'].str.replace(
    'devops', 'администратор', regex=True)
df['name'] = df['name'].str.replace(
    'c#', '\.net', regex=True)
df['name'] = df['name'].str.replace(
    'бд', 'баз данных', regex=True)

############

# путь 1 - сделать 50 replace'ов - некрасиво но действенно
# путь 2 - сделать 15-20 групп руками (backend|back-end,...), потом df.loc пройтись по соответствиям
# создать массив групп
# for group in groups:
#     df.loc[name in group]
groups = ['автор', 'агент', 'продавец', 'инженер', 'техник', 'менеджер', 'оператор', 'аналитик', 'монтажник', 'преподаватель', 'консультант', '1с', 'java', 'js', 'python',
          'баз данных', '.net', 'с++', 'sap', 'поддержки', 'администратор', 'web', 'ios', 'android', 'разработчик']


def fill_avg_town_salary(df_group):
    city_groups = [_ for _, x in df_group.groupby('city')]
    for group in city_groups:
        min_salary_mean = (df_group.loc[(df_group['city'] == group)])[
            'min-salary'].mean()
        max_salary_mean = (df_group.loc[(df_group['city'] == group)])[
            'max-salary'].mean()
        df_group['max-salary'].fillna(max_salary_mean, inplace=True)
        df_group['min-salary'].fillna(min_salary_mean, inplace=True)
    return df_group


original_df = df
#name_groups = []
for group in groups:
    name_group = df[(df['name'].str.contains(group, na=False, regex=False))]
    name_group = fill_avg_town_salary(name_group)
    df[(df['name'].str.contains(group, na=False, regex=False))
       ] = fill_avg_town_salary(name_group)
    #name_groups.append(name_group)
    df = df[~df['name'].str.contains(group, na=False, regex=False)]
    name_group.to_csv('groups/'+group+'.csv', index=False, encoding='utf-8')
other = fill_avg_town_salary(df)
other.to_csv('groups/other.csv', index=False, encoding='utf-8')
original_df.to_csv('vacancies_data_updated.csv', index=False, encoding='utf-8')
# i = 0
# file = open('test_d
# ata.txt', 'w+', encoding="utf-8")
# for _, x in df.groupby("name"):
#     file.write(_+'\n')
#     print('--'+_+'--')
#     i += 1
# print(i)
# file.close()
