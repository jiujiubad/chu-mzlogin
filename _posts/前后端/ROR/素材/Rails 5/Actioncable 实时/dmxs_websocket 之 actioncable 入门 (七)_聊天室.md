# websocket 之 actioncable 入门 (七)_聊天室

20180713	【聊天室】【actioncable】【websocket】【sidekiq】

xs项目代码：https://github.com/jiujiubad/dmxs_actioncable

## 1.	介绍

websocket的序列文章重点要讲的就是[actioncable](https://github.com/rails/rails/tree/master/actioncable)，之前也讲了好多关于各种方式实现聊天室的文章，相信从中，也能学到好多关于websocket实践的知识和经验，这节要来讲讲actioncable。

actioncable是集成在rails 5中的一个功能，它能够轻易的在rails中使用websocket。现在先把actioncable用起来，再慢慢研究其原理和特性。

## 2.	使用

还是跟先前的例子一样，建立一个聊天室。

### 步骤	2.1 聊天室界面

首先，rails的版本必须得是5以上

```elm
$ rails new dmxs_actioncable
$ cd dmxs_actioncable
```

这样就生成了一个新项目。

接着创建message这个model，存储聊天记录。

```elm
$ rails g model message content:text
$ rails db:migrate
```

创建聊天室的界面。

在config/routes.rb中添加路由。

```r
Rails.application.routes.draw do
  get 'rooms/show'
end
```

创建controller

```elm
rails g controller rooms
rails g controller messages
```

添加`app/controllers/rooms_controller.rb`文件，内容如下：

```elm
class RoomsController < ApplicationController
  def show
    @messages = Message.all
  end
end
```

添加view，添加`app/views/rooms/show.html.erb`文件，内容如下：

```r
<h1>Chat room</h1>

<div id="messages">
  <%= render @messages %>
</div>

<form>
  <label>Say something:</label><br>
  <input type="text" data-behavior="room_speaker">
</form>
```

还有`app/views/messages/_message.html.erb`文件，内容如下：

```elm
<div class="message">
  <p><%= message.content %></p>
</div>
```

到目前为止，按照之前的经验，界面都建立好了，如下图所示：

![](https://ws1.sinaimg.cn/large/006tKfTcgy1ft83l5r1e4j30aj069mxv.jpg)

### 步骤	2.2 开启websocket

先在客户端浏览器中开启websocket请求。

rails5自带actioncable，默认提供了一个文件`app/assets/javascripts/cable.js`，不需要修改，内容如下：

```elm
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
```

其实这些js的内容很简单，它做的主要的事情就是前面几篇文章所讲的在客户端浏览器执行`new WebSocket`，具体的内容可以查看其源码。

还要在路由中添加下面这行，把websocket服务以engine的方式挂载起来。

```r
mount ActionCable.server => '/cable'
```

至此，websocket已经开启了，可以通过chrome浏览器的开发者工具查看链接的信息，只要有101协议的信息，表示就是成功的。

实测发现，要继续做下一步`rails g channel room speak`，才会出现101协议。

[![img](https://ws3.sinaimg.cn/large/006tKfTcgy1ft83l1ypvxj30r105oq46.jpg)](https://rails365.oss-cn-shenzhen.aliyuncs.com/uploads/photo/image/150/2016/b3069a500b027d123014a5b9bf68a4e0.png) 



### 步骤	2.3 channel

现在要让客户端和服务器端连接起来。

actioncable提供了一个叫做`channel`的技术，中文名可以称为`"通道"`。actioncable是一种`pub/sub`的架构，服务器通过channel发布消息，多个客户端通过对应的channel订阅消息，服务器能够广播消息给客户端，从而实现客户端和服务器端的交互。

先新建一个channel。

```elm
$ rails g channel room speak
```

修改`app/channels/room_channel.rb`文件，内容如下：

```r
class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # ActionCable.server.broadcast "room_channel", message: data['message']
    Message.create! content: data['message']
  end
end
```

其中定义了三个方法，分别是`subscribed`，`unsubscribed`，`speak`。

`subscribed`和`unsubscribed`方法是默认就生成的，而`speak`是我们自己定义的。

`subscribed`表示的是当客户端连接上来的时候使用的方法。

`unsubscribed`表示的是当客户端与服务器失去连接的时候使用的方法。

还有，`app/assets/javascripts/channels/room.coffee`文件，内容如下：

```r
App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $('#messages').append data['message']
    # Called when there's incoming data on the websocket for this channel

  speak: (message) ->
    @perform 'speak', message: message

$(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
  if event.keyCode is 13 # return = send
    App.room.speak event.target.value
    event.target.value = ""
    event.preventDefault()
```

`App.room`里定义了四个方法，除了`speak`，`connected`、`disconnected`、`received`都是actioncable定义的。

这几个方法可以和`RoomChannel`里的方法对应起来，比如：

`connected`和`subscribed`对应，表示客户端和服务器端连接之后的情况。

`disconnected`和`unsubscribed`对应，表示客户端和服务器端失去连接之后的情况。

`received`表示从服务器接收到信息之后的情况。因为服务器总是要向客户端推送信息的，接收完信息之后，就可以在这里进行一些页面上的操作，比如DOM更新等。

`room.coffee`文件中有重要的一行`App.room.speak event.target.value`，当键入聊天信息，一按回车键后，就会通过这行代码，把聊天信息，发送到后端服务器，并且会被`room_channel.rb`中的`speak`接收，执行`Message.create! content: data['message']`命令。

### 步骤	2.4 activejob

现在还没真正完成，还差一部分。

`room.coffee`文件中有一个`received`方法，它有一行指令`$('#messages').append data['message']`。

这个表示当聊天信息发出时，会在聊天信息展示界面上添加聊天的内容。

现在来处理这个，我们通过activejob来处理，还记得之前的`app/views/messages/_message.html.erb`文件吗，现在要发挥它的作用。

先建立一个job。

```elm
$ rails g job message_broadcast
```

修改`app/jobs/message_broadcast_job.rb`文件，内容如下：

```r
class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast 'room_channel', message: render_message(message)
  end

  private
    def render_message(message)
      ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
    end
end
```

还要在一个地方执行这个job，是当创建完message的时候。

修改`app/models/message.rb`文件，内容如下：

```elm
class Message < ApplicationRecord
  after_create_commit { MessageBroadcastJob.set(wait: 1.seconds).perform_later self }
end
```

设置了延迟1秒执行任务

### 步骤	2.5 安装jquery-rails

打开`Gemfile文件`

``` r
# 用来实时显示消息(还需要引入js,详见https://github.com/rails/jquery-rails)
gem 'jquery-rails', '~> 4.3', '>= 4.3.3'
```

在`app/assets/javascripts/application.js`文件引入两行jquery代码，顺序如下

``` elm
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require jquery_ujs
//= require_tree .
```



做完这一切，重启一下服务器。

现在来看下效果：

![](https://ws2.sinaimg.cn/large/006tKfTcgy1ft84j963qyg30gy0aajs9.gif)

## 参考文档：

websocket 之 actioncable 入门 (七)：https://www.rails365.net/articles/websocket-zhi-actioncable-jin-jie-ba

gem jqurey-rails：https://github.com/rails/jquery-rails ，https://rubygems.org/gems/jquery-rails