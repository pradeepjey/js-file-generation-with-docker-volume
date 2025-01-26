# Javascript + Docker File generation with ramdom objects volume

This application setup help to generate a docker volume with random variables of alphabetical strings, real numbers, integers, alphanumerics(with space at beginning and end)


# Application Requirements

The application needs to be a minimum version of listed below.

1. Docker 27.4.0 


## Quick start

```bash
# select a repo from github

# download the example or clone the repo from github
git clone https://github.com/pradeepjey/js-file-generation-with-docker-volume.git

# change directory
cd file-generator

# Build docker image
docker build -t file-generator .

# Create docker volume
docker volume create random-objects

# Run docker image with attached volume 'random-objects'
docker run -v random-objects:/data file-generator

```
