resource "aws_acm_certificate" "default" {
  domain_name               = var.dns_name
  subject_alternative_names = ["frourio-pfl.nesso-pfl.click"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
