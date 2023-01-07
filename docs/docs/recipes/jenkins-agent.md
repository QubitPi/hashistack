[//]: # (Copyright Jiaqi Liu)

[//]: # (Licensed under the Apache License, Version 2.0 &#40;the "License"&#41;;)
[//]: # (you may not use this file except in compliance with the License.)
[//]: # (You may obtain a copy of the License at)

[//]: # (    http://www.apache.org/licenses/LICENSE-2.0)

[//]: # (Unless required by applicable law or agreed to in writing, software)
[//]: # (distributed under the License is distributed on an "AS IS" BASIS,)
[//]: # (WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.)
[//]: # (See the License for the specific language governing permissions and)
[//]: # (limitations under the License.)

---
sidebar_position: 6
---

aergia::jenkins_agent
=====================

Creates a Jenkins agent running directly on a Chef node.

The Jenkins architecture is designed for distributed build environments. It allows us to use different environments for
each build project balancing the workload among multiple agents running jobs in parallel.

The **Jenkins controller** is the original node in the Jenkins installation. The Jenkins controller administers the
**Jenkins agents** and orchestrates their work, including scheduling jobs on agents and monitoring agents. Agents may be
connected to the Jenkins controller using either local or cloud computers.

The agents require a Java installation and a network connection to the Jenkins controller and can be launched in
physical machines, virtual machines, Kubernetes clusters, and with Docker images. This section connects _Docker_ agents
to Jenkins with SSH.

Recipe Details
--------------

### Generating an SSH key Pair on Jenkins Controller Node

When Jenkins was installed on Jenkins Controller Chef node, a "**jenkins**" user has been created. Its working directory
is **/var/jenkins_home/** on the Controller, `aergia::jenkins_agent` generates they key pair under this user so Jenkins
controller can use the key pair to ssh into agent nodes with this "jenkins" user:

In the Jenkins Controller Chef node, the following command is executed:

   ```bash
   ssh-keygen -f ~/.ssh/jenkins_agent_key
   ```

:::note

- An empty passphrase to use with the key is provided
- Running the command above shall generate the output like this:

   ```bash
   ssh-keygen -f ~/.ssh/jenkins_agent_key
   Generating public/private rsa key pair.
   Enter passphrase (empty for no passphrase):
   Enter same passphrase again:
   Your identification has been saved in /home/ubuntu/.ssh/jenkins_agent_key
   Your public key has been saved in /home/ubuntu/.ssh/jenkins_agent_key.pub
   The key fingerprint is:
   SHA256:XqxxjqsLlvDD0ZHm9Y2iR7zC6IbsUlMEHo3ffy8TzGs
   The key's randomart image is:
   +---[RSA 3072]----+
   |  o+             |
   | ...o  .         |
   |  .o .+ .        |
   |    o+.+ o o     |
   |  ... o.So* .    |
   |  o+ = +.X=      |
   | o oO + *..+     |
   |. oo.o o .E .    |
   | o... oo.. o     |
   +----[SHA256]-----+
   ```

:::

### Adjusting Private Key Format (If Needed)

If the content of the file `~/.ssh/jenkins_agent_key` ends with "-----END **OPENSSH** PRIVATE KEY-----", then we will be
seeing an SSH connection error when Jenkins controller tries to ssh-connect to agent later with a `BadPaddingException`,
[this has to do with cipher default parameters](https://stackoverflow.com/a/31946825/14312712). The error indicates
that the format for private key in credential is not correct. [The Jenkins credential should be _**RSA**_ secret
   key](https://stackoverflow.com/a/54418715/14312712). In this case, `aergia::jenkins_agent`
[converts this private key from the new OPENSSH format to the older PEM format] by effectively
[executing](https://stackoverflow.com/a/63188738/14312712):

   ```bash
   cd ~/.ssh
   ssh-keygen -f jenkins_agent_key -m PEM -p
   ```

In the mean time, the **/var/jenkins_home/.ssh/jenkins_agent_key.pub** key from the "jenkins" user on the Jenkins
controller node has been recorded by `aergia::jenkins_agent` for the
[next step](#allowing-jenkins-controller-to-ssh-passwordless-into-agent-node)

:::info

Unlike Jenkins controller which runs in container, since `aergia::jenkins_agent` makes Jenkins agent run directly on
Chef node, the "jenkins" user home (`~` directory) is **"/var/lib/jenkins"**,  and we can access
"/var/lib/jenkins/.ssh/jenkins_agent_key.pub" by entering shell as 'jenkins' user using:

```bash
$ docker exec -it jenkins bash
jenkins@4fh7irw45hr:/$ whoami
jenkins
```

:::

### Configuring Jenkins Credential on Controller Node on First Use

1. Go to the Jenkins dashboard
2. Click **Manage Jenkins** option in main menu and click on the **Manage Credentials** button;

   ![Error loading jenkins-credentials-1.png](./img/jenkins-credentials-1.png)

3. Select the drop option **Add Credentials** from the global item;

   ![Error loading jenkins-credentials-2.png](./img/jenkins-credentials-2.png)

4. Fill in the form:

   - Kind: SSH Username with private key;
   - Scope: Global
   - id: jenkins
   - description: The Jenkins SSH Key
   - username: jenkins
   - Private Key: select **Enter directly** and press the **Add** button to insert the content of our private key file
     at **~/.ssh/jenkins_agent_key** (with the `-----END RSA PRIVATE KEY-----` ending, NOT
     ~~``-----END OPENSSH PRIVATE KEY-----``~~)
   - Passphrase: fill our passphrase used to generate the SSH key pair (leave empty if we didn't use one at the
     previous step)
   - press the **Create** button

### Allowing Jenkins Controller to SSH passwordless into Agent Node

Next, on the **agent** Chef node, `aergia::jenkins_agent` switches to the root user and add a jenkins user with the home
"/var/lib/jenkins"

```bash
sudo su
useradd -d /var/lib/jenkins jenkins
```

it also creates an **authorized_keys** file for the "jenkins" user on agent node:

```bash
sudo mkdir -p /var/lib/jenkins/.ssh
sudo touch /var/lib/jenkins/.ssh/authorized_keys
```

Next, `aergia::jenkins_agent` **pastes the public key ("/var/jenkins_home/.ssh/jenkins_agent_key.pub") of the Jenkins
controller from the previous step into the file "/var/lib/jenkins/.ssh/authorized_keys"** and makes sure the files have
the correct owner and permission.

```bash
sudo chown -R jenkins /var/lib/jenkins
sudo chown -R jenkins /var/lib/jenkins/.ssh
sudo chmod 600 /var/lib/jenkins/.ssh/authorized_keys
sudo chmod 700 /var/lib/jenkins/.ssh
```

:::caution

If the agent node runs on AWS EC2, we need to have the EC2 instance running Jenkins agent with a network configuration
that allows SSH access from Jenkins controller to agent, we could do that through Security Group.

:::

### Starts Jenkins Agent on Node

There are several options to run agent and `aergia::jenkins_agent` chooses one of them which is _running the agent
directly on Chef node_. (see "**RUNNING AGENT INSIDE DOCKER CONTAINER**" alternative below)

It it important to know that **a Jenkins agent is simply a Java process running on a node**. `aergia::jenkins_agent`
will simply have Java 11 installed on the Chef node running the Jenking agent:

```bash
sudo apt install openjdk-11-jre
```

:::info Running Agent Inside Docker Container

Although `aergia::jenkins_agent` does NOT do, We could alternatively run Jenkins agent inside a Docker container.

:::caution

Before considering this option, it should be known that this approach has at least one "drawback" - everything runs
inside a container. This becomes a little issue when we would CI/CD an App that's packaged in a Docker. Even though we
have our EC2 node with Docker installed, we would still need to install Docker inside agent container, because **it is
the agent that's executing the deployment, not the host**. A team which heavily dockerizes its infrastructure, this is
not easy to deal with.

On the other hand, though, running agent inside container avoids resource sharing issues

:::

:::caution

After Jenkins controller successfully ssh/connects to Agent Docker container, **anything, including error messages, we
see in Jenkins Agent Log are from _container_, NOT agent node itself**. For example, when we see from log that says
"Java not installed", we know it is the _container_ that needs to install Java, not AWS EC2 instance

:::

Here we will use the [docker-ssh-agent](https://github.com/jenkinsci/docker-ssh-agent) image to create the agent
container:

```bash
docker run -d --rm --name=jenkins-agent -p 22:22 \
-e "JENKINS_AGENT_SSH_PUBKEY=[jenkins-controller-public-key]" \
jenkins/ssh-agent:alpine
```

:::tip

In the command above, replace the tag "\[jenkins-controller-public-key\]" with the SSH public key generated in the
[previous step](#generating-an-ssh-key-pair-on-controller-nodejenkins-controller). The public key value in this example
could be found by issuing `cat ~/.ssh/jenkins_agent_key.pub` on the Jenkins controller machine. Do NOT add the square
brackets `[]` around the key value

If the EC2 instance machine already has a ssh server running on the 22 port (if we logged onto this machine using the
`ssh` command, then that's the case), we should use another port for the docker command, such as **-p 4444:22** (**but
we will then need to configure a little more on this later so please keep reading**), in this case, make sure to add a
new inbound rule to the agent node's AWS security group: Custom TCP with port range equal to **4444** and specify the
client source that includes our Jenkins controller EC2 instace (can be its private IP or its containing security group)

:::

Now run the following command to update the container environment:

```bash
VARS1="HOME=|USER=|MAIL=|LC_ALL=|LS_COLORS=|LANG="
VARS2="HOSTNAME=|PWD=|TERM=|SHLVL=|LANGUAGE=|_="
VARS="${VARS1}|${VARS2}"
docker exec jenkins-agent sh -c "env | egrep -v '^(${VARS})' >> /etc/environment"
```

This step is necessary because the image is configured to reject changes to environment variables. when the Jenkins
team fixes [this issue](https://github.com/jenkinsci/docker-ssh-agent/issues/33), we can ignore this step.

Now the container "jenkins-agent" is running and we can verify this using `docker ps -a`

:::tip

When we need to diagnose this container later, `docker container inspect jenkins-agent` can be used

:::

Now, if we move forward to the [next step](#connecting-to-agent-from-controller), we will see 2 errors ("Java 8/11 not
installed" & "Permission Denied on /var/lib/jenkins/ for 'jenkins' user") from agent (this could be fixed by Jenkins
team in the future but for now, let's fact them), so we need to do 2 more setups for the Jenkins agent running
container:

1. **Install Java 11 inside Container**:

   ```bash
   sudo docker exec -it jenkins-agent bash
   apk add openjdk11
   ```

2. **Create Jenkins user workspace manually this user access to it**:

   ```bash
   mkdir -p /var/lib/jenkins/
   chown -R jenkins /var/lib/jenkins
   ```

:::

### Connecting to Agent from Controller

1. Go to your Jenkins dashboard;
2. Go to **Manage Jenkins** option in main menu;
3. Go to **Manage Nodes and Clouds** item;

   ![Error loading jenkins-manage-node-1.png](./img/jenkins-manage-node-1.png)

4. Go to **New Node** option in side menu;
5. Fill the Node/agent name (such as "Awesome App Agent") and select the type of **Permanent Agent**
6. Now fill the fields in the next page prompted:

   - Remote root directory: **/var/lib/jenkins**
   - label: can be arbitrary
   - usage: **Only build jobs with label expression matching this node**
   - Launch method: **Launch agents via SSH**
      * Host: the **Private IPv4 addresses** of our network

        :::tip Example

        If this Chef node is a EC2 instance, the Host should be the **Private IPv4 addresses** of the EC2 instance
        running the agent

        :::

      * Credentials: [**jenkins**](#configuring-jenkins-credential-on-controller-node-on-first-use)
      * Host Key verification Strategy: **Manually trusted key verification Strategy**

   :::tip

   If, not using `aergia::jenkins_agent`, we have decided to run Jenkins agent inside Docker container, there is
   an extra followup step. Hit "**Advanced...**" under **Launch method** sub-menue and put **4444** as the port number
   because we have mapped container SSH port 22 to 4444 on Chef node

   :::

7. Press the **Save** button and the agent will be registered. Click on it. The message: `Agent successfully connected
   and online` on the last log line should appear short after

**Congratulations**! _Jenkins controller has successfully obtained a distributed node for deployment_.

Recipe Verification
-------------------

[converts this private key from the new OPENSSH format to the older PEM format]: https://stackoverflow.com/a/61095760/14312712
