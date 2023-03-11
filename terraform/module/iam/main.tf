data "aws_iam_policy_document" "default" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "default" {
  name               = local.role_name
  assume_role_policy = data.aws_iam_policy_document.default.json

  tags = {
    Name  = "${var.tag_name}-repository"
    group = "${var.tag_group}"
  }
}

resource "aws_iam_role_policy_attachment" "default" {
  role       = aws_iam_role.default.name
  policy_arn = local.ecs_task_execution_role_policy_arn
}
