import requests
import json

search_url = 'https://api.hh.ru/vacancies?specialization=1&per_page=100&area=1342&page='
result = []

for i in range(5):
    response = requests.get(search_url+str(i))
    data = response.json()
    result.extend(data['items'])
with open('data_analysis/lab_3/data.json', 'w', encoding='utf-8') as json_file:
    json.dump(result, json_file, ensure_ascii=False)
