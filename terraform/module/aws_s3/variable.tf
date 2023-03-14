variable "project_name" {
  type = string
}

variable "server_env_file_path" {
  type = string
}
variable "client_env_file_path" {
  type = string
}
variable "db_env_file_path" {
  type = string
}

locals {
  server_env_file_path = "server/.env"
  client_env_file_path = "client/.env"
  db_env_file_path     = "db/.env"
}
