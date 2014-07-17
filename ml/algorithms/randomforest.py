from sklearn.ensemble import RandomForestClassifier

def train_predict(training, test, features, target):

	X_train = training[features]
	y_train = training[target]
	X_test = test[features]
	y_test = test[target]

	clf = RandomForestClassifier()
	clf.fit(X_train, y_train)
	preds = clf.predict(X_test)
	return preds, y_test