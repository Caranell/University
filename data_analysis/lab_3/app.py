import requests
import json


search_url = 'https://api.hh.ru/vacancies?specialization=1&per_page=100&area=1342&page='
test = []
for i in range(5):
    response = requests.get(search_url+str(i))
    data = response.json()
    test.extend(data['items'])
print(len(test))
