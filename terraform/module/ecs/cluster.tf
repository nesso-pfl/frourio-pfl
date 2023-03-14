resource "aws_ecs_cluster" "default" {
  name = local.ecs_cluster_name

  tags = {
    Name = "${var.project_name}-cluster"
  }
}
