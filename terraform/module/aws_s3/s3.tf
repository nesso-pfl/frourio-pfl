resource "aws_s3_bucket" "env_files" {
  bucket = "${var.name_prefix}-bucket"

  tags = {
    Name  = "${var.tag_name}-bucket"
    group = "${var.tag_group}"
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
}
resource "aws_s3_object" "client_env_file" {
  bucket = aws_s3_bucket.env_files.id
  key    = local.client_env_file_path
  source = var.client_env_file_path
  etag   = filemd5(var.client_env_file_path)
}
resource "aws_s3_object" "db_env_file" {
  bucket = aws_s3_bucket.env_files.id
  key    = local.db_env_file_path
  source = var.db_env_file_path
  etag   = filemd5(var.db_env_file_path)
}
