class Container:

	def use(self, plugin):
		plugin.attach(self)

	def init(self):
		print 'init'