from runtime import app
from controllers.api import index as api
from controllers.pages import index as pages

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

@app.errorhandler(404)
def page_not_found(error):
	return 'page not found', 404

def attach(container):
	api.init(container)
	pages.init(container)