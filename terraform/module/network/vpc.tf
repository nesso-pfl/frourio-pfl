resource "aws_vpc" "default" {
  cidr_block = local.vpc_cidr

  tags = {
    Name  = "${var.name_prefix}-vpc"
    group = "${var.tag_group}"
  }
}
