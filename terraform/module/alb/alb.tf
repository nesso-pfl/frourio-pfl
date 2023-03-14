resource "aws_lb" "default" {
  name                       = local.alb_name
  load_balancer_type         = "application"
  internal                   = false
  idle_timeout               = 60
  enable_deletion_protection = false

  subnets = [
    "${var.public_a_id}",
    "${var.public_c_id}",
  ]
  security_groups = [
    "${var.sg_id}"
  ]

  tags = {
    Name = local.alb_name
  }
}

resource "aws_alb_listener" "https" {
  load_balancer_arn = aws_lb.default.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = var.acm.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.default.arn
  }
  depends_on = [
    var.acm
  ]
  tags = {
    Name = "${local.alb_name}-listener-https"
  }
}

resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_lb.default.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
  tags = {
    Name = "${local.alb_name}-listener-http"
  }
}
