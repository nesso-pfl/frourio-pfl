#!/bin/bash

# Docker login
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $REPO_URL

# Build image
export CONTAINER_NAME=$CONTAINER_NAME
cd ../../
docker build -t $CONTAINER_NAME -f $DOCKER_PATH .

# Tag
docker tag $CONTAINER_NAME:latest $REPO_URL:latest

# Push image
docker push $REPO_URL:latest
