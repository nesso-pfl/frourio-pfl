output "aws_vpc" {
  value = aws_vpc.frourio_pfl
}

output "aws_subnets" {
  value = [aws_subnet.public_a, aws_subnet.public_c, aws_subnet.public_d]
}

output "aws_subnet_ids" {
  value = [aws_subnet.public_a.id, aws_subnet.public_c.id, aws_subnet.public_d.id]
}
