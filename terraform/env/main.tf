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

module "aws_ecr" {
  source = "../module/aws_ecr"
  providers = {
    aws = aws.ue1
  }
}

module "aws_rds" {
  source        = "../module/aws_rds"
  instance_name = "frourio-pfl"
  db_name       = "frouriopfl"
  username      = "psqluser"
  password      = "password"
}
