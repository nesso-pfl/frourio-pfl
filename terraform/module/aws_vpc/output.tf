output "aws_vpc" {
  value = aws_vpc.frourio_pfl
}

output "aws_subnets" {
  value = [aws_subnet.public_a, aws_subnet.public_c, aws_subnet.public_d]
}
