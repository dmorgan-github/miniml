import os
from flask import Flask

"""
We set this here so that we have access
to it as global static variable
"""
tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../templates')
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../public')

app = Flask(__name__, template_folder=tmpl_dir, static_folder=static_dir, static_url_path='')