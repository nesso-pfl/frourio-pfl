resource "aws_lb_target_group" "default" {
  name_prefix          = "fr-pfl"
  vpc_id               = var.vpc_id
  target_type          = "ip"
  port                 = 80
  protocol             = "HTTP"
  deregistration_delay = 300
  depends_on           = [aws_lb.default]

  health_check {
    path                = var.app_health_check_path
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    matcher             = 200
    port                = "traffic-port"
    protocol            = "HTTP"
  }

  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Name = "${var.project_name}-tg"
  }
}
