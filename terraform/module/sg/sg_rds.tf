resource "aws_security_group" "rds" {
  name   = "${var.project_name}-rds-sg"
  vpc_id = var.vpc_id

  tags = {
    Name = "${var.project_name}-rds-sg"
  }
}

resource "aws_security_group_rule" "ingress_http_rds" {
  from_port         = var.webapp_port
  to_port           = var.db_port
  protocol          = "tcp"
  security_group_id = aws_security_group.rds.id
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ingress_sg_all_rds" {
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1"
  security_group_id        = aws_security_group.rds.id
  source_security_group_id = aws_security_group.rds.id
  type                     = "ingress"
}

resource "aws_security_group_rule" "egress_all_all_rds" {
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  security_group_id = aws_security_group.rds.id
  type              = "egress"
  cidr_blocks       = ["0.0.0.0/0"]
}
