

def train_test(df):

	# split the dataset
	N = len(df)
	l = range(N)
	trainLen = int(N*0.75)
	testLen  = int(N*0.25)
	training = df.ix[l[:trainLen]]
	test = df.ix[l[trainLen:trainLen+testLen]]

	return training, test