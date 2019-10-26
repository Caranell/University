import pandas as pd

df = pd.read_csv('vacancies_data_updated.csv')


def conversion_salary_to_one_hot(df, field_name, cnt_group):
    series = df[field_name]
    _max = int(series.max() + 1)
    print(_max)
    _min = int(series.min())
    print(_min)
    bins = pd.cut(
        series, list(range(_min, _max, (_max - _min) // (cnt_group - 1))),
        right=False
    )
    cols = pd.crosstab(df.index, bins)
    for name in cols:
        df[f"{field_name}: {name}"] = cols[name]


def conversion_categories_to_one_hot(data_frame, field_name):
    cols = pd.crosstab(data_frame.index, data_frame[field_name])
    for name in cols:
        data_frame[f"{field_name}: {name}"] = cols[name]


df['days_from_publish'] = (df['days_from_publish']-df['days_from_publish'].min()) / \
    (df['days_from_publish'].max()-df['days_from_publish'].min())
conversion_salary_to_one_hot(df, "min-salary", 7)
conversion_salary_to_one_hot(df, "max-salary", 6)
df['description'] = df['description'].str.replace('</?p>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?b>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?em>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?strong>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?div.*>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?ul>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?ol>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?li>', ' ', regex=True)
df['description'] = df['description'].str.replace('<br\s?/?>', ' ', regex=True)
df['description'] = df['description'].str.replace('</?span>', ' ', regex=True)
for field in ('city', 'experience', 'employment-form', 'employment-schedule'):
    conversion_categories_to_one_hot(df, field)


df.to_csv('test.csv',  index=False, encoding='utf-8')
