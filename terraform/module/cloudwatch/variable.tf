variable "project_name" {
  type = string
}

locals {
  logs_group_name   = "/ecs/${var.project_name}-service"
  retention_in_days = 30
}
