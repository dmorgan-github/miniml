import logging
from domain.entities import user

logger = logging.getLogger(__name__)

class UserService:

	def __init__(self):
		pass

	def login(self):
		logger.info('UserService.login')
		return user.User()

	def findByUsername(self, user_id):
		return user.User()