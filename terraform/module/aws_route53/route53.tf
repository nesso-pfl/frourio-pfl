resource "aws_route53_zone" "default" {
  name = var.base_domain_name

  tags = {
    Name = "${var.project_name}-host-zone"
  }
}

resource "aws_route53_record" "default" {
  zone_id = aws_route53_zone.default.zone_id
  name    = "api.${var.base_domain_name}"
  type    = "CNAME"
  ttl     = "300"
  records = [var.alb_dns_name]
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in var.acm.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  ttl             = "300"

  # レコードを追加するドメインのホストゾーンIDを指定
  zone_id = aws_route53_zone.default.id
}
