variable "project_name" {
  type = string
}

variable "db_name" {
  type = string
}

variable "username" {
  type = string
}

variable "password" {
  type = string
}

variable "port" {
  type = string
}

variable "sg_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}
