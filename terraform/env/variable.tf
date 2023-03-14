variable "webapp_port" {
  type = number
}
variable "project_name" {
  type = string
}
variable "base_domain_name" {
  type = string
}
variable "gh_page_dns_name" {
  type = string
}
variable "app_health_check_path" {
  type    = string
  default = "/api/public/healthCheck"
}

variable "db_name" {
  type = string
}
variable "db_username" {
  type = string
}
variable "db_password" {
  type = string
}

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
