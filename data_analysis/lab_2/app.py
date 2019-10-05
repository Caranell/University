import os
import csv
import pandas as pd
import xml.etree.ElementTree as ET

#tree = ET.parse('OBV_full.xml')
tree = ET.parse('OBV_test.xml')

document_root = tree.getroot().find('vacancies')
vacancies = document_root.findall('vacancy')

if os.path.exists('vacancies_data.csv'):
    os.remove('vacancies_data.csv')
df = pd.DataFrame()

vacancies_length = len(vacancies)
i = 0

for vacancy in vacancies:
    print(str(i)+" of "+str(vacancies_length))
    dict = {}
    for item in vacancy.getchildren():
        if len(vacancy.find(item.tag).getchildren()) == 0:  # check if item has child tags
            if vacancy.find(item.tag).text is None:
                dict[item.tag] = "-"
            else:
                dict[item.tag] = vacancy.find(item.tag).text.replace(',', '|')
        else:
            for second_level_child in item:  # looping through second-level tags
                if not len(second_level_child.getchildren()) == 0:
                    text = ""
                    for third_level_child in second_level_child:  # looping through third-level tags
                        child_text = second_level_child.tag + ":" + third_level_child.text + '\n'
                        text += child_text
                    dict[second_level_child.tag] = text.replace(',', '|')
                elif second_level_child.text is None:
                    dict[second_level_child.tag] = "-"
                else:
                    dict[second_level_child.tag] = second_level_child.text.replace(
                        ',', '|')
    salary = dict['salary']
    if not salary == '-':
        salary = salary.split(' ')
        dict['salary_from'] = salary[1]
        if len(salary) > 2:
            dict['salary_to'] = salary[3]
        else:
            dict['salary_to'] = "-"
    else:
        dict['salary_from'] = "0"
        dict['salary_to'] = "0"
    del dict['salary']
    df = df.append(dict, ignore_index=True)
    i += 1
df.to_csv("vacancies_data.csv", index=False, encoding='utf-8')
