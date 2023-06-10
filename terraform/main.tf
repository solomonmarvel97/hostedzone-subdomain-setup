resource "aws_route53_zone" "my_hosted_zone" {
  name = "capitalcitydev.com"
  comment = "My hosted zone"

  tags = {
    Name = "MyHostedZone"
  }
}
