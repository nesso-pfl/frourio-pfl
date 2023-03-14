resource "aws_s3_bucket" "env_files" {
  bucket = "${var.project_name}-bucket"

  tags = {
    Name = "${var.project_name}-s3-bucket"
  }
}
resource "aws_s3_bucket_acl" "env_files" {
  bucket = aws_s3_bucket.env_files.id
  acl    = "private"
}

resource "aws_s3_object" "server_env_file" {
  bucket = aws_s3_bucket.env_files.id
  key    = local.server_env_file_path
  source = var.server_env_file_path
  etag   = filemd5(var.server_env_file_path)

  tags = {
    Name = "${var.project_name}-s3-server-env"
  }
}
resource "aws_s3_object" "client_env_file" {
  bucket = aws_s3_bucket.env_files.id
  key    = local.client_env_file_path
  source = var.client_env_file_path
  etag   = filemd5(var.client_env_file_path)

  tags = {
    Name = "${var.project_name}-s3-client-env"
  }
}
resource "aws_s3_object" "db_env_file" {
  bucket = aws_s3_bucket.env_files.id
  key    = local.db_env_file_path
  source = var.db_env_file_path
  etag   = filemd5(var.db_env_file_path)

  tags = {
    Name = "${var.project_name}-s3-db-env"
  }
}
