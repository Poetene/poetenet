FROM python:2.7

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
        nginx \
        supervisor && \
    rm -rf /var/lib/apt/lists/*

RUN pip install uwsgi==2.0.17.1

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx-app.conf /etc/nginx/sites-available/default
COPY supervisor-app.conf /etc/supervisor/conf.d/

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python /usr/src/app/manage.py collectstatic --noinput

RUN python ./manage.py syncdb --migrate --noinput

CMD ["supervisord", "-n"]
