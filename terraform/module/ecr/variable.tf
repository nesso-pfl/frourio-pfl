variable "project_name" {}

locals {
  repository_name = "${var.project_name}-repository"
  container_name  = "${var.project_name}-app"
  docker_path     = "./terraform/dockerfile/app/Dockerfile"
}
