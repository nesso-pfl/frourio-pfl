resource "aws_route_table" "public" {
  vpc_id = aws_vpc.default.id

  tags = {
    Name  = "${var.tag_name}-route-table"
    group = "${var.tag_group}"
  }
}

resource "aws_route" "public" {
  route_table_id         = aws_route_table.public.id
  gateway_id             = aws_internet_gateway.default.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route_table_association" "public_a" {
  route_table_id = aws_route_table.public.id
  subnet_id      = aws_subnet.public_a.id
}

resource "aws_route_table_association" "public_c" {
  route_table_id = aws_route_table.public.id
  subnet_id      = aws_subnet.public_c.id
}
