from poetenet.settings.base import *


try:
    from poetenet.settings.local import *
except ImportError, e:
    raise ImportError("Failed to import local settings")
