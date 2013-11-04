all: update

.PHONY: setup
setup:
	virtualenv venv
	test -f poetenet/settings/local.py || cp poetenet/settings/local.py.example poetenet/settings/local.py

.PHONY: update
update:
	pip install -r requirements.txt
	python manage.py syncdb --migrate --noinput

.PHONY: run
run:
	python manage.py runserver

.PHONY: serve
serve:
	python manage.py runserver 0.0.0.0:8000

.PHONY: lint
lint:
	flake8 poetenet --exclude=migrations,settings

.PHONY: test
test:
	python manage.py test

.PHONY: static
static:
	python manage.py collectstatic --noinput
