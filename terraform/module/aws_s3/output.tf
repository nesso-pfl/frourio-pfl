output "env_files_bucket" {
  value = aws_s3_bucket.env_files
}

output "server_env_file_bucket_object_arn" {
  value = "${aws_s3_bucket.env_files.arn}/${local.server_env_file_path}"
}

output "client_env_file_bucket_object_arn" {
  value = "${aws_s3_bucket.env_files.arn}/${local.client_env_file_path}"
}

output "db_env_file_bucket_object_arn" {
  value = "${aws_s3_bucket.env_files.arn}/${local.db_env_file_path}"
}
