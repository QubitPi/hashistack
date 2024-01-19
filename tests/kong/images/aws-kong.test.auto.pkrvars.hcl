build_source                     = "docker.ubuntu"
aws_image_region                 = "us-east-1"
ami_name                         = "test-kong-ami"
image_home_dir                   = "/"
instance_type                    = "t2.small"
aws_kong_ssl_cert_file_path        = "../../fullchain.pem.test"
aws_kong_ssl_cert_key_file_path    = "../../privkey.pem.test"
aws_kong_nginx_config_file_path    = "../../nginx.conf.test"