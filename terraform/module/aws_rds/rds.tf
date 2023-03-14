resource "aws_db_instance" "default" {
  identifier           = var.project_name
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "15.2"
  instance_class       = "db.t3.micro"
  db_name              = var.db_name
  username             = var.username
  password             = var.password
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.default.name
  tags = {
    Name = "${var.project_name}-rds"
  }
}

resource "aws_db_subnet_group" "default" {
  name = var.project_name
  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}
