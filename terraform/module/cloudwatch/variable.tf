# Global
variable "region" {}
variable "name_prefix" {}

# Tags
variable "tag_name" {}
variable "tag_group" {}

locals {
  logs_group_name   = "/ecs/${var.name_prefix}-service"
  retention_in_days = 30
}
