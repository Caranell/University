# group by
# split " ", "-"
# overlap developer-программист-разработчик
# delete junior/senior/
import csv
import pandas as pd

df = pd.read_csv("vacancies_data.csv")

#name_groups = [x for _, x in df.groupby("name")]
#names = [_ for _, x in df.groupby("name")]
df['name'] = df['name'].str.lower().replace('программист', 'разработчик', regex=True).replace("[()-/]", " ", regex=True).replace("junior", " ", regex=True).replace("веб", "web", regex=True).replace("angular", " ", regex=True).replace("react", " ", regex=True).replace("vue", " ", regex=True).replace("middle", " ", regex=True).replace("senior",
                                                                                                                                                                                                      " ", regex=True).replace("программист", "разработчик", regex=True).replace("developer", "разработчик", regex=True).replace("\s+", " ", regex=True).replace('c', 'с', regex=True).replace('монтажник.*', 'монтажник', regex=True).str.strip()
# print(df.name)
# for name in df.name:
#     print(name)
# print(df['name'])
# df["name"] = df["name"].str.lower().replace("-", " ").replace("(", " ").replace(")", " ").replace("junior", " ").replace("middle", " ").replace("senior",
#                                                                                                                                                " ").replace("программист", "разработчик").replace("developer", "разработчик").replace("\s+", " ", regex=True)
# print(df.name.unique())
i = 0
for _, x in df.groupby("name"):
    print('--'+_+'--')
    i += 1
print(i)
