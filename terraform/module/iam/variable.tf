# Global
variable "region" {}
variable "name_prefix" {}

# Tags
variable "tag_name" {}
variable "tag_group" {}

locals {
  role_name                          = "${var.name_prefix}-role"
  ecs_task_execution_role_policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
