import logging
from flask import render_template

from runtime import app

logger = logging.getLogger(__name__)

class HomeController():

	def __init__(self, container):
		pass

	def get(self):
		return render_template('home.html')

def init(container):
	ctrl = HomeController(container)
	app.add_url_rule('/', 'home', ctrl.get)