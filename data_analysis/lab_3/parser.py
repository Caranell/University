import requests
import json
1
2
4
54
95
areas = ['1', '2', '4', '54', '95']
search_url = 'https://api.hh.ru/vacancies?specialization=1&per_page=100&area='
result = []

for area in areas:
	response = requests.get(search_url+area)
	data = response.json()
	result.extend(data['items'])
    
with open('data.json', 'w', encoding='utf-8') as json_file:
    json.dump(result, json_file, ensure_ascii=False)
