[TOC]

How To Create a Kubernetes 1.10 Cluster Using Kubeadm on Ubuntu 16.04

```
# 标题
20180808【标签1】【标签2】【标签3】

* 简单说明 *

### 简介

## 目标
蟹蟹蟹蟹写写写寻
* 发扥东扥打算
发动啊发动啊 

## 准备
* 放大阿森
* 跟团官网
* 观光团委

## Step 1 — Setting Up the Workspace Directory and Ansible Inventory File

## Step 2 — Creating a Non-Root User on All Remote Servers
```



# How To Create a Kubernetes 1.10 Cluster Using Kubeadm on Ubuntu 16.04

PostedApril 25, 2018 【kubernetes】【docker】【ansible】【nginx】【ubuntu 16.04】



*The author selected the Free and Open Source Fund to receive a donation as part of the Write for DOnations program.*

### Introduction

[Kubernetes](https://kubernetes.io/) is a container orchestration system that manages containers at scale. Initially developed by Google based on its experience running containers in production, Kubernetes is open source and actively developed by a community around the world.

[Kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/) automates the installation and configuration of Kubernetes components such as the API server, Controller Manager, and Kube DNS. It does not, however, create users or handle the installation of operating system level dependencies and their configuration. For these preliminary tasks, it is possible to use a configuration management tool like [Ansible](https://www.ansible.com/) or [SaltStack](https://saltstack.com/). Using these tools makes creating additional clusters or recreating existing clusters much simpler and less error prone.

In this guide, you will set up a Kubernetes cluster from scratch using Ansible and Kubeadm, and then deploy a containerized Nginx application to it.

## Goals

Your cluster will include the following physical resources:

- **One master node**

The master node (a *node* in Kubernetes refers to a server) is responsible for managing the state of the cluster. It runs [Etcd](https://github.com/coreos/etcd), which stores cluster data among components that schedule workloads to worker nodes.

- **Two worker nodes**

Worker nodes are the servers where your *workloads* (i.e. containerized applications and services) will run. A worker will continue to run your workload once they're assigned to it, even if the master goes down once scheduling is complete. A cluster's capacity can be increased by adding workers.

After completing this guide, you will have a cluster ready to run containerized applications, provided that the servers in the cluster have sufficient CPU and RAM resources for your applications to consume. Almost any traditional Unix application including web applications, databases, daemons, and command line tools can be containerized and made to run on the cluster. The cluster itself will consume around 300-500MB of memory and 10% of CPU on each node.

Once the cluster is set up, you will deploy the web server [Nginx](https://nginx.org/en/) to it to ensure that it is running workloads correctly.

## Prerequisites

- An SSH key pair on your local Linux/Mac OS/BSD machine. If you haven't used SSH keys before, you can learn how to set them up by following [this explanation of how to set up SSH keys on your local machine](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys#generating-and-working-with-ssh-keys).
- Three servers running Ubuntu 16.04 with at least 1GB RAM. You should be able to SSH into each server as the root user with your SSH key pair.
- Ansible installed on your local machine. If you're running Ubuntu 16.04 as your OS, follow the "Step 1 - Installing Ansible" section in [How to Install and Configure Ansible on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-ansible-on-ubuntu-16-04) to install Ansible. For installation instructions on other platforms like Mac OS X or CentOS, follow the [official Ansible installation documentation](http://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-the-control-machine).
- Familiarity with Ansible playbooks. For review, check out [Configuration Management 101: Writing Ansible Playbooks](https://www.digitalocean.com/community/tutorials/configuration-management-101-writing-ansible-playbooks).
- Knowledge of how to launch a container from a Docker image. Look at "Step 5 — Running a Docker Container" in [How To Install and Use Docker on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04#step-5-%E2%80%94-running-a-docker-container) if you need a refresher.

## Step 1 — Setting Up the Workspace Directory and Ansible Inventory File

In this section, you will create a directory on your local machine that will serve as your workspace. You will also configure Ansible locally so that it can communicate with and execute commands on your remote servers. To do this, you will create a `hosts` file containing inventory information such as the IP addresses of your servers and the groups that each server belongs to.

Out of your three servers, one will be the master with an IP displayed as `master_ip`. The other two servers will be workers and will have the IPs `worker_1_ip` and `worker_2_ip`.

Create a directory named `~/kube-cluster` in the home directory of your local machine and `cd` into it:

```r
mkdir ~/kube-cluster
cd ~/kube-cluster
```

This directory will be your workspace for the rest of the tutorial and will contain all of your Ansible playbooks. It will also be the directory inside which you will run all local commands.

Create a file named `~/kube-cluster/hosts` using `nano` or your favorite text editor:

```r
nano ~/kube-cluster/hosts
```

Add the following text to the file, which will specify information about the logical structure of your cluster:

~/kube-cluster/hosts

```r
[masters]
master ansible_host=master_ip ansible_user=root

[workers]
worker1 ansible_host=worker_1_ip ansible_user=root
worker2 ansible_host=worker_2_ip ansible_user=root

[all:vars]
ansible_python_interpreter=/usr/bin/python3
```

You may recall that [*inventory files*](http://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html) in Ansible are used to specify server information such as IP addresses, remote users, and groupings of servers to target as a single unit for executing commands. `~/kube-cluster/hosts` will be your inventory file and you've added two Ansible groups (**masters** and **workers**) to it specifying the logical structure of your cluster.

In the **masters** group, there is a server entry named "master" that lists the master node's IP (`master_ip`) and specifies that Ansible should run remote commands as the root user.

Similarly, in the **workers** group, there are two entries for the worker servers (`worker_1_ip` and `worker_2_ip`) that also specify the `ansible_user` as root.

The last line of the file tells Ansible to use the remote servers' Python 3 interpreters for its management operations.

Save and close the file after you've added the text.

Having set up the server inventory with groups, let's move on to installing operating system level dependencies and creating configuration settings.

## Step 2 — Creating a Non-Root User on All Remote Servers

In this section you will create a non-root user with sudo privileges on all servers so that you can SSH into them manually as an unprivileged user. This can be useful if, for example, you would like to see system information with commands such as `top/htop`, view a list of running containers, or change configuration files owned by root. These operations are routinely performed during the maintenance of a cluster, and using a non-root user for such tasks minimizes the risk of modifying or deleting important files or unintentionally performing other dangerous operations.

Create a file named `~/kube-cluster/initial.yml` in the workspace:

```r
nano ~/kube-cluster/initial.yml
```

Next, add the following *play* to the file to create a non-root user with sudo privileges on all of the servers. A play in Ansible is a collection of steps to be performed that target specific servers and groups. The following play will create a non-root sudo user:

~/kube-cluster/initial.yml

```r
- hosts: all
  become: yes
  tasks:
    - name: create the 'ubuntu' user
      user: name=ubuntu append=yes state=present createhome=yes shell=/bin/bash

    - name: allow 'ubuntu' to have passwordless sudo
      lineinfile:
        dest: /etc/sudoers
        line: 'ubuntu ALL=(ALL) NOPASSWD: ALL'
        validate: 'visudo -cf %s'

    - name: set up authorized keys for the ubuntu user
      authorized_key: user=ubuntu key="{{item}}"
      with_file:
        - ~/.ssh/id_rsa.pub
```

Here's a breakdown of what this playbook does:

- Creates the non-root user `ubuntu`.
- Configures the `sudoers` file to allow the `ubuntu` user to run `sudo` commands without a password prompt.
- Adds the public key in your local machine (usually `~/.ssh/id_rsa.pub`) to the remote `ubuntu`user's authorized key list. This will allow you to SSH into each server as the `ubuntu` user.

Save and close the file after you've added the text.

Next, execute the playbook by locally running:

```r
ansible-playbook -i hosts ~/kube-cluster/initial.yml
```

The command will complete within two to five minutes. On completion, you will see output similar to the following:

```r
OutputPLAY [all] ****

TASK [Gathering Facts] ****
ok: [master]
ok: [worker1]
ok: [worker2]

TASK [create the 'ubuntu' user] ****
changed: [master]
changed: [worker1]
changed: [worker2]

TASK [allow 'ubuntu' user to have passwordless sudo] ****
changed: [master]
changed: [worker1]
changed: [worker2]

TASK [set up authorized keys for the ubuntu user] ****
changed: [worker1] => (item=ssh-rsa AAAAB3...
changed: [worker2] => (item=ssh-rsa AAAAB3...
changed: [master] => (item=ssh-rsa AAAAB3...

PLAY RECAP ****
master                     : ok=5    changed=4    unreachable=0    failed=0   
worker1                    : ok=5    changed=4    unreachable=0    failed=0   
worker2                    : ok=5    changed=4    unreachable=0    failed=0   
```

Now that the preliminary setup is complete, you can move on to installing Kubernetes-specific dependencies.