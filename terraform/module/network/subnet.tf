resource "aws_subnet" "public_a" {
  cidr_block        = "10.0.1.0/24"
  vpc_id            = aws_vpc.default.id
  availability_zone = "ap-northeast-1a"

  tags = {
    Name = "${var.project_name}-subnet-a"
  }
}

resource "aws_subnet" "public_c" {
  cidr_block        = "10.0.2.0/24"
  vpc_id            = aws_vpc.default.id
  availability_zone = "ap-northeast-1c"

  tags = {
    Name = "${var.project_name}-subnet-c"
  }
}
