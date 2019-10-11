import pandas as pd
import requests
import json

base_url = 'https://api.hh.ru/vacancies/'


def handleString(str):
    return str if str is not None else ''


def handleExperience(exp):
    exp_id = exp['id']
    if exp_id == 'noExperience':
        return ('', '')
    if exp_id == 'moreThan6':
        return (6, '')
    return (exp_id[7], exp_id[11])


with open('data.json', encoding='utf-8') as json_file:
    df = pd.DataFrame()
    data = json.load(json_file)
    j = 0
    amount = len(data)
    for vacancy in data:
        vacancy_data = requests.get(base_url + str(vacancy['id'])).json()
        dict = {}
        print(str(j)+'/' + str(amount))
        dict['name'] = handleString(vacancy_data['name'])
        dict['city'] = vacancy_data['area']['name']
        dict['min-salary'] = vacancy_data['salary']['from'] if vacancy_data['salary'] else ''
        dict['max-salary'] = vacancy_data['salary']['to'] if vacancy_data['salary'] else ''
        dict['company-name'] = handleString(vacancy_data['employer']['name'])
        dict['date'] = vacancy_data['published_at']
        dict['min-experience'] = handleExperience(
            vacancy_data['experience'])[0]
        dict['max-experience'] = handleExperience(
            vacancy_data['experience'])[1]
        dict['employment-form'] = vacancy_data['employment']['name']  # занятость
        dict['employment-schedule'] = vacancy_data['schedule']['name']
        dict['responsibilities'] = handleString(
            vacancy['snippet']['responsibility'])
        dict['requirements'] = handleString(vacancy['snippet']['requirement'])
        dict['description'] = handleString(vacancy_data['description'])
        skills = ''
        for i in range(len(vacancy_data['key_skills'])):
            skills += '|' + vacancy_data['key_skills'][i]['name']
        dict['key_skills'] = skills
        df = df.append(dict, ignore_index=True)
        j += 1
    df.to_csv('CSVs/vacancies_data.csv', index=False, encoding='utf-8')
