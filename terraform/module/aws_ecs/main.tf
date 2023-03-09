resource "aws_ecs_cluster" "frourio_pfl" {
  name = var.cluster_name
}
resource "aws_ecs_cluster_capacity_providers" "frourio_pfl" {
  cluster_name       = aws_ecs_cluster.frourio_pfl.name
  capacity_providers = [aws_ecs_capacity_provider.server.name]
  default_capacity_provider_strategy {
    weight            = 1
    capacity_provider = aws_ecs_capacity_provider.server.name
  }
}

resource "aws_cloudwatch_log_group" "frourio_pfl_app" {
  name              = "/ecs/project/frourio_pfl_app"
  retention_in_days = 7
}
resource "aws_ecs_task_definition" "serve" {
  family = "serve"
  container_definitions = jsonencode([
    {
      name        = "app"
      image       = "public.ecr.aws/m1d2b7j2/frourio-pfl-app"
      essential   = true
      cpu         = 512
      memory      = 512
      environment = []
      mountPoints = []
      volumesFrom = []
      portMappings = [
        {
          name          = "server"
          containerPort = 2221
          hostPort      = 80
          protocol      = "tcp"
          appProtocol   = "http2"
          cpu           = 512
        }
      ]
      entryPoint       = ["node", "index.js"]
      workingDirectory = "/server"
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group = aws_cloudwatch_log_group.frourio_pfl_app.name
          awslogs-stream-prefix : "app"
          awslogs-region = "ap-northeast-1"
        }
      }
      /*
      healthCheck = {
        command = [
          "CMD-SHELL",
          "curl http://localhost/public/healthCheck || exit 1"
        ]
        interval = 300
        timeout  = 5
        retries  = 3
      }
      */
    }
  ])
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = var.execution_role_arn
  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }
}

resource "aws_ecs_service" "serve" {
  name            = "serve_app"
  cluster         = aws_ecs_cluster_capacity_providers.frourio_pfl.id
  task_definition = aws_ecs_task_definition.serve.arn
  desired_count   = 1
  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.server.name
    weight            = 1
  }
}
data "aws_ami" "ecs" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "name"
    values = ["amzn-ami-hvm-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "block-device-mapping.volume-type"
    values = ["gp2"]
  }
}

resource "aws_launch_template" "frourio_pfl" {
  name_prefix   = "frourio_pfl_"
  image_id      = data.aws_ami.ecs.id
  instance_type = "t2.micro"
}

resource "aws_autoscaling_group" "ecs" {
  name                  = "frourio_pfl"
  min_size              = 0
  max_size              = 1
  desired_capacity      = 1
  vpc_zone_identifier   = var.subnet_ids
  protect_from_scale_in = true
  launch_template {
    id      = aws_launch_template.frourio_pfl.id
    version = "$Latest"
  }
  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}
resource "aws_ecs_capacity_provider" "server" {
  name = "server"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs.arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      status          = "ENABLED"
      target_capacity = 100
    }
  }
}
