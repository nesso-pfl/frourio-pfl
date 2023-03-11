resource "aws_ecs_service" "default" {
  name            = local.service_name
  cluster         = aws_ecs_cluster.default.id
  task_definition = aws_ecs_task_definition.default.arn
  desired_count   = local.service_count
  launch_type     = local.task_requires_compatibilities

  load_balancer {
    target_group_arn = var.tg_arn
    container_name   = local.service_name
    container_port   = var.webapp_port
  }

  network_configuration {
    subnets = [
      "${var.public_a_id}",
      "${var.public_c_id}",
    ]
    security_groups = [
      "${var.sg_id}"
    ]
    assign_public_ip = true
  }
}
