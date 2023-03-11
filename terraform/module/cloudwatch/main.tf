resource "aws_cloudwatch_log_group" "default" {
  name              = local.logs_group_name
  retention_in_days = local.retention_in_days

  tags = {
    Name  = "${var.tag_name}-logs"
    group = "${var.tag_group}"
  }
}
