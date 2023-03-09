terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

resource "aws_ecrpublic_repository" "frourio_pfl_app" {
  repository_name = var.image_name
  catalog_data {
    architectures     = ["x86-64"]
    operating_systems = ["Linux"]
  }
}

resource "null_resource" "push_app_image" {
  provisioner "local-exec" {
    command = "cd ${var.project_root}"
  }

  provisioner "local-exec" {
    command = "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${aws_ecrpublic_repository.frourio_pfl_app.repository_uri}"
  }

  provisioner "local-exec" {
    command = "docker build -t ${var.image_name} ${var.dockerfile_dir}"
  }

  provisioner "local-exec" {
    command = "docker tag ${var.image_name}:latest ${aws_ecrpublic_repository.frourio_pfl_app.repository_uri}"
  }

  provisioner "local-exec" {
    command = "docker push ${aws_ecrpublic_repository.frourio_pfl_app.repository_uri}"
  }
}
