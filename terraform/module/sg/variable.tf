# Tags
variable "project_name" {}

# SG
variable "vpc_id" {}

locals {
  sg_name = "${var.project_name}-sg"
}
