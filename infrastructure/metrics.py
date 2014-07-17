import pandas as pd
import numpy as np

from ml.algorithms import randomforest as rf
from ml.metrics import evaluation as ev
from ml.munging import split

target = 'e'
features = ['a', 'b', 'c', 'd']
cols = len(features)
rows = 1000

df = pd.DataFrame(np.random.randint(1, 5, (rows, cols)), columns=features)
df[target] = np.random.randint(2, size=rows)

training, test = split.train_test(df)
y_preds, y_true = rf.train_predict(training, test, features, target)
ev_report = ev.report(y_true, y_preds)

class MLService():

	def report(self):
		return ev_report