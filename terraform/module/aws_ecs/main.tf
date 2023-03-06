resource "aws_ecs_cluster" "frourio_pfl" {
  name = var.cluster_name
}

resource "aws_ecs_task_definition" "serve" {
  family = "serve"
  container_definitions = jsonencode([
    {
      name      = "app"
      image     = "public.ecr.aws/m1d2b7j2/frourio-pfl-app",
      essential = true
      portMappings = [
        {
          name          = "app"
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
          appProtocol   = "http2"
        }
      ]
      workingDirectory = "/server"
      healthCheck = {
        command = [
          "CMD-SHELL",
          "curl http://localhost/public/healthCheck || exit 1"
        ]
        interval = 300
        timeout  = 5
        retries  = 3
      }
    },
  ])
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  memory                   = "3GB"
  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }
}
