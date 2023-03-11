#!/bin/bash

aws ecr list-images --repository-name $REPO_NAME |\
grep imageDigest |\
awk -F'"' '{print $4}' |\
aws ecr batch-delete-image --repository-name $REPO_NAME --image-ids imageDigest=
