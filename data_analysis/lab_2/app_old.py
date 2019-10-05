import xml.etree.ElementTree as ET
import pandas as pd
import numpy as np
import csv

# parse xml
tree = ET.parse('OBV_full.xml')
# tree = ET.parse('OBV_test.xml')

# get root item
document_root = tree.getroot().find('vacancies')
vacancies = document_root.findall('vacancy')

vacancies_data = open('vacancies_data.csv', 'w', encoding="utf-8")
csvwriter = csv.writer(vacancies_data)


def parseSalary(salary):
	if salary == '':
		return ''
	else:
		salary = salary.split()
	if (len(salary) == 2):
		return salary[1]
	else:
		return (salary[1], salary[3])


def find_all_options():
	for vacancy in vacancies:
		longest_item = []
		current_item = []
		for tag_item in vacancy:
			csv_tag = tag_item.tag
			if (tag_item.tag == 'category'):
				current_item.append('category-industry')
			elif (tag_item.tag == 'salary'):
				current_item.append('salary-min')
				current_item.append('salary-max')
			elif (tag_item.tag == 'term'):
				current_item.append('term-text')
			elif (tag_item.tag == 'requirement'):
				req = tag_item
				for req_item in req:
					current_item.append(req.tag+"--"+req_item.tag)
			elif (tag_item.tag == 'addresses'):
				addr = tag_item[0]
				for addr_item in addr:
					current_item.append(addr.tag+"--"+addr_item.tag)
			elif (tag_item.tag == 'company'):
				comp = tag_item
				for comp_item in comp:
					current_item.append(comp.tag+"--"+comp_item.tag)
			else:
				current_item.append(csv_tag)
		if len(longest_item) < len(current_item):
			longest_item = current_item
	return longest_item


def fix_separators(str):
	return '' if str == '' else str.replace(',', '|')


csv_head = find_all_options()
csvwriter.writerow(csv_head)


def should_insert(lst, item):
	res = []
	while lst.index(item) != csv_head.index(item):
		lst.append('')
		res.append('')
	return res.append(item)


# loop through vacancies and their tags
count = 0
for vacancy in vacancies:
	row_item = []
	if (count > 50):
		break
	else:
		for idx, tag_item in enumerate(vacancy):
			csv_tag = tag_item.text
			if (tag_item.text == 'category'):
				row_item.append(fix_separators(tag_item[0].text))
			elif (tag_item.text == 'salary'):
				salary = parseSalary(tag_item.text)
				if isinstance(salary, str):
					if (salary == ''):
						row_item.append(['', ''])
					else:
						row_item.append([salary, ''])
				else:
					row_item.append([salary[0], salary[1]])
			elif (tag_item.text == 'term'):
				row_item.append(fix_separators(tag_item[0].text))
			elif (tag_item.text == 'requirement'):
				req = tag_item
				for req_item in req:
					row_item.append(fix_separators(row_item.text))
			elif (tag_item.text == 'addresses'):
				addr = tag_item[0]
				for addr_item in addr:
					row_item.append(fix_separators(addr_item.text))
			elif (tag_item.text == 'company'):
				comp = tag_item
				for comp_item in comp:
					row_item.append(fix_separators(comp_item.text))
			else:
				row_item.append(csv_tag)
		count = count+1
	csvwriter.writerow(row_item)


vacancies_data.close()

# salary = tag_item.text.split()
# min_salary = tag_item.text.s
