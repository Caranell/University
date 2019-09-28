import xml.etree.ElementTree as ET
import pandas as pd
import numpy as np
import csv

tree = ET.parse('OBV_full.xml')
root = tree.getroot()
vacancies = root.find('vacancies')
#vacancies = open('vacancies.csv', 'w')

#csvwriter = csv.writer(vacancies)
csv_header = []

count = 0
for item in vacancies.findall('vacancy'):
	print(item.keys())
	print(item.items())

# for item in root.findall('vacancy'):
#     resident = []
#     if count == 0:
#         name = item.find('url').tag
#         csv_header.append(name)
#         PhoneNumber = item.find('mobile-url').tag
#         csv_header.append(PhoneNumber)
#         EmailAddress = item.find('creation-date').tag
# 				csv_header.append(PhoneNumber)
#         EmailAddress = item.find('update-date').tag
# 				csv_header.append(PhoneNumber)
#         EmailAddress = item.find('salary').tag
# 				csv_header.append(PhoneNumber)
# 				EmailAddress = item.find('currency').tag
# 				csv_header.append(PhoneNumber)
# 				EmailAddress = item.find('category').tag
# 				csv_header.append(PhoneNumber)
# 				EmailAddress = item.find('salary').tag
# 				csv_header.append(PhoneNumber)
# 				EmailAddress = item.find('job-name').tag
# 				csv_header.append(PhoneNumber)
# 				EmailAddress = item.find('employment').tag
# 				csv_header.append(PhoneNumber)
# 				EmailAddress = item.find('schedule').tag
# 				csv_header.append(PhoneNumber)
# 				EmailAddress = item.find('description').tag
# 				csv_header.append(PhoneNumber)
# 				break;

#         csv_header.append(EmailAddress)
#         csvwriter.writerow(csv_header)
#         count = count + 1
