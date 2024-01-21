variable "kong_admin_uri" {
  type = string
  description = "Admin API URL with port which listen for calls service/route creations over HTTPS."
}

variable "service_name" {
  type = string
  description = ""
}

variable "ws_host" {
  type = string
  description = ""
}

variable "ws_port" {
  type = string
  description = ""
}

variable "ws_api_path" {
  type = string
  description = ""
}

provider "kong" {
  kong_admin_uri = var.kong_admin_uri
}

resource "kong_service" "service" {
  name        = var.kong_admin_uri
  protocol    = "http"
  host        = var.ws_host
  port        = var.ws_port
  path        = var.ws_api_path
}

variable "route_name" {
  type = string
  description = ""
}

variable "route_paths" {
  type = list(string)
  description = ""
}

resource "kong_route" "route" {
  name            = var.route_name
  protocols       = [ "http", "https" ]
  paths           = var.route_paths
  service_id       = kong_service.service.id
}
