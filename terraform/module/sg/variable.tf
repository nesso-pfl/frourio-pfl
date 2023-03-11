# Global
variable "region" {}
variable "name_prefix" {}

# Tags
variable "tag_name" {}
variable "tag_group" {}

# SG
variable "sg_ingress_ip_cidr" {}
variable "vpc_id" {}

locals {
  sg_name = "${var.name_prefix}-sg"
}
