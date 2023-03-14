variable "project_name" {
  type = string
}

# ALB
variable "public_a_id" {
  type = string
}
variable "public_c_id" {
  type = string
}
variable "sg_id" {
  type = string
}
variable "acm" {}

# Target Group
variable "vpc_id" {
  type = string
}
variable "app_health_check_path" {
  type = string
}

locals {
  alb_name = "${var.project_name}-alb"
}
