import logging

from runtime import container
from runtime import app
from runtime import configuration
from runtime import http
from runtime import services

# call basicConfig to initialize logging
logging.basicConfig(level=logging.DEBUG,
                   format='%(asctime)s %(levelname)s %(name)s %(message)s')
logger = logging.getLogger(__name__)

ctn = container.Container()
ctn.use(configuration)
ctn.use(services)
ctn.use(http)

logger.info('application starting...')
app.run()
