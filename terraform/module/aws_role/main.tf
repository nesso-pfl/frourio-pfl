data "aws_iam_policy_document" "frourio_pfl" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "frourio_pfl" {
  name               = local.role_name
  assume_role_policy = data.aws_iam_policy_document.frourio_pfl.json
}

resource "aws_iam_role_policy_attachment" "frourio_pfl" {
  role       = aws_iam_role.frourio_pfl.name
  policy_arn = local.ecs_task_execution_role_policy_arn
}
