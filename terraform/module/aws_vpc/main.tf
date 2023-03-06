resource "aws_vpc" "frourio_pfl" {
  cidr_block = "172.31.0.0/16"
}

resource "aws_security_group" "allow_tls" {
  name   = "allow_tls"
  vpc_id = aws_vpc.frourio_pfl.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.frourio_pfl.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_internet_gateway" "default" {
  vpc_id = aws_vpc.frourio_pfl.id
}

resource "aws_subnet" "public_a" {
  cidr_block        = "172.31.32.0/20"
  vpc_id            = aws_vpc.frourio_pfl.id
  availability_zone = "ap-northeast-1a"
}

resource "aws_subnet" "public_c" {
  cidr_block        = "172.31.0.0/20"
  vpc_id            = aws_vpc.frourio_pfl.id
  availability_zone = "ap-northeast-1c"
}

resource "aws_subnet" "public_d" {
  cidr_block        = "172.31.16.0/20"
  vpc_id            = aws_vpc.frourio_pfl.id
  availability_zone = "ap-northeast-1d"
}

resource "aws_route_table" "frourio_pfl" {
  vpc_id = aws_vpc.frourio_pfl.id
}

resource "aws_route_table_association" "public_a" {
  route_table_id = aws_route_table.frourio_pfl.id
  subnet_id      = aws_subnet.public_a.id
}

resource "aws_route_table_association" "public_c" {
  route_table_id = aws_route_table.frourio_pfl.id
  subnet_id      = aws_subnet.public_c.id
}

resource "aws_route_table_association" "public_d" {
  route_table_id = aws_route_table.frourio_pfl.id
  subnet_id      = aws_subnet.public_d.id
}
