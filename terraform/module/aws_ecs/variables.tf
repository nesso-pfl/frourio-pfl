variable "cluster_name" {
  type    = string
  default = "frourio-pfl"
}

variable "execution_role_arn" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}
