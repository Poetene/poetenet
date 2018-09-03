# poetenet


Open demo-making platform based on [htmleditor](https://github.com/mrdoob/htmleditor).
Storing of demos, etc. is done in Django.

## Setup
```
make setup
make update
```

## Run
```
make run
```

## Docker

Build the image: `sudo docker build -t poetenet --network=host .`  
Start the server: `sudo docker run -it --rm --network host --name poetenet poetenet`  
Start the server (background mode): `sudo docker run -d --network host --name poetenet poetenet`  
Open bash in a temporary container: `sudo docker run -it --rm --network host --entrypoint /bin/bash poetenet`
