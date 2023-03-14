data "template_file" "default" {
  template = file("${local.task_definitions_filepath}")
  vars = {
    SERVICE_NAME                      = "${local.service_name}"
    SERVER_ENV_FILE_BUCKET_OBJECT_ARN = "${var.server_env_file_bucket_object_arn}"
    ECR_ARN                           = "${var.ecr_repository_uri}"
    LOGS_GROUP_NAME                   = "${var.logs_group_name}"
    LOG_DRIVER                        = "${local.task_log_driver}"
    WEBAPP_PORT                       = var.webapp_port
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
    Name = local.task_definitions_name
  }
}
