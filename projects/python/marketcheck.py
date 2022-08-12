#!/usr/bin/python3

import requests

url = 'https://play.google.com/store/apps/details?id='
packages = [
  'undefinedq.whelloffortune',
  'com.ea.sportyetil.jckie'
]

for package in packages:
  result = requests.get('{}{}'.format(url, package))
  code = result.status_code
  
  if code == 404:
    # normal status: status = '\033[92mOk\033[0m'
    status = '\033[91mFail\033[0m'
    print('{}: {}'.format(package, status))
