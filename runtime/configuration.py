class Configuration():
	def get(key):
		return 'hello'

def attach(app):
	app.Configuration = Configuration()
