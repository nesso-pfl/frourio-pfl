data "aws_iam_policy_document" "default" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}
data "aws_iam_policy_document" "operate_s3_for_ecs" {
  statement {
    actions   = ["s3:GetBucketLocation"]
    resources = [var.s3_bucket_arn]
  }
  statement {
    actions   = ["s3:GetObject"]
    resources = var.s3_env_file_object_arns
  }
}
resource "aws_iam_policy" "get_bucket_object" {
  name   = "get_bucket_object"
  policy = data.aws_iam_policy_document.operate_s3_for_ecs.json
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

resource "aws_iam_role_policy_attachment" "s3_for_ecs" {
  role       = aws_iam_role.default.name
  policy_arn = aws_iam_policy.get_bucket_object.arn
}
