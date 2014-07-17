from sklearn.metrics import confusion_matrix
from sklearn.metrics import precision_recall_fscore_support

class ClassificationReport(dict):
	pass

def report(y_true, y_preds):

	report = ClassificationReport()

	cm = confusion_matrix(y_true, y_preds)
	report['confusion_matrix'] = cm.tolist()

	prfs = precision_recall_fscore_support(y_true, y_preds, average=None)
	report['precision'] = prfs[0].tolist()
	report['recall'] = prfs[1].tolist()
	report['f1'] = prfs[2].tolist()
	report['suport'] = prfs[3].tolist()

	return report