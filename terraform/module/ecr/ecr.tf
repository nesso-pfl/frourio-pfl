resource "aws_ecr_repository" "default" {
  name                 = local.repository_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${var.project_name}-ecr-repository"
  }
}

resource "null_resource" "default" {
  provisioner "local-exec" {
    command = "sh ${path.module}/dockerbuild.sh"

    environment = {
      REPO_URL       = aws_ecr_repository.default.repository_url
      CONTAINER_NAME = "${local.container_name}"
      DOCKER_PATH    = "${local.docker_path}"
    }
  }
}
