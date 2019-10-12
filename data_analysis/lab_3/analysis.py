from datetime import datetime
import json
import pandas as pd


def split_on_groups(df):
    max_value = df['max-salary'].max()
    min_value = df['max-salary'].min()
    step = (max_value - min_value) / 9
    df_groups = []
    group_min_value = 0
    for i in range(8):
        group_max_value = min_value + step * i
        group = df.loc[(df['max-salary'] <= group_max_value) &
                       (df['min-salary'] > group_min_value)]
        group.alternateName = str(group_min_value) + \
            '---' + str(group_max_value)
        df_groups.append(group)
        group_min_value = group_max_value
    nan_group = df[df['max-salary'].isnull()]
    nan_group.alternateName = 'nan-group'
    last_group = df.loc[(df['max-salary'] > group_max_value)]
    last_group.alternateName = str(group_max_value) + '+++'
    df_groups.append(nan_group)
    df_groups.append(last_group)
    return df_groups


def work_with_skills(group):
    skills_dict = {}
    for skill in group['key_skills'].values:
        if type(skill) == str:
            skills_list = skill.split('|')
            skills_list = skills_list[1:]
            for item in skills_list:
                item = item.strip()
                if item not in skills_dict:
                    skills_dict[item] = 1
                else:
                    skills_dict[item] += 1
    return skills_dict


def work_with_dates(group):
    dates = pd.to_datetime(group['date'])
    now = datetime.today().replace(tzinfo=None)
    mean = now - dates.mean().replace(tzinfo=None)
    max_value = now - dates.min().replace(tzinfo=None)
    min_value = now - dates.max().replace(tzinfo=None)
    return (str(min_value), str(mean), str(max_value))


def analyse_group(df_group, idx, task_num):
    print(df_group.alternateName)
    if idx == 6:
        print(df_group)
    file = open('CSVs/task' + task_num +
                str(df_group.alternateName.replace('.', 'X'))+'.txt', 'a+')
    file.write(df_group.groupby('name').size().to_string()+'\n\n')  # a
    file.write('|'.join(work_with_dates(df_group))+'\n\n')  # b
    file.write(df_group.groupby(
        'experience').size().to_string()+'\n\n')  # c
    file.write(df_group.groupby(
        'employment-form').size().to_string()+'\n\n')  # d
    file.write(df_group.groupby(
        'employment-schedule').size().to_string()+'\n\n')  # e
    file.write(json.dumps(work_with_skills(
        df_group), ensure_ascii=False)+'\n\n')  # f
    file.close()


df = pd.read_csv('./CSVs/vacancies_data.csv')
df = df.sort_values(by=['min-salary', 'max-salary'])
groups = split_on_groups(df)
for i in range(len(groups)):
    analyse_group(groups[i], i, '1')
