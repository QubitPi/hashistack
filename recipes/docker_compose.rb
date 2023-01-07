# Copyright Jiaqi Liu
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

apt_update 'update'

package 'ca-certificates'
package 'curl'
package 'gnupg'
package 'lsb-release'

apt_repository 'docker' do
  key 'https://download.docker.com/linux/ubuntu/gpg'
  uri 'https://download.docker.com/linux/ubuntu'
  arch 'amd64'
  distribution node['os_release']['version_codename']
  components ['stable']
  deb_src true
  action :add
end

apt_update 'update'
package 'docker-compose-plugin'
