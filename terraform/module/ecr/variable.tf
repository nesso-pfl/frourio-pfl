# Global
variable "region" {}
variable "name_prefix" {}

# Tags
variable "tag_name" {}
variable "tag_group" {}

locals {
  repository_name = "${var.name_prefix}-repository"
  container_name  = var.name_prefix
  docker_path     = "./terraform/dockerfile/app/Dockerfile"
}
