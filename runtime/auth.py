import logging
from flask.ext.login import LoginManager, current_user

from runtime import app

logger = logging.getLogger(__name__)

class Principal():

	def __init__(self):
		pass

	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return True

	def get_id(self):
		return '12345'

class AuthHelper():

	def __init__(self, user_service):
		self.user_service = user_service

	def get_principal(user_id):
		return Principal()

login_manager = LoginManager(app)

@app.before_request
def before_request():
	logger.info('before_request')
	logger.info(current_user.is_active())

def attach(container):
	user_service = container.services.user_service
	auth_helper = AuthHelper(user_service)
	login_manager.user_loader(load_user(auth_helper.get_principal))