import requests
import json
# msc spb ekb nsk kazan'
areas = ['1', '2', '3', '4', '88']
search_url = 'https://api.hh.ru/vacancies?specialization=1&per_page=100&area='
result = []

for area in areas:
    for i in range(15):
        response = requests.get(search_url+area+'&page='+str(i))
        print('area '+area+'; page '+str(i))
        data = response.json()
        result.extend(data['items'])

with open('data.json', 'w', encoding='utf-8') as json_file:
    json.dump(result, json_file, ensure_ascii=False)
