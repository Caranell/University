import re
from datetime import datetime

import pandas as pd
import os
import math


def splitOnGroups(df):
    max_value = df['max-salary'].max()
    min_value = df['max-salary'].min()
    step = (max_value - min_value) / 9
    df_groups = []
    group_min_value = 0
    for i in range(9):
        group_max_value = min_value + step * i
        group = df.loc[(df['max-salary'] <= group_max_value &
                        df['min-salary'] > group_min_value)]
        df_groups.append(group)
        group_min_value = group_max_value
	nan_group = df[df['max-salary'].isNull()]
	last_group = df.loc[(df['max-salary'] > group_max_value)]
	df_groups.append(nan_group)
	df_groups.append(last_group)
	return df_groups


df = pd.read_csv('./data/vacancies.csv')
df = df.sort_values(by=['min-salary', 'max-salary'])
groups = splitOnGroups(df)
