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
  alias  = "ap-northeast-1"
}
provider "aws" {
  region = "us-east-1"
  alias  = "ue1"
}


# ECR
module "ecr" {
  source = "../module/ecr"

  name_prefix = var.name_prefix
  region      = var.region
  tag_name    = var.tag_name
  tag_group   = var.tag_group
}

# IAM
module "iam" {
  source = "../module/iam"

  name_prefix = var.name_prefix
  region      = var.region
  tag_name    = var.tag_name
  tag_group   = var.tag_group
}

# Network
module "network" {
  source = "../module/network"

  name_prefix = var.name_prefix
  region      = var.region
  tag_name    = var.tag_name
  tag_group   = var.tag_group
}

# Security Group
module "sg" {
  source = "../module/sg"

  name_prefix = var.name_prefix
  region      = var.region
  tag_name    = var.tag_name
  tag_group   = var.tag_group

  vpc_id             = module.network.vpc_id
  sg_ingress_ip_cidr = var.sg_ingress_ip_cidr
}

# Cloud Watch
module "cloudwatch" {
  source = "../module/cloudwatch"

  name_prefix = var.name_prefix
  region      = var.region
  tag_name    = var.tag_name
  tag_group   = var.tag_group
}

# ALB
module "alb" {
  source = "../module/alb"

  name_prefix = var.name_prefix
  region      = var.region
  tag_name    = var.tag_name
  tag_group   = var.tag_group

  vpc_id      = module.network.vpc_id
  public_a_id = module.network.public_a_id
  public_c_id = module.network.public_c_id
  sg_id       = module.sg.sg_id
}

# ECS
module "ecs" {
  source = "../module/ecs"

  name_prefix = var.name_prefix
  region      = var.region
  webapp_port = var.webapp_port
  tag_name    = var.tag_name
  tag_group   = var.tag_group

  # Service
  logs_group_name = module.cloudwatch.logs_group_name
  tg_arn          = module.alb.tg_arn
  public_a_id     = module.network.public_a_id
  public_c_id     = module.network.public_c_id
  sg_id           = module.sg.sg_id
  # Task
  ecr_repository_uri = module.ecr.repository_uri
  execution_role_arn = module.iam.execution_role_arn
}

/*
module "aws_rds" {
  source        = "../module/aws_rds"
  instance_name = "frourio-pfl"
  db_name       = "frouriopfl"
  username      = "psqluser"
  password      = "password"
  subnet_ids    = module.aws_vpc.aws_subnet_ids
}
*/
