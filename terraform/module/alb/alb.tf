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
    Name  = "${var.tag_name}-alb"
    group = "${var.tag_group}"
  }
}

resource "aws_alb_listener" "default" {
  load_balancer_arn = aws_lb.default.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.default.arn
  }
}
