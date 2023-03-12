resource "aws_iam_user" "server_deploy_user" {
  name = "server_deploy"
}

resource "aws_iam_access_key" "server_deploy_user" {
  user = aws_iam_user.server_deploy_user.name
}

data "aws_iam_policy" "ecs" {
  name = "AmazonECS_FullAccess"
}
resource "aws_iam_user_policy_attachment" "ecs_to_server_deploy_user" {
  user       = aws_iam_user.server_deploy_user.name
  policy_arn = data.aws_iam_policy.ecs.arn
}

data "aws_iam_policy" "ecr" {
  name = "AmazonEC2ContainerRegistryPowerUser"
}
resource "aws_iam_user_policy_attachment" "ecr_to_server_deploy_user" {
  user       = aws_iam_user.server_deploy_user.name
  policy_arn = data.aws_iam_policy.ecr.arn
}
