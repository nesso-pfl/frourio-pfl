# Global
variable "region" {
  type = string
}
variable "name_prefix" {
  type = string
}
variable "webapp_port" {
  type = number
}

# Tags
variable "tag_name" {
  type = string
}
variable "tag_group" {
  type = string
}

# SG
variable "sg_ingress_ip_cidr" {
  type = string
}
