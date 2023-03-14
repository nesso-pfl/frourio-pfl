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

# S3
variable "server_env_file_path" {
  type    = string
  default = "../../server/.env.production.local"
}
variable "client_env_file_path" {
  type    = string
  default = "../../.env.production.local"
}
variable "db_env_file_path" {
  type    = string
  default = "../../server/prisma/.env.production.local"
}


# SG
variable "sg_ingress_ip_cidr" {
  type = string
}
