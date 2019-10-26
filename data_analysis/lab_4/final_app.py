import pandas as pd
from datetime import datetime

df = pd.read_csv("vacancies_data.csv")

df['days_from_publish'] = [
    date.days for date in datetime.today().replace(tzinfo=None) - pd.to_datetime(df['date']).dt.tz_convert(None)]
df.to_csv('vacancies_data_updated.csv', index=False, encoding='utf-8')
# normalize strings
df['name'] = df['name'].str.lower().replace('[-,/]', ' ', regex=True).replace('\(.*\)',
                                                                              '', regex=True).replace('c', 'с', regex=True)
df['name'] = df['name'].str.replace(
    'педагог.*|преподаватель.*|учитель.*', 'преподаватель', regex=True)
df['name'] = df['name'].str.replace('программист|developer', ' разработчик ',
                                    regex=True).replace('веб', 'web', regex=True)
df['name'] = df['name'].str.replace('1\s?с', '1с', regex=True)
df['name'] = df['name'].str.replace(
    '.*web.*|.*full\s?staсk.*|.*baсkend.*|.*frontend.*', 'web', regex=True)

df['name'] = df['name'].str.strip().replace('\s+', ' ', regex=True)
df['name'] = df['name'].str.replace(
    'devops', 'администратор', regex=True)
df['name'] = df['name'].str.replace(
    'c#', '\.net', regex=True)
df['name'] = df['name'].str.replace(
    'бд', 'баз данных', regex=True)
df['name'] = df['name'].str.strip().replace('\s+', ' ', regex=True)

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


original_df = []
for idx, group in enumerate(groups):
    name_group = df[(df['name'].str.contains(group, na=False, regex=False))]
    name_group = fill_avg_town_salary(name_group)
    original_df.append(name_group)
    df = df[~df['name'].str.contains(group, na=False, regex=False)]
    name_group.to_csv('groups/'+group+'.csv', index=False, encoding='utf-8')

other = fill_avg_town_salary(df)
other.to_csv('groups/other.csv', index=False, encoding='utf-8')
df = other
#original_df.dropna(subset=['city'], inplace=True)

#df.to_csv('test.csv', index=False, encoding='utf-8')
#original_df.to_csv('test1.csv', index=False, encoding='utf-8')

df.append(original_df,).to_csv(
    'vacancies_data_updated.csv', index=False, encoding='utf-8')
# pd.concat([original_df, df], ignore_index=False).drop_duplicates(['name', 'description'], keep='last').to_csv(
#    'vacancies_data_updated.csv', index=False, encoding='utf-8')
