from infrastructure import metrics

class MyDict(dict):
	pass

def attach(container):
	services = MyDict()
	services.ml_service = metrics.MLService()
	container.services = services