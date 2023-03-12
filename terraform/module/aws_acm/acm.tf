resource "aws_acm_certificate" "default" {
  domain_name       = data.aws_ssm_parameter.fqdn.value
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
