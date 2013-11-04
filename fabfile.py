import getpass
from fabric.api import *
from fabric.contrib.console import confirm
import subprocess


class Site(object):

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    def run(self, cmd):
        with cd(self.dir):
            sudo(cmd, user=self.user_id)

    def deploy(self):
        self.git_pull()
        self.update_packages()
        self.run('venv/bin/python manage.py syncdb --migrate')
        self.run('venv/bin/python manage.py collectstatic --noinput')
        self.restart()

    def git_pull(self):
        # .pyc files can create ghost behavior when .py files are deleted...
        self.run("find . -name '*.pyc' -delete")
        self.run("git fetch origin && git reset --hard origin/master")

    def git_tag(self):
        if not confirm("Give new tag for this deployment?"):
            if confirm("Are you sure?", default=False):
                return
        self.run("git tag | sort -g | tail -n 1 | sed s/$/+1/ | bc | xargs git tag")
        self.run("git push --tags && git push")

    def update_packages(self):
        self.run("./venv/bin/pip install -r requirements.txt")

    def restart(self):
        self.run("touch pouetenet_uswgi.ini")

PROD = Site(
    dir='/home/prods/poetenet/',
    user_id='www-data'
)

env.hosts = ['poetene.net']


@task
def deploy():
    """
    """
    # mac-only command, just for fun
    try:
        subprocess.call(['say', '"Ship! Ship! Ship!"'])
    except:
        pass
    print "ship! ship! ship!"

    env.user = prompt("Username on prod server:", default=getpass.getuser())

    PROD.deploy()

    # Check if we want to tag the deployment
    PROD.git_tag()


@task
def restart():
    PROD.restart()
