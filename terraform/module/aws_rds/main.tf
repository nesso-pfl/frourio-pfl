resource "aws_db_instance" "frourio_pfl" {
  identifier          = var.instance_name
  allocated_storage   = 20
  storage_type        = "gp2"
  engine              = "postgres"
  engine_version      = "15.2"
  instance_class      = "db.t3.micro"
  db_name             = var.db_name
  username            = var.username
  password            = var.password
  skip_final_snapshot = true
}
