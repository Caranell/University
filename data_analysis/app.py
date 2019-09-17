import numpy as np
import pandas as pd

data = pd.read_csv('brooklyn_sales_map.csv')
building_category = 'building_class_category'
data[building_category] = data[building_category].apply(lambda x: " ".join(str(x).split()))
grouped_data = data.groupby(building_category)

# creating folder & files
# grouped_data.apply(lambda x: x.to_csv(r'building_class_categories/' + x.name.replace('/', ' ') + '.csv'))

# print(data.isnull().sum())

# print('-------------')
# print('MEAN')
# print('-------------')
# print(data.mean(numeric_only=True))

# print('-------------')
# print('MEDIAN')
# print('-------------')
# print(data.median(numeric_only=True))

# print('-------------')
# print('MAX')
# print('-------------')
# print(data.max(numeric_only=True))

# print('-------------')
# print('MIN')
# print('-------------')
# print(data.min(numeric_only=True))


# for column in data:
# 	if not pd.api.types.is_numeric_dtype(data[column]):
# 		#print(str(column) + ' unique values: ' + str(len(data[column].unique())))
		
print(data[building_category].value_counts(normalize = True))

# for column in data:
# 	if pd.api.types.is_numeric_dtype(data[column]):
# 		max = data[column].max()
# 		min = data[column].min()
# 		data[column] = (data[column] - min) / (max - min)
# 		print(data[column])