output "sg_ecs_id" {
  value = aws_security_group.ecs.id
}

output "sg_rds_id" {
  value = aws_security_group.rds.id
}
