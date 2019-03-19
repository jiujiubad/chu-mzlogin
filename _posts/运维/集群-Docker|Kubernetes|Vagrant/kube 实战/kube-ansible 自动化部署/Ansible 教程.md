## 问题1：Roles 最强大，还要 Inventory、Playbook 做什么？

1）Roles，作用是重复使用 playbook

2）Inventory，作用是在同一时间对多个系统（或多台服务器）进行管理

3）Playbook，作用是定义脚本（或者说配置文件）

## 问题2：Variable 变量、条件、循环，分别有什么用？

1）Variable 变量，帝国大厦只有一个

2）条件

when

```
- include: tasks/sometasks.yml
  when: "'reticulating splines' in output"
```

条件导入，比如在 CentOs 和 Debian 系统用不同文件

```
---
- hosts: all
  remote_user: root
  vars_files:
    - "vars/common.yml"
    - [ "vars/{{ ansible_os_family }}.yml", "vars/os_defaults.yml" ]
```

注册变量，‘register’ 关键词决定了把结果存储在哪个变量中

```
- name: test play
  hosts: all

  tasks:

      - shell: cat /etc/motd
        register: motd_contents

      - shell: echo "motd contains the word hi"
        when: motd_contents.stdout.find('hi') != -1
```

3）循环

标准循环

```
- name: add several users
  user: name={{ item }} state=present groups=wheel
```

嵌套循环

```
- name: here, 'users' contains the above list of employees
  mysql_user: name={{ item[0] }} priv={{ item[1] }}.*:ALL append_privs=yes password=foo
  with_nested:
    - "{{users}}"
    - [ 'clientdb', 'employeedb', 'providerdb' ]
```

```
# 对哈希表循环
with_dict: "{{users}}" 

# 对文件列表循环
with_fileglob:
        - /playbooks/files/fooapp/*

# 对并行数据集循环
with_together:
        - "{{alpha}}"
        - "{{numbers}}"
        
# 对子元素循环
with_subelements:
     - users
     - authorized
          
# 对整数序列循环

```









## 强烈建议你学习 ansible-examples github代码库,里面有大量使用变量的例子. 

































# 一、Playbooks 介绍

## 1.	demo

### 1.1	demo：只有一个play的playbook

```
---
- hosts: webservers  #一个或多个主机
  vars:
    http_port: 80
    max_clients: 200
  remote_user: root  #账户名
  tasks:
  - name: ensure apache is at the latest version  #task必须有name
    yum: pkg=httpd state=latest
  - name: write the apache config file
    template: src=/srv/httpd.j2 dest=/etc/httpd.conf
    notify:
    - restart apache
  - name: ensure apache is running
    service: name=httpd state=started
  handlers:
    - name: restart apache
      service: name=httpd state=restarted
```

## 2.	概念

### 2.1	playbooks 是什么

playbooks 是一种简单的配置管理系统与多机器部署系统的基础

Playbooks 可用于声明配置,更强大的地方在于,在 playbooks 中可以编排有序的执行过程

playbook 由一个或多个 ‘plays’ 组成.它的内容是一个以 ‘plays’ 为元素的列表.

### 2.2	play 的内容是 tasks

一个 play 所要达成 的目标，是将一组系统映射为多个角色

在 ansible 中,play 的内容,被称为 tasks,即任务.

在基本层次的应用中,一个任务是一个对 ansible 模块的调用

### 2.3	tasks 的目标是执行 module 

每个 task 的目标在于执行一个 moudle, 通常是带有特定的参数来执行.在参数中可以使用变量（variables）.

modules 具有”幂等”性,意思是如果你再一次地执行 moudle，moudle 只会执行必要的改动,只会改变需要改变的地方

比较特别的两个 modudle 是 command 和 shell ,它们不使用 key=value 格式的参数

### 2.4	Handlers 与 tasks 类似，但多用于重启

```
- name: template configuration file
  template: src=template.j2 dest=/etc/foo.conf
  notify:
     - restart memcached
     - restart apache
```

`notify`下列出的即是 handlers.

Handlers 也是一些 task 的列表,通过名字来引用,它们和一般的 task 并没有什么区别.

Handlers 是由通知者进行 notify, 如果没有被 notify,handlers 不会执行.

不管有多少个通知者进行了 notify,等到 play 中的所有 task 执行完成之后,handlers 也只会被执行一次.

Handlers 最佳的应用场景是用来重启服务,或者触发系统重启操作.除此以外很少用到了.



# 二、Playbook Roles 和 Include 语句

## 3.	include

常备用作将一个 playbook 文件中的命令导入到另外一个 playbook

Include 指令可以跟普通的 task 混合在一起使用

## 4.	Role

Roles 基于一个已知的文件结构，去自动的加载某些 vars_files，tasks 以及 handlers

注意：你仍然可以在 playbook 中松散地列出 tasks，vars_files 以及 handlers，这种方式仍然可用，但 roles 是一种很好的具有组织性的功能特性，我们强烈建议使用它。如果你在 playbook 中同时使用 roles 和 tasks，vars_files 或者 handlers，roles 将优先执行。

### 4.1	代码

demo_项目

```
site.yml
webservers.yml
fooservers.yml
roles/
   common/
     files/
     templates/
     tasks/
     handlers/
     vars/
     defaults/
     meta/
   webservers/
     files/
     templates/
     tasks/
     handlers/
     vars/
     defaults/
     meta/
```

demo_playbook

```
---
- hosts: webservers
  roles:
     - common
     - webservers
```

### 4.2	角色默认变量

roles 目录下添加 `defaults/main.yml` 文件。

这些变量在所有可用变量中拥有最低优先级，可能被其他地方定义的变量(包括 inventory 中的变量)所覆盖。

### 4.3	角色依赖

角色依赖，保存在 roles 目录下的 `meta/main.yml `文件中。

可以自动地将其他 roles 拉取到现在使用的 role 中。

角色依赖，总是在 role （包含”角色依赖”的role）之前执行，并且是递归地执行。

### 4.4	在 Roles 中嵌入模块



### 4.5	Ansible Galaxy 