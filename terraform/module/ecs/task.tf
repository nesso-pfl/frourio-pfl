data "template_file" "default" {
  template = file("${local.task_definitions_filepath}")
  vars = {
    SERVICE_NAME    = "${local.service_name}"
    ECR_ARN         = "${var.ecr_repository_uri}"
    LOGS_GROUP_NAME = "${var.logs_group_name}"
    LOG_DRIVER      = "${local.task_log_driver}"
    REGION          = "${var.region}"
  }
}

resource "aws_ecs_task_definition" "default" {
  container_definitions    = data.template_file.default.rendered
  family                   = local.task_definitions_name
  cpu                      = local.task_cpu
  memory                   = local.task_memory
  network_mode             = local.task_network_mode
  requires_compatibilities = ["${local.task_requires_compatibilities}"]
  execution_role_arn       = var.execution_role_arn

  tags = {
    Name  = "${var.tag_name}-task"
    group = "${var.tag_group}"
  }
}
