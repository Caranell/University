import pandas as pd

df = pd.read_csv("vacancies_data.csv")

# normalize strings
df['name'] = df['name'].str.lower().replace('[-,/]', ' ', regex=True).replace('\(.*\)',
                                                                             '', regex=True).replace('c', 'с', regex=True)
# remove
df['name'] = df['name'].str.replace('(.*)г\..*', '\g<1>', regex=True)
df['name'] = df['name'].str.replace('автор.*', 'автор', regex=True)
df['name'] = df['name'].str.replace('агент.*', 'агент', regex=True)
df['name'] = df['name'].str.replace('продавец.*', 'продавец', regex=True)
df['name'] = df['name'].str.replace('серверный|сервис|сервисный|сетевой', 'системный', regex=True)
df['name'] = df['name'].str.replace('инженер.*', 'инженер', regex=True)
df['name'] = df['name'].str.replace('техник.*', 'техник', regex=True)
df['name'] = df['name'].str.replace('.*менеджер.*', 'менеджер', regex=True)
df['name'] = df['name'].str.replace('оператор.*', 'оператор', regex=True)
df['name'] = df['name'].str.replace('монтажник.*', 'монтажник', regex=True)
df['name'] = df['name'].str.replace('.*аналитик.*', 'аналитик', regex=True)
df['name'] = df['name'].str.replace('руководитель.*|начальник.*|главный.*|ведущий.*', 'руководитель', regex=True)
df['name'] = df['name'].str.replace('педагог.*|преподаватель.*|учитель.*', 'преподаватель', regex=True)
df['name'] = df['name'].str.replace('\[.*\]', '', regex=True)
df['name'] = df['name'].str.replace('(.*)(\s\d?\s)категории.*', '\g<1>', regex=True)
df['name'] = df['name'].str.replace('программист|developer', 'разработчик', regex=True).replace('веб', 'web', regex=True)
df['name'] = df['name'].str.replace('стажер|младший|junior|middle|senior|старший', '', regex=True)
df['name'] = df['name'].str.replace('.*разработчик 1\s?с.*', 'разработчик 1с', regex=True)

df['name'] = df['name'].str.strip().replace('\s+', ' ', regex=True)
# путь 1 - сделать 50 replace'ов - некрасиво но действенно
# путь 2`
#

i = 0
file = open('test_data.txt', 'w+', encoding="utf-8")
for _, x in df.groupby("name"):
    file.write(_+'\n')
    
    print(type(x))
    print('--'+_+'--')
    i += 1
print(i)
file.close();
