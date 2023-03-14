# Global
variable "region" {}
variable "name_prefix" {}
variable "webapp_port" {}

# Tags
variable "tag_name" {}
variable "tag_group" {}

# Task
variable "ecr_repository_uri" {}
variable "execution_role_arn" {}
variable "server_env_file_bucket_object_arn" {
  type = string
}

# Service
variable "logs_group_name" {}
variable "tg_arn" {}
variable "public_a_id" {}
variable "public_c_id" {}
variable "sg_id" {}

locals {
  ecs_cluster_name              = "${var.name_prefix}-cluster"
  task_definitions_filepath     = "${path.module}/task_definition.json"
  task_definitions_name         = "${var.name_prefix}-task"
  task_cpu                      = 256
  task_memory                   = 512
  task_log_driver               = "awslogs"
  task_network_mode             = "awsvpc"
  task_requires_compatibilities = "FARGATE"

  service_name  = "${var.name_prefix}-service"
  service_count = 1
}
