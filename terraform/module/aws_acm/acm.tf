resource "aws_acm_certificate" "default" {
  domain_name               = "*.${var.base_domain_name}"
  subject_alternative_names = [var.base_domain_name]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Name = "${var.project_name}-acm"
  }
}
