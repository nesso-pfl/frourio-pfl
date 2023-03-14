terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Environment = "production"
      Project     = var.project_name
    }
  }
}

module "s3" {
  source = "../module/aws_s3"

  project_name         = var.project_name
  server_env_file_path = var.server_env_file_path
  client_env_file_path = var.client_env_file_path
  db_env_file_path     = var.db_env_file_path
}

module "ecr" {
  source = "../module/ecr"

  project_name = var.project_name
}

module "iam" {
  source = "../module/iam"

  project_name  = var.project_name
  s3_bucket_arn = module.s3.env_files_bucket.arn
  s3_env_file_object_arns = [
    module.s3.server_env_file_bucket_object_arn,
    module.s3.client_env_file_bucket_object_arn,
    module.s3.db_env_file_bucket_object_arn
  ]
}

module "network" {
  source = "../module/network"

  project_name = var.project_name
}

module "sg" {
  source = "../module/sg"

  project_name = var.project_name
  vpc_id       = module.network.vpc_id
}

module "cloudwatch" {
  source = "../module/cloudwatch"

  project_name = var.project_name
}

module "route53" {
  source = "../module/aws_route53"

  project_name     = var.project_name
  base_domain_name = var.base_domain_name
  alb_dns_name     = module.alb.alb_dns_name
  acm              = module.acm.acm
}

module "acm" {
  source = "../module/aws_acm"

  project_name     = var.project_name
  base_domain_name = var.base_domain_name
}

module "alb" {
  source = "../module/alb"

  project_name          = var.project_name
  app_health_check_path = var.app_health_check_path
  vpc_id                = module.network.vpc_id
  public_a_id           = module.network.public_a_id
  public_c_id           = module.network.public_c_id
  sg_id                 = module.sg.sg_id
  acm                   = module.acm.acm
}

module "ecs" {
  source = "../module/ecs"

  webapp_port  = var.webapp_port
  project_name = var.project_name
  # Service
  logs_group_name = module.cloudwatch.logs_group_name
  tg_arn          = module.alb.tg_arn
  public_a_id     = module.network.public_a_id
  public_c_id     = module.network.public_c_id
  sg_id           = module.sg.sg_id
  # Task
  ecr_repository_uri                = module.ecr.repository_uri
  execution_role_arn                = module.iam.execution_role_arn
  server_env_file_bucket_object_arn = module.s3.server_env_file_bucket_object_arn
}

/*
module "aws_rds" {
  source        = "../module/aws_rds"

  project_name = var.project_name
  db_name       = var.db_name
  username      = var.db_username
  password      = var.db_password
  subnet_ids    = module.aws_vpc.aws_subnet_ids
}
*/
