resource "aws_ecs_cluster" "default" {
  name = local.ecs_cluster_name

  tags = {
    Name  = "${var.tag_name}-cluster"
    group = "${var.tag_group}"
  }
}
