resource "aws_vpc" "default" {
  cidr_block = local.vpc_cidr

  tags = {
    Name = "${var.project_name}-vpc"
  }
}
