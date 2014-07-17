import logging
from flask import jsonify

from runtime import app
logger = logging.getLogger(__name__)

class MetricsController():
	def __init__(self, container):
		self.ml_service = container.services.ml_service

	def report(self):
		logger.info('MetricsController.report')
		result = jsonify(self.ml_service.report())
		return result

def init(container):
	ctrl = MetricsController(container)
	app.add_url_rule('/api/ml/metrics/report', 'api-ml-metrics-report', ctrl.report)