apt_update 'update'

# install a few prerequisite packages which let apt use packages over HTTPS
package 'apt-transport-https'
package 'ca-certificates'
package 'curl'
package 'software-properties-common'

# Adds the Docker repository to APT sources
apt_repository 'docker' do
  key 'https://download.docker.com/linux/ubuntu/gpg'
  uri 'https://download.docker.com/linux/ubuntu'
  arch 'amd64'
  distribution node['os_release']['version_codename']
  components ['stable']
  deb_src true
  action :add
end

# Install Docker
package 'docker-ce'
