* 201804
* 编程+rails

### devise登录报错与ruby2.5.0

### devise/sessions_controller.rb:5: syntax error, unexpected '{'

```
SyntaxError in Devise::SessionsController#new
/Users/apple/.rvm/gems/ruby-2.5.0/gems/devise-4.2.0/app/controllers/devise/sessions_controller.rb:5: syntax error, unexpected '{', expecting keyword_end ...ion only: [:create, :destroy] { request.env["devise.skip_tim... ... ^ /Users/apple/.rvm/gems/ruby-2.5.0/gems/devise-4.2.0/app/controllers/devise/sessions_controller.rb:5: syntax error, unexpected '}', expecting keyword_end ..."devise.skip_timeout"] = true } ... ^
Extracted source (around line #5):
3
4       
  prepend_before_action :allow_params_authentication!, only: :create
  prepend_before_action :verify_signed_out_user, only: :destroy
  prepend_before_action only: [:create, :destroy] { request.env["devise.skip_timeout"] = true }
```

### 原因：

* 来源于ruby2.5.0和devise冲突，https://github.com/plataformatec/devise/issues/4739

### 解决办法一：换版本

```
gem 'devise', '~> 4.4', '>= 4.4.3'
```

### 解决办法二（20180606测试失败）：修改本地devise文件

```
vi /Users/apple/.rvm/gems/ruby-2.5.0/gems/devise-4.2.0/app/controllers/devise/sessions_controller.rb
```

把这段命令

```
prepend_before_filter only: [:create, :destroy] { request.env["devise.skip_timeout"] = true }
```

改成

```
prepend_before_filter(only: [:create, :destroy]) { request.env["devise.skip_timeout"] = true }
```

然后

```
bundle show devise
```

参考文档：https://mensfeld.pl/2017/12/ruby-2-5-0-upgrade-remarks/