---
title: ror-system-rails tutorial笔记
date: '2018-01-30 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 2d155860

---

* 201802
* 编程+rails



[TOC]





▲▲▲测试的情景，写法对应哪一章节？——目的是在其他专案也知道怎么写测试

twitter的MVC关系？用devise是不是可以省略中间的章节？——目的是理清twitter最小模型，可以完成练习题

首页显示其他用户的动态是怎么实现？——目的是在其他专案写动态效果





## 推荐课程和书籍

### 第三章

codeschool的rspec，可以解惑很多rspec的疑问。https://www.codeschool.com/courses/testing-with-rspec

### 第四章

读完本书后读一本专门针对ruby的书：《Ruby入门》、《The Well-Grounded Rubyist》、或《Ruby之道》。



## tip1、新建专案

rails new 

git init

.gitignore忽略rails应用程序文档，vim和emacs的交换文件swap file，mac finder生成的.DS_Store文件

```
# Ignore bundler config.
/.bundle
# Ignore the default SQLite database.
/db/*.sqlite3
/db/*.sqlite3-journal
# Ignore all logfiles and tempfiles.
/log/*.log
/tmp
# Ignore other unneeded files.
doc/
*.swp
*~
.project
.DS_Store
.idea
```

```
bundle install --without production #不安装生产环境的gem
```

README.md

2.3.5 config/environments/production.rb

```
DemoApp::Application.configure do
  config.serve_static_assets = true
end
```

## tip2、rails c 命令4.2、4.3、第六章、8.2.2

### 【1】常用

常用方法：length、first、last、sort、reverse、shuffle打乱、to_a/i/f/s、inspect、class、superclass、evn

布尔方法：empty?，比如nil.to_s.empty?。blank?。present?。valid?，全部验证都通过返回true。evn.test/development/production?

显示报错详情：.errors.full_messages

转换方法：split，字符转数组。join，数组转字符。push，同<<，生成新数组。

控制流程：==、!=

块：each、map同collect执行并返回数组、

```
(0..9).to_a #Range
```

```
a = %w[foo bar baz quux] #创建一个元素为字符串的数组
```

### 【2】rails c 里针对错误信息的命令7.3.3

```
u.errors.full_messages
u.errors.count
u.errors.empty?
u.errors.any?
```

其中，count?、empty?、any?都可以用在ruby数组上。

### 【3】8.2.2 日期、文件大小

```
 >> 1.year.from_now
 => Sun, 13 Mar 2011 03:38:55 UTC +00:00
 >> 10.weeks.ago
 => Sat, 02 Jan 2010 03:39:14 UTC +00:00
 
 >> 1.kilobyte
 => 1024
 >> 5.megabytes
 => 5242880
```

### 【4】9.1.1 资料是否在数据库中

```
$ rails console
>> User.new.new_record?
=> true
>> User.first.new_record?
=> false
```

## tip3、rails命令 第六章很多

1）删除文件。-rf意思是强制递归，无需确认就删除。

```
rm -rf xxx 
```

2）不安装生产环境的gem

```
bundle install --without production
```

3）db前进

```
rake db:migrate
```

4）db后退

```
rake db:rollback
```

或是用以下命令。0是回到最开始的版本，数字对应不同版本。与rake db:rollback类似

```
rake db:migrate VERSION=0
```

4）不生成测试文件（暂时不建议用，因为2017rails测试改版）

```
rails new sample_app --skip-test-unit #忽略测试文件。但是2017新版好像很好用。
```

```
rails generate controller StaticPages home help --no-test-framework
```

## tip4、heroku命令1.4.4

```
heroku login
heroku create
heroku open
heroku logs
heroku rename xxx
git push heroku master
heroku pg:reset DATABASE
heroku rake db:migrate
heroku rake db:populate //在lib/task的rake文件中定义的
heroku restart 强制重启heroku应用程序
```

heroku命令，http://devcenter.heroku.com/heroku-command

heroku自定义域名，https://devcenter.heroku.com/

## tip5、rspec命令

1）生成测试文件的命令

```
rails g integration_test xxxx
```

2）运行测试

```
rake
```

或

```
rspec spec
```

或

```
rspec 文件夹/文件名
```

3）rails g 生成文件后，要准备相应的测试数据库

```
rails g xxx
rake db:migrate
rake test:prepare #这个代码比较旧，改用下面的
rails db:migrate RAILS_ENV=test
```

测试中常用：

```
rake db:reset
rails db:migrate RAILS_ENV=test
rake db:populate //在lib/task的rake文件中定义的，导入测试数据。
```

4）指定运行某个测试用例，其中“single page”是描述的内容

```
rspec spec/requests/user_pages_spec.rb -e "signup page"
```



# rspec代码重构：

## 1、5.3.4 单个案例，重复使用的动作。

比如访问首页。重构前：

```
visit root_path
```

重构后：

```
before { visit root_path } #before还有别名方法before(:each)
```

## 2、5.3.4 单个案例，测试对象用subject{xx}。

重构前：

```
expect(page).to have_content('Sample App')
```

重构后：

```
subject { page } #page就是要测试的对象
it { should have_content('Sample App') }
```

其中，should会自动使用capybara提供的page变量。

## 3、5.3.4 rspec通用函数文件

1）比如，spec/support/utilities.rb

```
def full_title(page_title)
  base_title = "Ruby on Rails Tutorial Sample App"
  if page_title.empty?
    base_title
  else
    "#{base_title} | #{page_title}"
  end
end
```

2）简化后的代码

```
describe "Static pages" do
  subject { page }
  describe "Home page" do
    before { visit root_path }
    it { should have_content('Sample App') }
    it { should have_title(full_title('')) }
    it { should_not have_title('| Home') }
  end
  describe "Help page" do
    before { visit help_path }
    it { should have_content('Help') }
    it { should have_title(full_title('Help')) }
  end
end
```

3）【问题】更好的方式是直接测试原来那个full_tilte方法，参见5.6练习？另外，代码还可以变的更简洁，详见5.6节，我们都会用这种方式。

## 4、5.6 多个案例，rspec的shared example功能

1）提取相同部分，定义shared_example

```
shared_examples_for "all static pages" do
```

2）let方法用指定的值创建局部变量

```
let(:heading)    { 'Sample App' }
let(:page_title) { '' }
```

3）调用shared_example

```
it_should_behave_like "all static pages"
```

结果如下：

```
describe "Static pages" do
  subject { page }
  shared_examples_for "all static pages" do
    it { should have_content(heading) }
    it { should have_title(full_title(page_title)) }
  end
  describe "Home page" do
    before { visit root_path }
    let(:heading)    { 'Sample App' }
    let(:page_title) { '' }
    it_should_behave_like "all static pages"
    it { should_not have_title('| Home') }
  end
end
```

## 5、用factorygirl/factorybot生成预购件

## 6、8.3.3、8.5练习 帮助函数和自定义匹配器

1）定义帮助函数和自定义匹配器

spec/support/utilities.rb

```
include ApplicationHelper
def valid_signin(user)  #自定义valid_signin(user)函数
  fill_in "Email",    with: user.email
  fill_in "Password", with: user.password
  click_button "Sign in"
end
RSpec::Matchers.define :have_error_message do |message| #自定义匹配器have_error_message
  match do |page|
    expect(page).to have_selector('div.alert.alert-error', text: message)
  end
end
```

2）重构代码，比如情景13，8.1.2节案例

```
it { should have_error_message('Invalid') }

describe "with valid information" do
  let(:user) { FactoryGirl.create(:user) }
  before { valid_signin(user) }
  .
  .
```

## 7、9.1.1 帮助函数

spec/support/utilities.rb

```
def sign_in(user, options={})
  if options[:no_capybara]
  # Sign in when not using Capybara.
  remember_token = User.new_remember_token
  cookies[:remember_token] = remember_token user.update_attribute(:remember_token,     User.encrypt(remember_token))
  else
    visit signin_path
    fill_in "Email",    with: user.email
    fill_in "Password", with: user.password
    click_button "Sign in"
  end 
end
```

解读：

* if options[:no_capybara]，如果没有用Capybara的话，填写表单的操作是无效的，此时跳过默认的登录操作，直接处理cookie
* 注意：cookie.permanent方法不能在测试中使用。



# rspec情景：

1、目的：

* 知道大概什么情景要写测试，主要抓住什么点去写（title/selector/content等），相应的代码是怎么写的。
* 代码重构的写法。

2、情景主要分类：——常分为valid、invalid

* 创建栏位，验证栏位存在、权限限制、身份验证。
* 创建页面，验证页面存在、页面是否成功跳转。
* CRUD的验证。

## 1、新建页面时，测试是否正在这个页面。

5.3.4重构测试home等页面的title和h1文字，与5.4.2测试User页面相同。

### 5.3.4

用have_content，检测含有文字'Sample App'。

spec/requests/static_pages_spec.rb

```
describe "Static pages" do
  subject { page }
  describe "Home page" do
    before { visit root_path }
    it { should have_content('Sample App') }
  end
end
```

### 7.1.3

spec/requests/user_pages_spec.rb

```
describe "User pages" do
  subject { page }
  describe "profile page" do
    let(:user) { FactoryGirl.create(:user) } #用let方法是factorygirl生成User对象
    before { visit user_path(user) }
    it { should have_content(user.name) }
    it { should have_title(user.name) }
  end
  describe "signup page" do
    before { visit signup_path }
    it { should have_content('Sign up') }
    it { should have_title(full_title('Sign up')) }
  end
end
```

### 8.1.1

1）spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  subject { page }
  describe "signin page" do
    before { visit signin_path }
    it { should have_content('Sign in') }
    it { should have_title('Sign in') }
  end
end  
```

2）8.1.1 让测试通过：

①、设置路由config/routes，修改登录/退出的具名路由，session路由还是用默认。

```
resources :sessions, only: [:new, :create, :destroy]
match '/signin',  to: 'sessions#new', via:'get'
match '/signout', to: 'sessions#destroy', via:'get'
```

其中，外卡路由不安全，写法要自己修改。

②、controller加入动作

```
  def new
  end
  def create
  end
  def destroy
  end
```

<img src="https://ws4.sinaimg.cn/large/006tKfTcgy1fo3b1pak3dj30hr05faab.jpg" width="500">

③、view页面

app/views/sessions/new.html.erb

```
<% provide(:title, "Sign in") %>
<h1>Sign in</h1>
```

## 2、5.3.4 新建页面后，测试是否包含标题。

用have_title，检测含有标题"Ruby on Rails Tutorial Sample App | Home"。并新增一个测试，不包含“| Home”。

1）测试代码

spec/requests/static_pages_spec.rb

```
describe "Static pages" do

  describe "Home page" do
    it "should have the h1 'Sample App'" do
      visit root_path
      expect(page).to have_content('Sample App')
	end
    it "should have the base title" do
      visit root_path
      expect(page).to have_title("Ruby on Rails Tutorial Sample App")
	end
    it "should not have a custom page title" do
      visit root_path
      expect(page).not_to have_title('| Home')
	end 
  end
  
  describe "Help page" do
    it "should have the h1 'Help'" do
      visit help_path
      expect(page).to have_content('Help')
	end
    it "should have the title 'Help'" do
      visit help_path
      expect(page).to have_title("Ruby on Rails Tutorial Sample App | Help")
	end 
  end
end      
```

2）application.html.erb

```
<title><%= full_title(yield(:title)) %></title>
```

3）app/helpers/application_helper.rb

```
def full_title(page_title)
  base_title = "Ruby on Rails Tutorial Sample App"
  if page_title.empty?
    base_title
  else
    "#{base_title} | #{page_title}"
  end
end
```

4）home.html.erb

```
<% provide(:title, 'Home') %> #把Home赋值给title
```

## 3、5.6 测试首页navbar的链接地址

1）使用visit和click_link

spec/requests/static_pages_spec.rb

```
describe "Static pages" do
  it "should have the right links on the layout" do
    visit root_path
    click_link "About"
    expect(page).to have_title(full_title('About Us')) 
    click_link "Help"
    expect(page).to # fill in
    click_link "Contact"
    expect(page).to # fill in
    click_link "Home"
    click_link "Sign up now!"
    expect(page).to # fill in
    click_link "sample app"
    expect(page).to # fill in
  end 
end
```

> 以上代码可以按rspec部分的第1、第2点重构

## 4、5.6 测试rspec辅助方法full_title

1）spec/helpers/application_helper_spec.rb

```
describe ApplicationHelper do
  describe "full_title" do
    it "should include the page title" do
      expect(full_title("foo")).to match(/foo/)
    end
    it "should include the base title" do
      expect(full_title("foo")).to match(/^Ruby on Rails Tutorial Sample App/)
	end
    it "should not include a bar for the home page" do
      expect(full_title("")).not_to match(/\|/)
	end 
  end
end
```

【问题】match是匹配的意思？跟eq的区别是？

2）spec/support/utilities.rb，引用helper

```
include ApplicationHelper
```

## 5、6.2.1 新增栏位时，测试栏位

spec/models/user_spec.rb

```
describe User do
  before { @user = User.new(name: "Example User", email: "user@example.com") } #创建@user
  subject { @user } #默认测试对象是@user
  it { should respond_to(:name) } #respond_to方法，若响应指定的方法或属性则返回true
  it { should respond_to(:email) }
end
```

其中，使用ruby的respond_to?方法，接受一个Symbol参数，如果能响应指定的方法或属性则返回true。

由于rspec对布尔值的约定，这里省略问号。

## 6、6.2.2 限制栏位：不能为空

以6.2.2的name栏位为例，剩下的email栏位写法相同。

1）spec/models/user_spec.rb

```
describe User do
  before { @user = User.new(name: "Example User", 
                            email: "user@example.com",
                            password: "foobar",
                            password_confirmation: "foobar") } #创建@user
  subject { @user } #默认测试对象是@user
  it { should respond_to(:name) } #respond_to方法，若响应指定的方法或属性则返回true
  it { should respond_to(:email) }

  it { should be_valid } #在开始测试前，确保@user是能通过validates验证的
  
  describe "when name is not present" do
    before { @user.name = " " } #设置一个不合法的值
    it { should_not be_valid } #期望不能通过验证
  end
end
```

> 注意：只要对象可以响应布尔值方法，比如foo?，就有对应的be_foo方法可以在rspec测试中使用。

2）让测试通过，要加入validates验证

app/models/user.rb

```
class User < ActiveRecord::Base
  validates(:name, presence: true) #括号可以省略
end
```

## 7、6.2.3 限制栏位：长度

1）在6.2.2的基础上，增加describe测试

spec/models/user_spec.rb

```
describe "when name is too long" do
  before { @user.name = "a" * 51 }
  it { should_not be_valid }
end
```

2）让测试通过

app/models/user.rb

```
validates :name,  presence: true, length: { maximum: 50 }
```

## 8、6.2.4 限制栏位：email格式

1）在6.2.2的基础上，增加describe测试。

spec/models/user_spec.rb

```
describe "when email format is invalid" do  
  it "should be invalid" do
    addresses = %w[user@foo,com user_at_foo.org example.user@foo. 
                   foo@bar_baz.com foo@bar+baz.com]  #用%w[]创建字符串阵列
    addresses.each do |invalid_address|
      @user.email = invalid_address
      expect(@user).not_to be_valid
    end 
  end
end

describe "when email format is valid" do
  it "should be valid" do
    addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
    addresses.each do |valid_address|
      @user.email = valid_address
      expect(@user).to be_valid
    end
  end
end
```

第一个测试，包含一些不合法的邮箱格式。

第二个测试，包含一些合法的邮箱格式，如大写字母、下划线、子域名等。

2）让测试通过

用validates方法的 :format 参数指定合法格式。

app/models/user.rb

```
VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i  #把正则表达式定义为常量，值不变。
validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }
```

> 注意：这个表达式有漏洞，可以匹配foo@bar..com，在6.5节改善。



## 9、6.2.5 限制栏位：email唯一

### 【1】model层限制

1）在6.2.2的基础上，增加describe测试。

spec/models/user_spec.rb

```
describe "when email address is already taken" do
  before do
    user_with_same_email = @user.dup #用dup方法复制对象@user
    user_with_same_email.save
  end
  it { should_not be_valid } #因为已经存在@user，所以这个验证不通过
end
```

【问题】dup和clone的区别？

2）让测试通过

app/models/user.rb

```
validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: true
#唯一性的验证用，默认区分大小写。
```

### 【2】数据库层限制、及索引

目的：防止用户重复提交表单后，生成两笔相同的数据。

1）

```
rails g migration add_index_to_users_email
```

2）db/migrate/[timestamp]_add_index_to_users_email.rb

```
class AddIndexToUsersEmail < ActiveRecord::Migration
  def change
    add_index :users, :email, unique: true  #加入索引add_index，并指定email是唯一的。
  end
end
```

3）为了保证email地址唯一，把它们转成小写。

回调函数，在生命周期的特定时刻调用，比如下面的before_save函数。

app/models/user.rb

```
before_save { self.email = email.downcase }
```

> 测试代码见6.20节的练习。

## 10、6.2.5 限制栏位：email不区分大小写

1）在6.2.2的基础上，增加describe测试。

spec/models/user_spec.rb

```
describe "when email address is already taken" do
  before do
    user_with_same_email = @user.dup
    user_with_same_email.email = @user.email.upcase
    user_with_same_email.save
  end
  it { should_not be_valid }
end
```

2）让测试通过

app/models/user.rb

```
validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false } #唯一性验证，不区分大小写，这样写默认uniqueness是true。
```

## 11、6.3.1/6.3.2 密码加密及密码确认

### 【1】准备工作

1）新增栏位password_digest

```
rails g migration add_password_digest_to_users password_digest:string
```

迁移的名字可以随便取，但一般会以`_to_users`结尾，rails会向users表增加列的迁移。

2）用哈希算法对密码进行不可逆的加密。

```
gem 'bcrypt-ruby'
```

### 【2】测试

1）在6.2.2的基础上，增加

spec/models/user_spec.rb

```
it { should respond_to(:password_digest) }
it { should respond_to(:password) }
it { should respond_to(:password_confirmation) }

describe "when password is not present" do
  before do
    @user = User.new(name: "Example User", email: "user@example.com",
                     password: " ", password_confirmation: " ") #密码不能为空
  end
  it { should_not be_valid }
end

describe "when password doesn't match confirmation" do
  before { @user.password_confirmation = "mismatch" } #更新栏位值，这样两个密码就不同了。
  it { should_not be_valid }
end
```

2）让测试通过

app/models/user.rb

```
has_secure_password
```

`has_secure_password`是rails方法。会创建password_confirmation属性，还有针对password_digest属性的数据验证（不能为空）。这个命令的效果如下：

```
>> user = User.find_by(email: "mhartl@example.com")
>> user.password_digest
=> "$2a$10$kn4cQDJTzV76ZgDxOWk6Je9A0Ttn5sKNaGTEmT0jU7.ncBJ/60gHq" #生成加密密码串

>> user.authenticate("invalid")
=> false
>> user.authenticate("foobar")  #用authenticate方法来验证和调用用户
=> #<User id: 1, name: "Michael Hartl", email: "mhartl@example.com", created_at: "2013-03-11 20:45:19", updated_at: "2013-03-11 20:45:19", password_digest: "$2a$10$kn4cQDJTzV76ZgDxOWk6Je9A0Ttn5sKNaGTEmT0jU7.n...">
```

【问题】做完了还是不清楚password_digest，是不是在保存到数据库前，会自动对password和password_comfirmation进行摘要？最后保存到数据库的只有password_digest？

## 12、6.3.3 用户身份验证

原理：确保可以用email和password取到用户数据，即

```
user = User.find_by(email: email) #先通过email找到用户记录
current_user = user.authenticate(password) #使用authenticate方法，用密码进行身份验证。
```

1）在6.2.2的基础上，增加。

spec/models/user_spec.rb

```
it { should respond_to(:authenticate) }  #@user要能响应authenticate方法

describe "with a password that's too short" do
  before { @user.password = @user.password_confirmation = "a" * 5 } #密码长度测试
  it { should be_invalid }
end

describe "return value of authenticate method" do
  before { @user.save } #保存用户数据
  let(:found_user) { User.find_by(email: @user.email) } #用find_by取出用户，复制给局部变量
  describe "with valid password" do
    it { should eq found_user.authenticate(@user.password) } #使用authenticate方法，用密码进行身份验证。取出的用户要和@user相同
  end
  describe "with invalid password" do
    let(:user_for_invalid_password) { found_user.authenticate("invalid") } #用错误
    it { should_not eq user_for_invalid_password }
    specify { expect(user_for_invalid_password).to be_false } #specify是it的别名
  end
end
```

let方法的参数是Symbol，后面跟一个快。let方法会记住find_by的值，所以不管写多少个describe测试，find_by方法只运行一次。

2）让测试通过

app/models/user.rb

```
validates :password, length: { minimum: 6 }
```

## 13、（模拟用户填表）点击按钮，成功

### 【1】7.2.1 重点是change方法

1）spec/requests/user_pages_spec.rb

```
describe "User pages" do
  subject { page }
  
  describe "signup" do
    before { visit signup_path } #用visit访问网站
    let(:submit) { "Create my account" } #let方法定义submit按钮
    
    describe "with invalid information" do
      it "should not create a user" do
        expect { click_button submit }.not_to change(User, :count) #change方法，下边细说
      end 
    end
    
    describe "with valid information" do
      before do
        fill_in "Name", with: "Example User" #用fill_in填表
        fill_in "Email", with: "user@example.com"
        fill_in "Password", with: "foobar"
        fill_in "Confirmation", with: "foobar"
      end
      it "should create a user" do
        expect { click_button submit }.to change(User, :count).by(1) #点击按钮，及to方法。
      end 
    end
  end
end
```

①、以上代码，change方法，接受两个参数，第一个是对象名，第二个是Symbol。会在expect执行“点击按钮”的前后，分别在第一个参数调用第二个参数。重构前的代码如下：

```
initial = User.count
click_button "Create my account"
final = User.count
expect(initial).to eq final
```

②、以上代码，to方法。点击按钮后，可以创建一个新用户。

### 【2】8.1.2 登录成功，用have_link

1）spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  .
  .
  .
  describe "signin" do
    before { visit signin_path }
    .
    .
    describe "with valid information" do
      let(:user) { FactoryGirl.create(:user) }
      before do
        fill_in "Email",    with: user.email.upcase #邮箱转换成大写
        fill_in "Password", with: user.password
        click_button "Sign in"
      end
      it { should have_title(user.name) }
      it { should have_link('Profile',     href: user_path(user)) } #登录后有用户资料链接
      it { should have_link('Sign out',    href: signout_path) } #登录后有退出链接
      it { should_not have_link('Sign in', href: signin_path) } #登录后没有登录链接
    end 
  end
end    
```

注意：把邮箱转换成大写，确保在数据库中查询用户时不用担心大小写问题。

2）8.1.2 通过测试：

详见情景18，8.2.4节。

### 【3】情景19，8.2.5 注册后直接登录

因为按顺序定义current_user和sign in方法，所以没有放过来。

### 【4】8.2.7 退出

1）spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  .
  .
  .
  describe "signin" do
    .
    .
    .
    describe "with valid information" do
      .
      .
      .
      describe "followed by signout" do
        before { click_link "Sign out" }
        it { should have_link('Sign in') }
      end
    end 
  end
end
```

2）让测试通过

app/controllers/sessions_controller.rb

```
def destroy
  sign_out
  redirect_to root_path
end 
```

app/helpers/sessions_helper.rb

```
def sign_out
  self.current_user = nil 
  cookies.delete(:remember_token)
end
```

### 【5】9.1.1放在步骤【2】8.2.1中

## 14、（用户不填表）点击按钮，失败

### 8.1.2 登录失败，用have_selector

spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  .
  .
  .
  describe "signin" do
    before { visit signin_path }
    describe "with invalid information" do
      before { click_button "Sign in" }
      it { should have_title('Sign in') }
      it { should have_selector('div.alert.alert-error', text: 'Invalid') }
    end
end 
```

以上代码，测试的是页面中，是否含有如下

```
<div class="alert alert-error">Invalid...</div>
```

### 9.1.1 edit失败，用have_content

1）spec/requests/user_pages_spec.rb

```
describe "User pages" do
  describe "edit" do
    let(:user) { FactoryGirl.create(:user) }
    before { visit edit_user_path(user) }
    describe "page" do
      it { should have_content("Update your profile") }
      it { should have_title("Edit user") }
      it { should have_link('change', href: 'http://gravatar.com/emails') }
    end
    describe "with invalid information" do
      before { click_button "Save changes" }
      it { should have_content('error') }
    end
  end 
end
```

2）9.1.1 让测试通过：

app/controllers/users_controller.rb

```
def edit
  @user = User.find(params[:id])
end
```

views

```
<% provide(:title, "Edit user") %>
<h1>Update your profile</h1>
<div class="row">
  <div class="span6 offset3">
    <%= form_for(@user) do |f| %>
      <%= render 'shared/error_messages' %> #再次用到7.3.3节创建的局部视图
      <%= f.label :name %>
      <%= f.text_field :name %>
      <%= f.label :email %>
      <%= f.text_field :email %>
      <%= f.label :password %>
      <%= f.password_field :password %>
      <%= f.label :password_confirmation, "Confirm Password" %>
      <%= f.password_field :password_confirmation %>
      <%= f.submit "Save changes", class: "btn btn-large btn-primary" %>
    <% end %>
    <%= gravatar_for @user %>
    <a href="http://gravatar.com/emails">change</a>
  </div>
</div>      
```

## 15、练习7.6 针对错误信息的测试

## 16、练习7.5 是否转向正确的页面

## 17、 flash没有按预期消失 

触发flash后，希望点击首页后，flash可以消失。

### 8.1.5 登录失败，用have_selector

spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  .
  .
  describe "signin" do
    before { visit signin_path }
    describe "with invalid information" do
      before { click_button "Sign in" }
      it { should have_title('Sign in') }
      it { should have_selector('div.alert.alert-error', text: 'Invalid') }
      describe "after visiting another page" do
        before { click_link "Home" }
        it { should_not have_selector('div.alert.alert-error') }
      end 
    end
  end 
end
```

### 测试通过的办法：

用 flash.now

```
flash.now[:error] = 'Invalid email/password combination'
```

## 18、记住我（记忆权标remember_token测试）

### 【1】8.2.1 测试remember_token栏位

1）spec/models/user_spec.rb

```
describe User do
  .
  .
  it { should respond_to(:authenticate) }
end
```

2）让测试通过：

```
rails g migration add_remember_token_to_users
```

db/migrate/[timestamp]_add_remember_token_to_users.rb

```
class AddRememberTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :remember_token, :string
    add_index :users, :remember_token #因为要用记忆权标取回用户，所以加入索引
  end
end
```

### 【2】8.2.1 测试remember_token是否生成

1）spec/requests/user_pages_spec.rb

```
describe User do
  before do
    @user = User.new(name: "Example User", email: "user@example.com",
                     password: "foobar", password_confirmation: "foobar")
  end
  subject { @user }
  .
  .
  .
  describe "remember token" do 
    before { @user.save }
    its(:remember_token) { should_not be_blank } 
  end 
end
```

其中，its测试的是对象的属性，而it测试的则是对象。等同于

```
it { expect(@user.remember_token).not_to be_blank }
```

2）让测试通过：

app/models/user.rb

```
  before_create :create_remember_token
 
  def User.new_remember_token
    SecureRandom.urlsafe_base64 #生成16位字符串
  end
  
  def User.encrypt(token)
    Digest::SHA1.hexdigest(token.to_s) #加密字符串。to_s防止输入的字符串是nil。
  end 

private

  def create_remember_token
    self.remember_token = User.encrypt(User.new_remember_token) #用self赋值给用户
  end
```

其中：

* 用SecureRandom模块的urlsafe_base64方法，生成16位的字符串。在浏览器中存储这个base64字符串，在数据库从存储加密后的版本。
* 为了让用户从一开始就有记忆权标，使用回调函数before_create。如果没有这样做，用户注册后自动登录时，会再创建 一个记忆权标。
* SHA1安全性不如Bcrypt，但这里够用。
* self.remember_token，会把这个属性连同用户的其他属性一起保存到数据库。如果用remember_token，那只是创建了一个局部变量。

### 【3】8.2.2 定义sign in

1）app/helpers/sessions_helper.rb

```
module SessionsHelper
  def sign_in(user)
    remember_token = User.new_remember_token
    cookies.permanent[:remember_token] = remember_token
    user.update_attribute(:remember_token, User.encrypt(remember_token))
    self.current_user = user
  end 
end
```

其中：

* 创建新权标。

* 把未加密的权标，保存到浏览器的cookie。

  ①、permanent方法，会自动把cookie的失效日期设置为20年后。

  ②、cookie是rails提供的方法

```
cookies[:remember_token] = { value:   remember_token,
                             expires: 20.years.from_now.utc } #expires失效日期20年后	
```

​	③、浏览器中保存的cookie并不是Hash，赋值给cookie只是把值以文本形式保存在浏览器中。

* 把加密后的权标，保存到数据库。使用update_attribute可以跳过数据验证更新单个属性，因为我们没有用户密码只有权标，所以必须用update_attribute。
* 把输入的用户设置成当前登录的用户current_user。

### 【4】8.2.3 定义current_user

app/helpers/sessions_helper.rb

```
module SessionsHelper
  def sign_in(user)
  .
  . 
  end
  
  def current_user=(user)
    @current_user = user #设定@current_user的值，以备后用
  end 
  
  def current_user
    remember_token = User.encrypt(cookies[:remember_token]) #拿到cookie里的权标，并加密
    @current_user ||= User.find_by(remember_token: remember_token) #用来读取@current_user的值
  end  
end
```

* 因为数据库的权标remember_token是用浏览器权标加密的，所以拿到cookie的remember_token后，要用encrypt加密。
* ||=，短路计算。只要第一个满足就会终止。

### 【5】8.2.4 改变链接

1）定义signed_in?方法

app/helpers/sessions_helper.rb

```
  def signed_in?
    !current_user.nil?
  end
```

2）添加链接

app/views/layouts/_header.html.erb

```
<ul class="dropdown-menu">
  <li><%= link_to "Profile", current_user %></li>
  <li><%= link_to "Settings", '#' %></li>
  <li class="divider"></li>
  <li>
    <%= link_to "Sign out", signout_path, method: "delete" %>
  </li> 
</ul> 
```

### 至此，情景13的8.1.2，测试通过。

## 19、8.2.5 注册后直接登录——可归类到情景13

1）spec/requests/user_pages_spec.rb，这个是注册页面的测试，跟情景13，8.1.2的测试类似。

```
describe "User pages" do
    .
    .
    .
    describe "with valid information" do
      .
      .
      .
      describe "after saving the user" do
        before { click_button submit }
        let(:user) { User.find_by(email: 'user@example.com') }
        it { should have_link('Sign out') }
        it { should have_title(user.name) }
        it { should have_selector('div.alert.alert-success', text: 'Welcome') }
	  end 
	end
  end 
end
```

2）让测试通过

app/controllers/users_controller.rb

```
def create
  @user = User.new(user_params)
  if @user.save
    sign_in @user #情景18，8.2.2已经定义了sign in方法
    flash[:success] = "Welcome to the Sample App!"
    redirect_to @user
  else
    render 'new'
  end 
end
```

## 20、CRUD测试

### 9.1.1 edit 测试，分别放在情景13、情景14中。并有代码重构7。

### 9.1.3 update测试，和create类似。主要用到reload方法。

1）spec/requests/user_pages_spec.rb

```
describe "User pages" do
  .
  .
  .
  describe "edit" do
    let(:user) { FactoryGirl.create(:user) }
    before { visit edit_user_path(user) }
    .
    .
    .
    describe "with valid information" do
      let(:new_name)  { "New Name" }
      let(:new_email) { "new@example.com" }
      before do
        fill_in "Name",
        fill_in "Email",
        fill_in "Password",
        fill_in "Confirm Password", with: user.password
        click_button "Save changes"
      end
      it { should have_title(new_name) }
      it { should have_selector('div.alert.alert-success') }
      it { should have_link('Sign out', href: signout_path) }
      specify { expect(user.reload.name).to  eq new_name }
      specify { expect(user.reload.email).to eq new_email }
    end 
  end
end  
```

2）9.1.3 让测试通过：

app/controllers/users_controller.rb

```
def update
  @user = User.find(params[:id])
  if @user.update_attributes(user_params)
    flash[:success] = "Profile updated"
    sign_in @user
    redirect_to @user
  else
    render 'edit'
  end 
end
```

注意：因为model里的回调函数before_create :create_remember_token，保存前会重设权标，之前的session就失效了，因此任何会话劫持都会自动失效。

## 21、权限限制

### 已有第八章，情景6、情景7、情景8、情景9、情景10。

### 第九章，针对edit和update的权限限制。

### 9.2.1 edit和update前，必须先登录

1）spec/requests/authentication_pages_spec.rb

```

describe "Authentication" do
  .
  .
  .
  describe "authorization" do
    describe "for non-signed-in users" do
      let(:user) { FactoryGirl.create(:user) }
      describe "in the Users controller" do
        describe "visiting the edit page" do
          before { visit edit_user_path(user) }
          it { should have_title('Sign in') }
	    end
        describe "submitting to the update action" do
          before { patch user_path(user) } #重点patch
          specify { expect(response).to redirect_to(signin_path) } #重点response
		end 
	  end
	end 
  end
end
```

其中：

* 发起HTTP请求，直接使用相应的动词，比如这里的before { patch user_path(user) }。会向users/1发送PATCH请求，由controller#update处理。因为update没有页面，所以只能用PATCH。
* 注意：HTTP请求比如patch的用法，只能在rspec的request测试里使用，不能在feature测试里用。
* 这里的测试对象不是page页面，而是用response来测试服务器相应。
* specify同it。

2）让测试通过：

①、app/controllers/users_controller.rb

```
before_action :signed_in_user, only: [:edit, :update]

private

def signed_in_user
  redirect_to signin_url, notice: "Please sign in." unless signed_in?
end
```

②、修复情景20，9.1.3的edit测试代码，因为要提前登陆而出错的问题。

spec/requests/user_pages_spec.rb

```
describe "edit" do
  let(:user) { FactoryGirl.create(:user) }
  before do
  sign_in user
    visit edit_user_path(user)
  end
  . . .
end
```

### 9.2.2 edit和update前，必须是current_user

1）spec/requests/authentication_pages_spec.rb

```
require 'spec_helper'
describe "Authentication" do
  .
  .
  .
  describe "authorization" do
    .
    .
    .
    describe "as wrong user" do
      let(:user) { FactoryGirl.create(:user) }
      let(:wrong_user) { FactoryGirl.create(:user, email: "wrong@example.com") }
      before { sign_in user, no_capybara: true }
      describe "visiting Users#edit page" do
        before { visit edit_user_path(wrong_user) }
        it { should_not have_title(full_title('Edit user')) }
      end
      describe "submitting a PATCH request to the Users#update action" do
        before { patch user_path(wrong_user) }
        specify { expect(response).to redirect_to(root_path) }
      end 
    end
  end 
end
```

2）让测试通过：

app/controllers/users_controller.rb

```
before_action :correct_user, only: [:edit, :update]

private

def correct_user
  redirect_to(root_path) unless current_user?(@user)
end
```

定义current_user?，app/helpers/sessions_helper.rb

```
def current_user
  remember_token = User.encrypt(cookies[:remember_token])
  @current_user ||= User.find_by(remember_token: remember_token)
end
def current_user?(user)
  user == current_user
end
```

### 9.2.3 edit和update，更友好的转向

1）spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  .
  .
  .
  describe "authorization" do
    describe "for non-signed-in users" do
      let(:user) { FactoryGirl.create(:user) }
      describe "when attempting to visit a protected page" do
        before do
          visit edit_user_path(user)
          fill_in "Email",    with: user.email
          fill_in "Password", with: user.password
          click_button "Sign in"
        end
        describe "after signing in" do
          it "should render the desired protected page" do
            expect(page).to have_title('Edit user')
	      end 
	    end
```

2）让测试通过：

app/helpers/sessions_helper.rb

```
def store_location
  session[:return_to] = request.fullpath #存储页面地址。其中，session在关闭浏览器时失效。
end

def redirect_back_or(default)
  redirect_to(session[:return_to] || default) #登录后转向这个已存储的地址上。
  session.delete(:return_to) #如果不删除，每次关闭浏览器前都会转到存储的地址上。
end
```

app/controllers/users_controller.rb

```
def signed_in_user
  unless signed_in?
    store_location
    redirect_to signin_url, notice: "Please sign in."
  end
end
```

app/controllers/sessions_controller.rb

```
def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      sign_in user
      redirect_back_or user
    else
      flash.now[:error] = 'Invalid email/password combination'
      render 'new'
    end
end
```

### 9.3.1 index前，必须先登录

1）spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  .
  .
  .
  describe "authorization" do
    describe "for non-signed-in users" do
      .
      .
      .
      describe "in the Users controller" do
        .
        .
        .
        describe "visiting the user index" do
          before { visit users_path }
          it { should have_title('Sign in') }
        end
	  end 
	  . 
	  . 
	  .
	end 
  end
end
```

2）让测试通过：

app/controllers/users_controller.rb

```
before_action :signed_in_user, only: [:index, :edit, :update]
```

### 9.3.1 index页面要有li标签和user.name

1）spec/requests/user_pages_spec.rb

```
describe "User pages" do
  subject { page }
  describe "index" do
    before do
      sign_in FactoryGirl.create(:user)
      FactoryGirl.create(:user, name: "Bob", email: "bob@example.com")
      FactoryGirl.create(:user, name: "Ben", email: "ben@example.com")
      visit users_path
    end
    it { should have_title('All users') }
    it { should have_content('All users') }
    it "should list each user" do
      User.all.each do |user|
        expect(page).to have_selector('li', text: user.name) #关键代码
      end
	end 
  end

```

2）让测试通过：

app/controllers/users_controller.rb

```
def index
  @users = User.all
end
```

app/views/users/index.html.erb

```
<% provide(:title, 'All users') %>
<h1>All users</h1>
<ul class="users">
  <% @users.each do |user| %>
    <li>
      <%= gravatar_for user, size: 52 %>
      <%= link_to user.name, user %>
    </li>
  <% end %>
</ul>
```

## 22、分页功能

### 9.3.2 rspec中创建示例数据（factorybot的sequence）

spec/factories.rb

```
FactoryGirl.define do
  factory :user do
    sequence(:name)  { |n| "Person #{n}" }
    sequence(:email) { |n| "person_#{n}@example.com"}
    password "foobar"
    password_confirmation "foobar"
  end 
end
```

### 9.3.2 测试分页

1）spec/requests/user_pages_spec.rb

```
describe "User pages" do
  subject { page }
  describe "index" do	
    let(:user) { FactoryGirl.create(:user) }
    before(:each) do #和before(:all)是相反的操作
      sign_in user
      visit users_path
    end
    it { should have_title('All users') }
    it { should have_content('All users') }
    describe "pagination" do
      before(:all) { 30.times { FactoryGirl.create(:user) } } #创建30个示例数据
      after(:all)  { User.delete_all } #测试后删除数据，让其他测试速度不受此影响。
      it { should have_selector('div.pagination') } #必须含有分页的css
      it "should list each user" do
        User.paginate(page: 1).each do |user| #第一页的数据
          expect(page).to have_selector('li', text: user.name)
        end
      end 
    end
```

2）让测试通过：

app/views/users/index.html.erb

```
<%= will_paginate %> #会自动寻找@user对象，默认一页30个，返回的是ActiveRecord::Relation类对象。
```

app/controllers/users_controller.rb

```
def index
  @users = User.paginate(page: params[:page])
end
```

## 23、admin和destroy权限

### 9.4.1 测试admin

1）spec/models/user_spec.rb

```
describe User do
  .
  .
  .
  it { should respond_to(:authenticate) }
  it { should respond_to(:admin) }
  it { should be_valid }
  it { should_not be_admin }
  describe "with admin attribute set to 'true'" do
    before do
	  @user.save!
      @user.toggle!(:admin) #toggle!方法，状态切换。把属性值从false变成true。
    end
    it { should be_admin } #be_admin，说明用户可以相应admin?方法
```

2）添加admin栏位

```
rails generate migration add_admin_to_users admin:boolean default:false
```

执行三兄弟

```
rake db:reset
rake db:populate #自定义的db
rails db:migrate RAILS_ENV=test
```

### 9.6练习 对admin的可访问性测试，使用健壮参数

### 9.4.2 admin才能删除用户

1）创建示例数据时，给予管理员权限

spec/factories.rb

```
FactoryGirl.define do
  factory :user do
    sequence(:name)  { |n| "Person #{n}" }
    sequence(:email) { |n| "person_#{n}@example.com"}
    password "foobar"
    password_confirmation "foobar"
    factory :admin do
      admin true
    end 
  end
end    
```

2）测试代码

spec/requests/user_pages_spec.rb

```
describe "User pages" do
  subject { page }
  describe "index" do
    let(:user) { FactoryGirl.create(:user) }
    before do
      sign_in user
      visit users_path
	end
    it { should have_title('All users') }
    it { should have_content('All users') }
    describe "pagination" do
      .
      .
      . 
    end
    describe "delete links" do
      it { should_not have_link('delete') } #普通用户看不到delete链接。
      describe "as an admin user" do
        let(:admin) { FactoryGirl.create(:admin) }
        before do
          sign_in admin
          visit users_path
        end
        it { should have_link('delete', href: user_path(User.first)) }
        it "should be able to delete another user" do
          expect do
            click_link('delete', match: :first) #告知capybara，只点击第一个看到的delete链接。
          end.to change(User, :count).by(-1) #用户被删除，数量减少1。
        end
        it { should_not have_link('delete', href: user_path(admin)) }
      end
	end 
  end 
end
```

3）让测试通过：

app/views/users/_user.html.erb

```
<li>
  <%= gravatar_for user, size: 52 %>
  <%= link_to user.name, user %>
  <% if current_user.admin? && !current_user?(user) %>
    | <%= link_to "delete", user, method: :delete,
                                  data: { confirm: "You sure?" } %>
  <% end %>
</li>
```

app/controllers/users_controller.rb

```
def destroy
   User.find(params[:id]).destroy #把find和destroy连在一起用。
   flash[:success] = "User destroyed."
   redirect_to users_url
end
```

### 9.4.2 非admin不能删除用户

1）spec/requests/authentication_pages_spec.rb

```
describe "Authentication" do
  .
  .
  .
  describe "authorization" do
    .
    .
    .
    describe "as non-admin user" do
      let(:user) { FactoryGirl.create(:user) }
      let(:non_admin) { FactoryGirl.create(:user) }
      before { sign_in non_admin, no_capybara: true }
      describe "submitting a DELETE request to the Users#destroy action" do
        before { delete user_path(user) }
        specify { expect(response).to redirect_to(root_path) }
```

2）让测试通过：

app/controllers/users_controller.rb

```
before_action :admin_user, only: :destroy
```

### 9.6练习 admin不能删除自己

## 24、10.1 微博模型

### 10.1.1 响应新栏位content、user_id的测试。

spec/models/micropost_spec.rb

```
subject { @micropost }
it { should respond_to(:content) }
it { should respond_to(:user_id) }
```

### 10.1.2 权限验证

存在性验证，当user_id为nil时验证不通过。

spec/models/micropost_spec.rb

```
describe "when user_id is not present" do
    before { @micropost.user_id = nil }
    it { should_not be_valid }
end
```

### 10.1.3 用户和微博关联测试。

spec/models/micropost_spec.rb

```
let(:user) { FactoryGirl.create(:user) }
before { @micropost = user.microposts.build(content: "Lorem ipsum")}

it { should respond_to(:user) }
its(:user) { should eq user }
```

spec/models/user_spec.rb

```
it { should respond_to(:microposts) }
```

### 10.1.4 改进，用预购件

1）写预购件

spec/factories.rb

```
factory :micropost do
  content "Lorem ipsum"
  user
end
```

2）然后在测试文件中新建微博：

```
FactoryGirl.create(:micropost, user: @user, created_at: 1.day.ago)
```

3）按创建时间排序（默认是按id）

spec/models/user_spec.rb

```
describe User do
  .
  .
  .
  describe "micropost associations" do
    before { @user.save }
    let!(:older_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.day.ago)
    end
    let!(:newer_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.hour.ago)
	end
    it "should have the right microposts in the right order" do
      expect(@user.microposts.to_a).to eq [newer_micropost, older_micropost]
	end 
  end
end
```

4）让测试通过：

app/models/micropost.rb

```
default_scope -> { order('created_at DESC') } #本书第一次接触作用域
```

补充知识：

* 作用域都需要匿名函式，如这里的`-> { order('created_at DESC') `，这种对象叫Proc。
* 匿名函式调用call方法，会执行匿名函式的代码。

```
>> -> { puts "foo" }
=> #<Proc:0x007fab938d0108@(irb):1 (lambda)> >> -> { puts "foo" }.call
foo
=> nil
```

### 10.1.4 user删除后对应的microposts也要删除

1）spec/models/user_spec.rb

```
  describe "micropost associations" do
    before { @user.save }
    let!(:older_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.day.ago)
    end
    let!(:newer_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.hour.ago)
    end
    .
    .
    .
    it "should destroy associated microposts" do
      microposts = @user.microposts.to_a
      @user.destroy
      expect(microposts).not_to be_empty
      microposts.each do |micropost|
        expect(Micropost.where(id: micropost.id)).to be_empty
      end
	end 
  end
```

* 我们希望微博立即创建，所以用let!

2）补充知识：测试异常的方法

上边用where是因为查询为空时返回nil，这里用find时因为查询为空时返回error。

```
expect do
  Micropost.find(micropost)
end.to raise_error(ActiveRecord::RecordNotFound)
```

3）让测试通过：

app/models/user.rb

```
has_many :microposts, dependent: :destroy #user被删除时，会同时删除microposts。
```

### 10.1.5 权限验证

1）权限验证：content不能为空' '、不能nil、长度不能超过140个字符。

spec/models/micropost_spec.rb

```
describe Micropost do
  let(:user) { FactoryGirl.create(:user) }
  before { @micropost = user.microposts.build(content: "Lorem ipsum") }
  .
  .
  .
  describe "when user_id is not present" do
    before { @micropost.user_id = nil }
    it { should_not be_valid }
  end
  describe "with blank content" do
    before { @micropost.content = " " }
    it { should_not be_valid }
  end
  describe "with content that is too long" do
    before { @micropost.content = "a" * 141 }
    it { should_not be_valid }
  end 
end
```

2）让测试通过：

app/models/micropost.rb

```
validates :content, presence: true, length: { maximum: 140 }
```

## 25、10.2 显示微博

### 10.2.1 测试用户show页面是否显示微博

1）spec/requests/user_pages_spec.rb

```
describe "User pages" do
  .
  .
  .
  describe "profile page" do
    let(:user) { FactoryGirl.create(:user) }
    let!(:m1) { FactoryGirl.create(:micropost, user: user, content: "Foo") }
    let!(:m2) { FactoryGirl.create(:micropost, user: user, content: "Bar") }
    before { visit user_path(user) }
    
    it { should have_content(user.name) }
    it { should have_title(user.name) }
    
    describe "microposts" do
      it { should have_content(m1.content) }
      it { should have_content(m2.content) }
      it { should have_content(user.microposts.count) }
    end 
  end    
```

* count方法，直接在数据库层统计数量，而不是调用出微博再用length方法。

2）让测试通过：

①、app/views/users/show.html.erb

```
<div class="span8">
  <% if @user.microposts.any? %>
    <h3>Microposts (<%= @user.microposts.count %>)</h3>
    <ol class="microposts">
      <li>
        <span class="content"><%= micropost.content %></span>
        <span class="timestamp">
          Posted <%= time_ago_in_words(micropost.created_at) %> ago.
        </span>
      </li>
    </ol>
    <%= will_paginate @microposts %>
  <% end %>
</div>
```

* any?方法，如果用户没有发布微博，就不会显示。
* count方法，显示数量。
* time_ago_in_words方法，显示微博距离发布的时间。示例图见10.2.2。

②、app/controllers/users_controller.rb

```
def show
  @user = User.find(params[:id])
  @microposts = @user.microposts.paginate(page: params[:page])
end
```

### 10.2.2 示例微博

1）生成测试数据，6个用户，每个50条微博。

lib/tasks/sample_data.rake

```
task populate: :environment do
    .
    .
    .
    users = User.all(limit: 6)
    50.times do
      content = Faker::Lorem.sentence(5)
      users.each { |user| user.microposts.create!(content: content) }
    end
end
```

数据库更改了，要执行rake三兄弟。

## 26、10.3 微博的CRUD

与以往惯例不同，微博resources的页面不是通过Microposts控制器实现，而是依赖于Users和StaticPages控制器。	

config/routes

```
resources :microposts, only: [:create, :destroy]
```

<img src="https://ws2.sinaimg.cn/large/006tKfTcgy1foadb490jkj30c904gq2z.jpg" width="350">

### 10.3.1 访问限制

1）访问Create和destroy，要先登录。

spec/requests/authentication_pages_spec.rb

```
describe "authorization" do
    describe "for non-signed-in users" do
      let(:user) { FactoryGirl.create(:user) }
      .
      .
      .
      describe "in the Microposts controller" do
        describe "submitting to the create action" do
          before { post microposts_path }
          specify { expect(response).to redirect_to(signin_path) }
		end
        describe "submitting to the destroy action" do
          before { delete micropost_path(FactoryGirl.create(:micropost)) }
          specify { expect(response).to redirect_to(signin_path) }
		end
```

2）让测试通过：

移动UserHelper中的signed_in_user，作为User和Micropost都能使用的方法。

①、app/helpers/sessions_helper.rb

```
def signed_in_user
  unless signed_in?
    store_location
    redirect_to signin_url, notice: "Please sign in."
  end
end
```

②、app/controllers/microposts_controller.rb

```
before_action :signed_in_user
```

### 10.3.2 创建微博

想根据用户的登录状态，显示不同的首页内容。与第七章User不同的是，create表单不是放在micropost/new中，而是在网站首页。

1）创建测试文件

```
rails g integration_test micropost_page
```

2）spec/requests/micropost_pages_spec.rb

```
describe "Micropost pages" do
    subject { page }

    let(:user) { FactoryGirl.create(:user) }
    before { sign_in user }

    describe "micropost creation" do
      before { visit root_path }
      describe "with invalid information" do
        it "should not create a micropost" do
          expect { click_button "Post" }.not_to change(Micropost, :count)
      end
      describe "error messages" do
        before { click_button "Post" }
        it { should have_content('error') }
      end 
    end
	
    describe "with valid information" do
      before { fill_in 'micropost_content', with: "Lorem ipsum" }
      it "should create a micropost" do
        expect { click_button "Post" }.to change(Micropost, :count).by(1)
      end
	end 
  end
end
```

3）让测试通过：

①、app/controllers/microposts_controller.rb

```
  before_action :signed_in_user
  def create
    @micropost = current_user.microposts.build(micropost_params)
    if @micropost.save
      flash[:success] = "Micropost created!"
      redirect_to root_url
    else
      render 'static_pages/home'
    end
  end
  
private
  
  def micropost_params
      params.require(:micropost).permit(:content)
  end
```

②、app/views/static_pages/home.html.erb

```
<% if signed_in? %>
  <div class="row">
    <aside class="span4">
      <section>
        <%= render 'shared/user_info' %>
      </section>
      <section>
        <%= render 'shared/micropost_form' %>
      </section>
    </aside>
  </div>
<% else %>
  <div class="center hero-unit">
    <h1>Welcome to the Sample App</h1>
    <h2>
      This is the home page for the
      <a href="http://railstutorial.org/">Ruby on Rails Tutorial</a>
      sample application.
    </h2>
    <%= link_to "Sign up now!", signup_path,
                                class: "btn btn-large btn-primary" %>
</div>
  <%= link_to image_tag("rails.png", alt: "Rails"), 'http://rubyonrails.org/' %>
<% end %>
```

③、局部视图

app/views/shared/_user_info.html.erb

```
<a href="<%= user_path(current_user) %>">
  <%= gravatar_for current_user, size: 52 %>
</a> <h1>
  <%= current_user.name %>
</h1>
<span>
  <%= link_to "view my profile", current_user %>
</span>
<span>
  <%= pluralize(current_user.microposts.count, "micropost") %>
</span>
```

* 和第七章一样，用定义的gravatar_for方法。
* pluralize方法，自动改变单词大小写。

④、局部视图

app/views/shared/_micropost_form.html.erb

```
<%= form_for(@micropost) do |f| %>
  <%= render 'shared/error_messages', object: f.object %>
  <div class="field">
    <%= f.text_area :content, placeholder: "Compose new micropost..." %>
  </div>
  <%= f.submit "Post", class: "btn btn-large btn-primary" %>
<% end %>
```

* 通过Hash，即`{ object: f.object }`，把object对象传到局部视图。

⑤、为了拿到步骤④的@micropost

app/controllers/static_pages_controller.rb

```
def home
    @micropost = current_user.microposts.build if signed_in?
end
```

* 加入if sign_in?，好处是当忘了在before_action加入登录限制，测试也会失败。

⑥、局部视图

app/views/shared/_error_messages.html.erb

```
<% if object.errors.any? %>
  <div id="error_explanation">
    <div class="alert alert-error">
      The form contains <%= pluralize(object.errors.count, "error") %>.
    </div>
    <ul>
    <% object.errors.full_messages.each do |msg| %>
      <li>* <%= msg %></li>
    <% end %>
    </ul>
  </div>
<% end %>
```

⑦、因为把User里的代码作为共用代码，所以要修改User的views里的局部视图引用。

app/views/users/new.html.erb

```
<% provide(:title, 'Sign up') %>
<h1>Sign up</h1>
<div class="row">
  <div class="span6 offset3">
    <%= form_for(@user) do |f| %>
      <%= render 'shared/error_messages', object: f.object %>
      .
      .
      .
    <% end %>
```

app/views/users/edit.html.erb

```
<div class="row">
  <div class="span6 offset3">
    <%= form_for(@user) do |f| %>
      <%= render 'shared/error_messages', object: f.object %>
      .
      .
      .
<% end %>
```

### 10.3.3 测试临时动态列表

目的：显示当前登录用户的微博。

1）测试feed方法，是否只有当前登入用户的微博，而没有其他用户的微博（关注的微博见十一章）。

spec/models/user_spec.rb

```
describe User do
  .
  .
  .
  it { should respond_to(:microposts) }
  it { should respond_to(:feed) }
  .
  .
  .
  describe "micropost associations" do
    before { @user.save }
    let!(:older_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.day.ago)
    end
    let!(:newer_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.hour.ago)
    end
    .
    .
    .
    describe "status" do
      let(:unfollowed_post) do
        FactoryGirl.create(:micropost, user: FactoryGirl.create(:user))
	  end
      its(:feed) { should include(newer_micropost) }
      its(:feed) { should include(older_micropost) }
      its(:feed) { should_not include(unfollowed_post) }
	end
```

* include方法，检查数组中是否包含指定元素。

2）让测试通过：

app/models/user.rb

```
def feed
  # This is preliminary. See "Following users" for the full implementation.
  Micropost.where("user_id = ?", id)
end
```

* 取出所有user_id等于用户id的微博。其中问号?，可以确保id的值在传入底层的SQL查询语句之前做了适当的转义，避免SQL注入的安全隐患。
* 在SQL语句中引入变量前，先做转义，是个好习惯。
* 这里的代码`Micropost.where("user_id = ?", id)`等同于`microposts`，这样写是为了服务十一章完整的动态列表。

### 10.3.3 测试首页显示微博列表

1）spec/requests/static_pages_spec.rb

```
describe "Static pages" do
 subject { page }
  describe "Home page" do
    .
    .
    .
    describe "for signed-in users" do
      let(:user) { FactoryGirl.create(:user) }
      before do
        FactoryGirl.create(:micropost, user: user, content: "Lorem ipsum")
        FactoryGirl.create(:micropost, user: user, content: "Dolor sit amet")
        sign_in user
        visit root_path
	  end
      it "should render the user's feed" do
        user.feed.each do |item|
          expect(page).to have_selector("li##{item.id}", text: item.content)
        end
```

* 以上代码，假设了所显示的每篇微博都有唯一的css id。
* `expect(page).to have_selector("li##{item.id}", text: item.content)`，第一个#是Capybara对应的css id的语法，第二个#是ruby字符串插值。

2）让测试通过：

①、定义@feed_items实例变量

app/controllers/static_pages_controller.rb

```
def home
  if signed_in?
    @micropost  = current_user.microposts.build
    @feed_items = current_user.feed.paginate(page: params[:page])
  end
end    
```

②、动态列表局部视图

app/views/shared/_feed.html.erb

```
<% if @feed_items.any? %>
  <ol class="microposts">
    <%= render partial: 'shared/feed_item', collection: @feed_items %>
  </ol>
  <%= will_paginate @feed_items %>
<% end %>
```

* 之前的局部视图，我们把partial: 省略了。这里因为要指定collection参数，所以不能省略。

③、步骤②的局部视图

app/views/shared/_feed_item.html.erb

```
<li id="<%= feed_item.id %>">
  <%= link_to gravatar_for(feed_item.user), feed_item.user %>
  <span class="user">
    <%= link_to feed_item.user.name, feed_item.user %>
  </span>
  <span class="content"><%= feed_item.content %></span>
  <span class="timestamp">
    Posted <%= time_ago_in_words(feed_item.created_at) %> ago.
  </span>
</li>
```

* 用`id="<%= feed_item.id %>"`，为每个动态项目指定了css id。就是rspec测试要检测的。

④、在首页加入以上局部视图

app/views/static_pages/home.html.erb

```
<div class="span8">
  <h3>Micropost Feed</h3>
  <%= render 'shared/feed' %>
</div>
```

⑤、如果create失败，@feed_items应该为空，否则view就拿不到数组@feed_items。

app/controllers/microposts_controller.rb

```
def create
  @micropost = current_user.microposts.build(micropost_params)
  if @micropost.save
    flash[:success] = "Micropost created!"
    redirect_to root_url
  else
    @feed_items = []
    render 'static_pages/home'
  end
end
```

### 10.3.4 删除微博

之前删除用户要限制管理员才能操作，这里删除微博，只有微博的发布者才能操作。

1）点击删除链接，数量减一。

spec/requests/micropost_pages_spec.rb

```
describe "Micropost pages" do
  .
  . 
  .
  describe "micropost destruction" do
      before { FactoryGirl.create(:micropost, user: user) }
      describe "as correct user" do
        before { visit root_path }
        it "should delete a micropost" do
          expect { click_link "delete" }.to change(Micropost, :count).by(-1)
  		end  
```

2）让测试通过：

①、微博局部视图，加入删除链接

app/views/microposts/_micropost.html.erb

```
<% if current_user?(micropost.user) %>
  <%= link_to "delete", micropost, method: :delete,
<% end %>
```

②、动态列表局部视图，加入删除链接

app/views/shared/_feed_item.html.erb

```
<% if current_user?(feed_item.user) %>
  <%= link_to "delete", feed_item, method: :delete,
<% end %>
```

③、用事前过滤器

app/controllers/microposts_controller.rb

```
before_action :correct_user, only: :destroy

def destroy
  @micropost.destroy
  redirect_to root_url
end

private

  def correct_user
    @micropost = current_user.microposts.find_by(id: params[:id])
    redirect_to root_url if @micropost.nil?
  end
```

* 注意，在correct_user中，是通过关联关系查找微博的。
* 这里用find_by，如果没找到会返回nil。如果用find，找不到会返回error。

补充知识：

以上代码有另外一种写法，常常用于debug

```
def correct_user
  @micropost = current_user.microposts.find(params[:id])
  rescue
  redirect_to root_url
end
```

* rescue是什么？

## 27、11.1 关系模型

11.1.1，relationsip建立，并增加索引

11.1.2，relationship访问权限测试、has_many测试、belongs_to测试

11.1.3，relationship存在性测试validate

11.1.4，测试被关注的用户user.followed_users，对应follow!和unfollow!方法

11.1.4，测试粉丝user.followers，涉及reverse_relationship

## 28、11.2 关注用户功能的网页界面



## 29、11.3 动态列表

# 第一章 配置

环境搭建、git、github、heroku。

目的：了解一些命令即可，命令相关的可以归档在这一章。

## 1.2.2 搭建环境

RubyGems的作用，一定要安装吗？一般不生成rdoc和ri文档，而是依靠在线文档。

```
install: --no-rdoc --no-ri
update: --no-rdoc --no-ri
```

## 1.3.1 git

1）用git co替代git checkout

```
$ git config --global alias.co checkout
```

2）.gitignore设置，可以忽略mac finder产生的.DS_Store。详见tips1。

## 1.3.4 github

1）-u的意思：将本地master分支推送到origin主机，同时指定origin主机为默认主机。后面就可以不加任何参数的使用git push、或git pull了。

```
git remote add origin https://github.com/<username>/demo_app.git
git push -u origin master
```

2）用git push替代git push origin master

```
git push --set-upstream origin master //跟踪远程分支，让本地与远程仓库关联
```

## 1.3.5 分支

1）-a意思是添加文件的所有改动，包括对旧文件的重命名、移动等。

```
git commit -am "xxx"
```



# 第二章 脚手架

创建脚手架（上线网站要有验证、有测试、有布局）、MVC、REST、OOP面向对象编程的继承。

目的：了解上线网站的需求。能用自己的话清晰描述MVC、REST、OOP。

## 2.1 脚手架

1）脚手架命令。rails会自动创建id，所以不用写id。

```
rails g scaffold User name:string email:string
或
rails g scaffold Micropost content:string user_id:integer
```

> 缺陷是：
>
> ①、没有数据验证、没有身份验证。——不安全。
>
> ②、没有自动化测试。——存在各种bug。
>
> ③、没有布局。——代码是重复的。

## 2.2 Users

查看所有的rake命令，或查看所有的rake与db相关的命令

```
rake -T
rake -T db
```

## 2.2.2 MVC、REST

1）mvc运作流程

```
def index 
  @user = User.all
end

1、点击网页浏览器发出请求
2、通过routes找到对应的controller和action
3、controller向model请求资料，比如User.all
4、model从db里读取出的User.all的资料
5、model拿到的资料回传给controller
6、controller把拿到的数据赋值给@user变量，传递给view
7、view文件比如index.html.erb使用ruby渲染成html
8、controller把生成的html发送给浏览器
```

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fnocpw8yz2j30dj0et0sx.jpg" width="400">

2）REST，是表现层状态转换。

把七个action对应到浏览器的四个verb。关于HTTP超文本传输协议，详见3.1章。

一般create、update、destroy不会渲染页面，只修改数据库中的用户数据。

<img src="https://ws1.sinaimg.cn/large/006tNc79ly1fnzsq2mpsvj30cv09jdga.jpg" width="500">

## 2.3.4 OOP面向对象继承

User和Micropost继承自ActiveRecord::Base，才能和数据库通讯。

UserController和MicropostController继承自ActionController::Base，能获得很多功能。比如处理模型对象、过滤http请求、将视图渲染成html等。

## 2.3.5 让rails能服务于静态资源文件——不配置会怎样？？

config/environments/production.rb

```
DemoApp::Application.configure do
  .
  .
  config.serve_static_assets = true
  .
  .
end
```



# 第三章 BDD之rspec

3.2.1章节有3个bug，关于正确配置rspec。

目的：能用自己的话描述BDD、TDD、集成测试、单元测试。

动态标题写法用在其他专案。

rspec测试效率的工具，需要google找替代品。

## ！！3.2.1 课程bug1 配置rspec

【bug】执行以下命令后报错

```
rspec spec/requests/static_pages_spec.rb
```

报错如下：

```
✘ apple@apple ⮀ ~/rails/sample_app ⮀ ⭠ test± ⮀ bundle exec rspec spec/requests/static_pages_spec.rb
/Users/apple/.rvm/gems/ruby-2.3.1/gems/selenium-webdriver-2.0.0/lib/selenium/webdriver/common/zipper.rb:1:in `require': cannot load such file -- zip/zip (LoadError)
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/selenium-webdriver-2.0.0/lib/selenium/webdriver/common/zipper.rb:1:in `<top (required)>'
```

解决办法：找了以下三个解答，无效。

http://blog.csdn.net/mydo/article/details/54345527

https://ruby-china.org/topics/18548

rspect官网问答区https://github.com/rspec/rspec-rails/issues/1273

同个例子别人的bloghttps://hk.saowen.com/a/63a91c9dbdc6cc6e4409e590b69dbe80ce8961e5a9aec8307c6f108ad4796204

stackoverflowhttps://stackoverflow.com/questions/18555992/bundle-exec-rspec-spec-requests-static-pages-spec-rb-from-hartls-tutorial-isnt

装上gem 'test-unit'，和gem 'zip'，报错如下：

```
 apple@apple ⮀ ~/rails/sample_app ⮀ ⭠ test± ⮀ bundle exec rspec spec/requests/static_pages_spec.rb
DEPRECATION WARNING: alias_method_chain is deprecated. Please, use Module#prepend instead. From module, you can access the original method using super. (called from <top (required)> at /Users/apple/rails/sample_app/spec/spec_helper.rb:4)
DEPRECATION WARNING: alias_method_chain is deprecated. Please, use Module#prepend instead. From module, you can access the original method using super. (called from <top (required)> at /Users/apple/rails/sample_app/spec/spec_helper.rb:4)
/Users/apple/.rvm/gems/ruby-2.3.1/gems/rspec-rails-2.13.1/lib/rspec/rails/fixture_support.rb:19:in `block (2 levels) in <module:FixtureSupport>': private method `fixture_path' called for #<RSpec::Core::Configuration:0x007fdba70f85e0> (NoMethodError)
Did you mean?  fixture_path=
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/rspec-rails-2.13.1/lib/rspec/rails/fixture_support.rb:17:in `class_eval'
```

### 最终解决办法：

参考资料stackoverflow：https://stackoverflow.com/questions/15148585/undefined-method-visit-when-using-rspec-and-capybara-in-rails

修改spec/rails_helper.rb，搞定！

```
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails' #加入
require 'capybara/rails' #加入
require 'capybara/rspec' #加入

ActiveRecord::Migration.maintain_test_schema!
RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
  config.include Capybara::DSL #针对这个问题，重点加入
end
```

### 怎么知道gem capybara是否生效？

新建spec/features/demo.rb，用一个demo案例来测试。

粘贴后执行`rspec spec/features/demo.rb`，会显示1个成功0个失败。

```
require 'rails_helper' #注意是rails_helper

feature "demo", :type => :feature do #注意是feature
  scenario "demo1" do
    visit "/"
    expect(page).to have_content("Hello")
  end
end
```

## ！！3.2.1 课程bug2 配置rspec

教材的这段代码，因为太旧不能使用，怎么改都报错。

```
require "spec_helper"
describe "Static pages" do
  describe "Home page" do
    it "should have the content 'Sample App'" do
      visit '/static_pages/home'
      expect(page).to have_content('Sample App')
    end
  end
end
```

### 暂时解决办法：

把`spec_helper`改成`rails_helper`。并加上`:type => :feature`。

本来想用`:type => :request`，但是报错，不知道怎么解决。暂时先用feature做下去吧。

```
require 'rails_helper' #注意是rails_helper

describe "Static pages", :type => :feature do #注意是feature
  describe "Home page" do
    it "should have the content 'Sample App'" do
      visit "/static_pages/home"
      expect(page).to have_content("Sample App")
    end
  end
end
```

### 最终解决办法：

按3.2.1课程bug1最终解法做。

## ！！3.2.1 课程bug3 配置rspec

不做任何操作，直接执行` rake db:migrate`报错：

```
 apple@apple ⮀ ~/rails/sample_app ⮀ ⭠ master± ⮀ rake db:migrate
rake aborted!
NoMethodError: undefined method `last_comment' for #<Rake::Application:0x007fe240bed8c0>

```

解决办法：

https://stackoverflow.com/questions/35893584/nomethoderror-undefined-method-last-comment-after-upgrading-to-rake-11

```
bundle update rspec-rails
```

附：官网https://github.com/rspec/rspec-rails



## 3.1 静态页面

```
rails generate controller StaticPages home help --no-test-framework
```

1）驼峰式命名StaticPages，生成的控制器名是蛇底式命名static_pages_controller.rb。

2）HTTP超文本传输协议。

## 3.2 BDD（rspec和cucumber）

TDD是什么？

BDD是什么？行为驱动开发，**『遇红、变绿、重构』**的流程。分为集成测试（integration test）和单元测试（unit test）。

什么是集成测试？模拟用户在浏览器的交互操作。配合capybara语法使用。

## 3.6 测试效率工具，结合实战圣经

## 3.6.1 集成了bundler的RVM

> 作用：不用输入rspec命令前的bundle exec。

```
rvm -v #查看RVM版本，只要是v1.11.x以上的就可以
rvm get stable #更新RVM
```

如果更新失败，查看解决办法。

### binstubs

> 作用：跟3.6.1的RVM一样，如果RVM安装成功了就跳过。

## 3.6.2 guard

> 作用：执行guard后，会进入guard界面，每当rspec文件改动保存，就会在guard界面自动测试。

1、安装gem，并bundle

```
group :development, :test do
  gem 'guard-rspec', '2.5.0'
end
```

2、让guard结合rspec，执行：

```
guard init rspec
```

3、！！99未尝试。确保失败的测试通过后grard不会运行所有测试（为了加快遇红、变绿、重构过程）。

```
 guard 'rspec', all_after_pass: false do
```

4、运行后，修改repec文件的代码，保存后就能在guard中看到正在自动测试。

```
guard
```

## 3.6.3 Spork，gem很老有bug，先跳过

> 作用：每次测试前都要重新加载整个rails目录，速度很慢。用Spork只需加载一次。

安装加速gem spork-rails遇到bug，看这个gem也几年没更新了。先跳过。

有没有其他取代的gem？

```
time bundle exec rspec spec/requests/static_pages_spec.rb #列出测试所用时间
```

## 3.6.4 sublime

用快捷键执行rspec。有空回头找找atom的。



# 第四章 ruby知识点/数组/hash/类

布局文件三行命令的解读。4.2章ruby知识点：module、注释#、局部变量赋值、布尔值boolean、流程控制if或unless、字符串插值#{xx}、返回值return。数组和hash。类的继承、类方法、类变量、类引用。

目的：知识点比较零碎，多看多在rails c里练。数组、hash、类方法的写法在model、controller、rails c经常用到，要练到想写什么效果就能写出来转换自如。

## 4.2 ruby知识点

## 4.3 数组和hash

hash区别于数组，在于hash没有顺序。

hash的格式，用hashrocket即 :foo => "xx"，或用symbol即foo: "xx"。

## 4.3.2 ruby语法例子

```
('a'..'z').to_a.shuffle[0..7].join
```

解读：

```
>> ('a'..'z').to_a #生成数组      
=> ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
>> ('a'..'z').to_a.shuffle #打乱
=> ["c", "g", "l", "k", "h", "z", "s", "i", "n", "d", "y", "u", "t", "j", "q", "b", "r", "o", "f", "e", "w", "v", "m", "a", "x", "p"]
>> ('a'..'z').to_a.shuffle[0..7] #前8个数据
=> ["f", "w", "i", "a", "h", "p", "c", "x"]
>> ('a'..'z').to_a.shuffle[0..7].join #数组转成字符串           
=> "mznpybuj"
```

## 4.3.3 inspect

对比`puts (1..5).to_a`和`puts (1..5).to_a.inspect`，前者把数组作为字符串输出即输出数字。后者输出数组的字面量形式即一个阵列。

inspect的快捷用法是p。比如`p :name`等价于`puts :name.inspect`。

【问题】inspect和print效果好像差不多，两者有什么区别？

## 4.3.4 布局application.rb三个命令理解

```
<%= stylesheet_link_tag "application", media: "all",
                                           "data-turbolinks-track" => true %>
<%= javascript_include_tag "application", "data-turbolinks-track" => true %>
<%= csrf_meta_tags %>
```

1）布局里的<%= csrf_meta_tags %>，用来防止“跨站请求伪造”。

2）

```
<%= stylesheet_link_tag "application", media: "all",
                                       "data-turbolinks-track" => true %>
```

上边这段是下边这段的缩写。

* 使用<%= %>，执行结果会通过erb即ruby语法转化成html插入模板中。


* stylesheet_link_tag是rails一个特殊函数，用来引入样式表


* ruby中函数的括号可以省略
* hash最后一个参数，可以省略花括号
* symbol符号不能用连字符-，所以要用旧语法`data-turbolinks-track" => true`
* 拆成两行，ruby不关心有没有换行或空格，也保持每行代码不超过80列

```
<%= stylesheet_link_tag ("application", { media: "all",
                                       "data-turbolinks-track" => true }) %>
```

整句解读：调用stylesheet_link_tag函数，传进两个参数，一个是字符串指明样式表路径，一个是hash包含两个元素，指明媒介类型，并启用Turbolinks功能。

## 4.4.1 构造器

双引号是字符串的**『字面构造器』**。

new是**『具名构造器』**。

**『在类上调用的方法比如new，称为类方法。调用new得到的结果是一个对象，称为类的实例。在实例上调用的方法叫实例方法，比如length』**。

## 4.4.2 类的继承.superclass和.class

<img src="https://ws2.sinaimg.cn/large/006tNc79ly1fnzzlg5ydzj306f06qjra.jpg" width="250">

## 4.4.3 修改内置的类

可以改String等类，但是少用。

blank?是rails为ruby添加的方法。

blank?、empty?、nil?的区别？bank?表示是否空白，empty?是针对字符串表示是否为空。

```
2.3.1 :001 > "".blank?
 => true
2.3.1 :002 > "".empty?
 => true
2.3.1 :003 > "".nil?
 => false
 
2.3.1 :006 > " ".blank?
 => true
2.3.1 :007 > " ".empty?
 => false
2.3.1 :008 > " ".nil?
 => false
 
2.3.1 :009 > nil.blank?
 => true
2.3.1 :010 > nil.empty?
NoMethodError: undefined method `empty?' for nil:NilClass
2.3.1 :011 > nil.nil?
 => true
```

## 4.4.4 controller类

<img src="https://ws1.sinaimg.cn/large/006tNc79ly1fo004zhng1j307c0f7aa7.jpg" width="250">

rails和ruby的不同，比如没有看到类.new来定义方法，而是直接如下写出home的方法

```
class StaticPagesController < ApplicationController
  def home
  end
end
```

## 4.4.5 用户类

example_user.rb

```html
class User
  attr_accessor :name, :email
  def initialize(attributes = {})
    @name  = attributes[:name]
    @email = attributes[:email]
  end
  def formatted_email
    "#{@name} <#{@email}>"
  end 
end
```

attr_accessor，相当于能够get读取、set修改。

initialize在ruby有特殊意义，当执行User.new时会执行这个方法。比如可以执行

```
user = User.new(name: "Michael Hartl", email: "mhartl@example.com")
```

实例变量@home，意义在于自动在视图中可用。

require './example_user'，加载文件。



# 第五章 布局css、rspec代码重构

5.3.5章节有bug，外部文件要用require引入。

目的：

了解定义样式的partial、asset pipeline、sass，把sass的实用功能（嵌套css和变量）用到其他专案。

rspec重构，把5.6最简洁的重构方法用到其他专案。

用户注册，教材用外卡路由不安全，改用resources。

## 5.1.1 navbar

1）html样式bug，navbar显示有问题：

```
<nav> 
  <ul class="nav pull-right">
    ...
  </ul>
</nav>
```

把代码改成

```
<ul class="nav navbar-nav pull-right">
  ...
</ul>
```

2）【问题】html5标签，header、nav、section、div。分别用在什么区域？

3）link_to是rails的帮助方法，可用来创建链接。

4）【问题】hero-unit在bootstrap中的意义是？

5）

```
<%= link_to image_tag("rails.png", alt: "Rails"), 'http://rubyonrails.org/' %>
```

image_tag帮助方法，第一个参数图片路径(app/assets/images)，第二个参数是hash可选。alt属性是图片无法加载时，针对视觉障碍人士的显示。

rails默认会加上alt属性，如果不指定参数会默认使用图片文件名。

## 5.1.2 bootstrap和css

bootstrap使用LESS动态生成样式表，Rails默认支持Sass。用gem bootstrap-sass，把LESS转换成Sass。

```
@import "bootstrap"; #引入整个bootstrap css框架
```

## 5.1.3 局部视图render

```
<%= render 'layouts/header' %> #<%=...%>表示执行ruby表达式，并将结果插入模板中
```

一般，每个页面都会用到的局部视图放在layouts文件夹，一些辅助的局部视图放在shared文件夹。

## 5.2.1 asset pipeline

sass是asset pipeline默认的一部分。

asset pipeline

把生产环境中的css、js分别集中在一个文件中所以加载快，并且会压缩（包括lib/assets和vendor/assets文件，删除不必要空格）减小文件大小。明显提高了css、js等静态文件的生成效率。

有三个特性：

**【1】资源目录**

* app/assets，存放应用程序用到的资源文件
* lib/assets，存放团队自己开发代码库用到的资源文件
* vendor/assets，存放第三方代码库用到的资源文件

**【2】清单文件**

gem sprockets，会通过清单文件合并成一个文件。只适用于css、js，不适用于图片。

app/assets/stylesheets/application.css

```
/*
 * This is a manifest file that'll automatically include all the stylesheets
 * available in this directory and any sub-directories. You're free to add
 * application-wide styles to this file and they'll appear at the top of the
 * compiled file, but it's generally better to create a new file per style
 * scope.
 *= require_self 
 *= require_tree .
*/
```

其中，

```
*= require_self  #会把application.css这个文件中的css加载进来
```

其中，

```
*= require_tree . #会把app/assets/stylesheets目录中的所有css引入应用程序的样式表中
```

**【3】预处理引擎**

不同扩展名对应不同的预处理引擎，主要有三种：

1）.scss对应Sass

2）.coffee对应CoffeeScript

3）.erb对应Erb

```
foobar.js.erb.coffee #会使用CoffeeScript和Erb，从右到左处理，先执行CoffeeScript处理器。
```

## 5.2.2 Sass

Sass提供很多功能，可以用来简化样式表，以下是主要功能。

先把文件名改成scss结尾，比如custom.css.scss。

### Sass常用写法

1）Sass的嵌套常规写法。

```
.center {
  text-align: center;
  h1 {
    margin-bottom: 10px;
  }
}
```

2）有hover时，用&符号

```
#logo {
  float: left;
  margin-right: 10px;
  font-size: 1.7em;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -1px;
  padding-top: 9px;
  font-weight: bold;
  line-height: 1;
  &:hover {
color: #fff;
    text-decoration: none;
  }
}
```

### Sass使用变量

```
$lightGray: #999; #Sass语法定义的变量
h2 { 
  color: $lightGray;
}
```

bootstrap定义了很多颜色变量，是用LESS语法，http://bootstrapdocs.com/v2.0.4/docs/less.html。

LESS语法使用@定义变量，Sass语法使用$定义变量。

```
@grayLight: #999; #LESS语法定义的变量
```

## 5.3.2 外卡路由（不安全）

教材这一章比较老。

更好的办法是用

```
resources :static_pages
```

## ！！5.3.4 课程bug  rspec代码重构

报错如下：

```
1) Static pages Home page
   Failure/Error: it { should have_title(full_title('')) }

   NoMethodError:
     undefined method `full_title' for #<RSpec::ExampleGroups::StaticPages::HomePage:0x007fd6b8b72e60>
```

### 解决办法：

在spec/support/utilities.rb里定义full_tittle后，要在spec/requests/static_pages_spec.rb里引入。

```
require 'support/utilities.rb'
```

## 5.3.4 rspec代码重构

好用，整理到rspec专栏。

## 5.4 用户注册

注册页面User的controller

```
rails generate controller Users new --no-test-framework
```

注册路由，教材用的是外卡路由（不安全），更好的用法

```
resources :users
```

## 5.6 rspec代码重构

好用，整理到rspec专栏。

rspec提供一种名为“共享用例shared example”的辅助功能，用于消除代码重复。



# 第六章

第六章到第九章，功能完整的登录和用户验证系统。同Clearance、Authlogic、Devise、CanCan。自己开发可以更好地理解实现的过程，且很多时候，对第三方代码库做修改，工作量比重新开发一个还大。

User的model。

## 6.1.1 迁移

迁移，用于精确修改数据库。用`rails g`，创建。用`rake db:migrate`，向上迁移。

第一次使用`rake db:migrate`，会创建`db/development.sqlite3`文件。

change方法使用rails的`create_table`方法创建表格，用来存储数据。

## 6.1.3 rails c --sandbox 

1）rails c沙盒模型，所有对数据库的修改，在exit退出后会rollback还原。

```
rails c --sandbox
```

2）

```
u=User.new(name:"99")
u.save #save返回的是true或false
```

相当于

```
u=User.create(name:"99") #返回创建的对象
```

保存成功后，都会出现SQL预计INSERT INTO "users"。

3）create的反操作是destroy

```
u.destroy #返回删除的对象user
```

## 6.1.4 rails c 查找对象

1）通过id查找

```
User.find(1)
```

2）指定属性查找

```
User.find_by_email("mhartl@example.com")
```

但是，find_by效率不高，6.2.5节使用数据库索引，改善这个问题。

3）其他

```
User.first
User.last
User.all
```

## 6.1.5 rails c 更新对象

1）方法一：分别为每个属性赋值。

```
u.email = "mhartl@example.net"
u.save
```

可以用reload查看是否已保存

```
u.reload.email
```

2）方法二：用update_attributes方法。

```
user.update_attributes(name: "The Dude", email: "dude@abides.org") #成功则返回true
```

注意：如果任何一个数据验证失败，操作就会失败。

可以改用update_attribute，更新单个属性就可以跳过数据验证。

```
user.update_attribute(:name, "The Dude") #成功则返回true
```

## 6.2.1 测试新增的栏位

命令：创建“测试数据库”。即把开发数据库db/development.sqlite3中的数据模型复制到db/test.sqlite3测试数据库。

用在新建model后，rake db:migrate后执行。

```
rake db:migrate
rake test:prepare #这个代码比较旧，改用下面的
rails db:migrate RAILS_ENV=test
```

> 如果测试出现莫名其妙的问题，可以尝试执行以上命令。

## 6.2.2 测试/验证存在性 

整理到rspec专栏。

## 6.2.3  测试/验证长度

整理到rspec专栏。

## 6.2.4 测试/验证email格式

1）整理到rspec专栏。

2）rubular，正则表达式编辑器，是学习正则表达式的必备工具。

注意：如果在rubular中用正则表达式，要把\A和\z去掉。如图，可以自己加入括号，括号部分的匹配结果会显示在如图的红色框中。

<img src="https://ws4.sinaimg.cn/large/006tNc79ly1fnri1pexwyj30rh0hkaas.jpg" width="500">

3）正则表达式解读。

```
/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i #完整代码
/ #正则表达式开始
\A #开头
[\w+\-.]+ #字母、加号、连字符、点，有一个或多个
@ #匹配@符号
[a-z\d\-.]+ #小写字母、数字、连字符、点，有一个或多个
\. #点
[a-z]+ #小写字母，有一个或多个
\z #结尾
/ #正则表达式结束
i #不区分大小写
```

## 6.2.5 测试/验证email唯一性

创建栏位时，要考虑是否会用这个栏位进行查询，如果有要增加索引add_index。否则查询时会进行“全表扫描”，效能极差。

索引的原理类似于一本书的目录。

## 6.3.1 加密密码

### bcrypt-ruby

rails密码安全机制，是由一个单独的方法`has_secure_password`方法实现的。

gem 'bcrypt-ruby'，用哈希算法对密码进行不可逆的加密。

### 加密后测试速度变慢7.1.3

因为慢加密的密码难破解，所以加密过程会延长测试运行的时间。

解决办法：

config/environments/test.rb

```
SampleApp::Application.configure do
  .
  .
  .
  # Speed up tests by lowering bcrypt's cost function. 
  ActiveModel::SecurePassword.min_cost = true #把test环境下，bcrypt的耗时因子改为最小。
end
```

## 6.3.3 

u.authenticate("密码")，密码正确会对应到这笔数据。

u.password_digest，密码的加密形式。



# 第七章

用户注册功能

用户资料页面

目的：写法大部分都知道，主要是注册功能的测试以及7.6的练习。

## 7.1.1 调试信息和rails环境

1）指定进入test环境的rails c

```
rails c test
```

2）指定进入production生产环境的rails s

```
rails s --environment production
```

3）指定production生产环境的迁移migration

```
rails db:migrate RAILS_ENV=production
```

### 【1】布局中加入调试信息

1）layout/aplication.html.erb

```
<%= debug(params) if Rails.env.development? %> #rails内置的debug方法和params变量
```

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fnrp764de6j30vv09awes.jpg" width="500">

2）css美化

```
@mixin box_sizing {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.debug_dump {
  clear: both;
  float: left;
  width: 100%;
  margin-top: 45px;
  @include box_sizing; #用到Sass的mixin功能（打包样式，供多次使用）。
}
```

## 7.1.2 Users资源

@user = User.params[:id]中，params[:id]返回的是字符串比如"1"，find方法自动将其转换成整数。

## 7.1.3 使用预构件测试

1）安装gem。gem 'factory_girl_rails'改名成gem 'factory_bot_rails'，不过旧的还能用。

```
gem 'factory_bot_rails'
```

2）设置预购件。

spec/factories.rb

```
FactoryGirl.define do
  factory :user do
    name     "Michael Hartl"
    email    "michael@example.com"
    password "foobar"
    password_confirmation "foobar"
  end 
end
```

3）用let方法生成User对象。

```
let(:user) { FactoryGirl.create(:user) }
```

## 7.1.4 添加Gravatar头像

1）app/helpers/users_helper.rb

```
module UsersHelper
  def gravatar_for(user) 
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase) #把email用MD5加密成字符串
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    image_tag(gravatar_url, alt: user.name, class: "gravatar")
end end
```

加密后的gravatar_id，类似于“1fda4469bcbec3badf5418269ffc5968”的格式。

2）bootstrap的aside标签，一般是对主体内容的补充。现在还有在用？？

class设置为 row span4，现在还有在用？？

## 7.2.1 测试用户注册功能

## 7.2.2 使用form_for

## 7.2.3 form_for表单html

### 参考8.1.3 form_for和form_tag的区别，练习8.5。

```
<%= form_for(@user) do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>

  <%= f.label :password %>
  <%= f.password_field :password %>
<% end %>
```

生成的html是

```
<form accept-charset="UTF-8" action="/users" class="new_user" id="new_user" method="post">
  <label for="user_name">Name</label>
  <input id="user_name" name="user[name]" type="text" />
  
  <label for="user_password">Password</label>
  <input id="user_password" name="user[password]" type="password" />
</form>         
```

可以创建用户，依赖于input的name属性。

form标签里，action="/users"会向地址/users发送请求。

form标签里，method="post"指明请求是POST。

## 7.3.1 可正常使用的表单

1）params是一个嵌套的Hash。

```
@user = User.new(params[:user])
```

基本上等同于

```
@user = User.new(name: "Foo Bar", email: "foo@invalid",
                 password: "foo", password confirmation: "bar")
```

但是，因为不安全（普通用户可以请求任意用户数据），所以要改用7.3.2健壮参数。

2）回顾7.2.3提交表单后，rails会利用input的name属性，构建一个名为user的Hash。Hash的键key是name的属性值，键值value是用户填写的文本。

## 7.3.2 健壮参数strong parameter

```
params.require(:user).permit(:name, :email, :password, :password_confirmation)
```

1）让params包含:user元素，只允许使用给定的栏位属性。

2）设置为私有方法，private。

## 7.3.3 注册时的错误提示信息

### 【1】针对错误信息的测试，在练习7.6。

```
>> user.errors.full_messages
=> ["Email is invalid", "Password is too short (minimum is 6 characters)"]
```

### 【2】在页面显示错误信息，用each打印。

app/views/users/new.html.erb

```
<%= render 'shared/error_messages' %>
```

app/views/shared/_error_messages.html.erb

```
<% if @user.errors.any? %>
  <div id="error_explanation">
    <div class="alert alert-error">
      The form contains <%= pluralize(@user.errors.count, "error") %>
    </div>
    <ul>
    <% @user.errors.full_messages.each do |msg| %>
      <li>* <%= msg %></li>
    <% end %>
    </ul>
  </div>
<% end %>
```

### 【3】pluralize方法

用来处理单词的单复数变化。

pluralize方法默认在控制台不可用，可以通过载入TextHelper来使用

```
>> include ActionView::Helpers::TextHelper
>> pluralize(1, "error")
=> "1 error"
>> pluralize(5, "error")
=> "5 errors"
```

### 【4】Sass的@extend函数

让错误信息显示为红色。

```
.field_with_errors {
  @extend .control-group;
  @extend .error;
}
```

## 7.4.2 flash

## 7.4.4 部署并开启SSL

确保注册、登录安全。而且可以避免会话劫持。

1）config/environments/production.rb

```
SampleApp::Application.configure do
  config.force_ssl = true
end
```

2）为域名安装SSL证书

* 可以购买和安装，比较麻烦。
* 也可以用heroku提供的二级域名，可以直接使用heroku的SSL证书，好处是方便，坏处是不能使用自己的域名。http://devcenter.heroku.com/articles/ssl

# 第八章

用户登录和退出功能

目的：rspec测试页面跳转的写法。了解cookie和remember_token的由来和作用，整理代码。sign in、current_user、sign out方法定义，要自己能够写出来。8.3.3和8.5练习，自定义帮助函数和匹配器，进行代码重构。

## 8.1 session

session是客户端和服务端的永久性连接，利用session来实现登录功能。

* 选择一，关闭浏览器后清除session。
* 选择二，记住登录状态，直到用户退出才清除session。

session是利用cookie来存储数据的。

## 8.1.1 session控制器

```
rails g controller Sessions --no-test-framework
rails g integration_test authentication_pages
```

## 8.1.3 创建表单form_for 和 form_tag

form_for(@user)，rails会向/users地址发送POST请求。在注册表单用到。

form_for(:session, url:session_path)，指明资源名称和相应的URL地址。在登录表单用到，因为没有Session魔兵，也就没有@seesion变量。

## 8.1.4 分析表单提交

1）同注册一样，这里的params是一个嵌套Hash，如下：

```
{ session: { password: "", email: "" } }
```

所以调用email地址是用

```
params[:session][:password]
```

2）create的action写法跟6.1.4节类似，都是找到用户，然后验证用户。

即User.find_by_email，然后由has_secure_password提供的authenticate方法。

```
def create
  user = User.find_by(email: params[:session][:email].downcase)
  if user && user.authenticate(params[:session][:password])
    # Sign the user in and redirect to the user's show page.
  else
    # Create an error message and re-render the signin form.
  end 
end
```

## 8.1.5 flash

flash在一个请求的生命周期里是持续存在的。重新渲染页面用render方法，它不算新的请求。

针对flash没有按预期消失，写测试。

## 8.2.1 its方法——发现不能用

```
its(:remember_token) { should_not be_blank }
```

its测试对象是指定的属性，而it是整个测试对象。上边代码等同于

```
it { expect(@user.remember_token).not_to be_blank }
```

## 8.2.1 记住我

1）session控制器提供SessionHelper帮助函数，会自动引入rails中的视图。

默认情况下，帮助函数只能在view中使用，这里要在controller用到，所以要引入

app/controllers/application_controller.rb

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception 
  include SessionsHelper #引入帮助函数
end
```

2）记住用户状态的方法：通过session函数，把用户的id保存在**『记忆权标 remember token』**中，即浏览器的cookie中。

```
session[:remember_token] = user.id
```

在网站的任何页面，调用用户对象，使用：

```
User.find(session[:remember_token]) 
```

<img src="https://ws2.sinaimg.cn/large/006tKfTcgy1fo3dba7chlj30md06jwet.jpg" width="700">

## 8.3 Cucumber

cucumber，是一个行为驱动开发BBD工具。

cucumber，使用纯文本语言Gherkin编写故事，描述应用程序的行为。经常是由客户来编写的。但是，对于程序员来说，可能纯文本的故事会很啰嗦。

cucumber，阅读性好，但是却和测试代码分开，同时削弱了功能和测试代码的作用。读起来顺口，但写起来怪怪的。

rspec，读起来不顺口，但写起来容易。

## 8.3.1 cucumber安装

1）打开Gemfile

```
group :development, :test do
  # BDD测试
  gem 'cucumber-rails'
  gem 'database_cleaner'
end
```

bundle，安装

2）生成文件夹及文件，在app/features

```
rails generate cucumber:install
```

## 8.3.2 cucumber使用案例

例如针对登录功能做测试：

1）touch features/signing_in.feature，生成放纯文本代码的文件

```
Feature: Signing in #文本描述
  Scenario: Unsuccessful signin #登录失败的场景
    Given a user visits the signin page
    When he submits invalid signin information
    Then he should see an error message
  Scenario: Successful signin #登录成功的场景
    Given a user visits the signin page
    And the user has an account
    When the user submits valid signin information
    Then he should see his profile page
	And he should see a signout link
```

其中，Feature和Scenario的行只作为描述，其余的行要和ruby代码对应。见步骤3）。

2）运行上面功能（和rspec类似）

```
cucumber features
或
rake cucumber
或
rake cucumber:ok  #鉴于某些原因，经常用这一个
```

运行结果：测试不通过。

3）让测试通过：

features/step_definitions/authentication_steps.rb

```
Given /^a user visits the signin page$/ do
  visit signin_path
end
When /^he submits invalid signin information$/ do
  click_button "Sign in"
end
Then /^he should see an error message$/ do
  expect(page).to have_selector('div.alert.alert-error')
end
Given /^the user has an account$/ do
  @user = User.create(name: "Example User", email: "user@example.com",
                      password: "foobar", password_confirmation: "foobar")
end
When /^the user submits valid signin information$/ do
  fill_in "Email",    with: @user.email
  fill_in "Password", with: @user.password
  click_button "Sign in"
end

Then /^he should see his profile page$/ do
  expect(page).to have_title(@user.name)
end
Then /^he should see a signout link$/ do
  expect(page).to have_link('Sign out', href: signout_path)
end
```

## 8.3.3

## 8.5 练习

1、什么时候用 form_for 什么时候用 form_tag ？

有对应 Model 的时候用 form_for，没有就用 form_tag，比如搜索框一般没有对应 Model。

### 2、bug——命令rspec spec，不能检测到执行单个文件里的bug

——所以，测试时修改哪个文件，就执行哪个文件的测试。



# 第九章

9.2.1课程bug

9.1、9.2更新个人资料，涉及权限限制。

9.3页面显示所有用户，涉及权限限制。创建示例数据、分页功能。

9.4删除用户，需要创建管理员。

9.5，rspec练习。

## 9.1.1 

1）rails是怎么知道创建新用户是要发送POST还是PATCH请求呢？

Active Record的new_record?方法。检测这笔资料是否存在于数据库中。

```
$ rails console
>> User.new.new_record?
=> true
>> User.first.new_record?
=> false
```

## 9.2.1 bug

```
Failure/Error: before { patch user_path(user) }
     NoMethodError:
       undefined method `patch' for #
```

原因：代码`before { patch user_path(user) }`里的patch，以及其他get、put、delete，只能用在rspece的type是request的文件中。现在我用的是feature，所以报错。

参考资料：https://stackoverflow.com/questions/18289463/undefined-method-patch-for-rspeccore-rails-tutorial-chapter-9

## 9.2.3 gem 'fake'创建示例数据

Gemfile

```
gem 'faker'
```

lib/tasks/sample_data.rake

```
namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do #确保rails任务可以获取rails环境的信息。
    User.create!(name: "Example User",  #用create!如果不合法会返回false，容易debug。
                 email: "example@railstutorial.org",
                 password: "foobar",
                 password_confirmation: "foobar",
                 admin: true)
    99.times do |n|
      name  = Faker::Name.name
      email = "example-#{n+1}@railstutorial.org"
      password  = "password"
      User.create!(name: name,
                   email: email,
                   password: password,
                   password_confirmation: password)
    end 
  end
end  
```

执行命令

```
rake db:reset
rake db:populate
rails db:migrate RAILS_ENV=test
```

## 9.3.2 分页、rspec中创建示例数据（factorybot的sequence）

```
gem 'will_paginate'
gem 'bootstrap-will_paginate'
```



# 第十章

微博的resources（前面章节是用户的resources）

has_many和belongs_to

## 10.1.3 课程bug 

### bug：rails tutorial Chapter 10  undefined method `its' for RSpec

### 解决办法：

新版本的rspec不支持its语法，要安装这个gem才能使用。

```
gem 'rspec-its'
```

参考资料：https://stackoverflow.com/questions/28014000/undefined-method-its-for-rspec-hartls-ruby-on-rails-tutorial



## 10.1.4

User.where(1)，没有查询到会返回nil。

User.find_by(1)，跟where一样，没有查询到会返回nil。

User.find(1)，没有查询到会bug报错。类似于!方法。



## 10.2.2 课程bug

### bug: rails tutorial chapter10 ArgumentError: wrong number of arguments (given 1, expected 0)

### 解决办法：

打开lib/tasks/sample_data.rake，把`users = User.all.limit(6)`改成

```
users = User.limit(6)
```

参考资料：https://stackoverflow.com/questions/23749612/wrong-number-of-arguments-1-for-0-hartl-chapter-10-bundle-exec-rake-dbpopul



## 10.3.2 课程bug，同上新文件要引入共用文件

```
Failure/Error: before { sign_in user }

     NoMethodError:
       undefined method `sign_in' for #<RSpec::ExampleGroups::MicropostPages::MicropostCreation::WithValidInformation:0x007fb44e1acea8>
```

### 解决办法：

spec/requests/micropost_pages_spec.rb

```
require 'support/utilities.rb'
```



## 10.3.3 课程bug

bug：执行`rspec spec/models/user_spec.rb`

```
An error occurred while loading ./spec/models/user_spec.rb.
Failure/Error: load file

SyntaxError:
  /Users/apple/rails/sys-sample_app/spec/models/user_spec.rb:138: syntax error, unexpected tIDENTIFIER, expecting keyword_end
      its(:feed) { should include(newe...
  ...                               ^
  /Users/apple/rails/sys-sample_app/spec/models/user_spec.rb:138: syntax error, unexpected tIDENTIFIER, expecting keyword_end
      its(:feed) { should include(olde...
  ...                               ^
  /Users/apple/rails/sys-sample_app/spec/models/user_spec.rb:138: syntax error, unexpected tIDENTIFIER, expecting keyword_end
      its(:feed) { should_not include(...
```

### 解决办法：

把测试从以下块中移出来

```
describe "micropost associations" do
  ...
end
```

然后单独作为一个块。重新执行`rspec spec/models/user_spec.rb`

```
  describe "status" do
    before { @user.save }
    let!(:older_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.day.ago)
    end
    let!(:newer_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.hour.ago)
    end
    let(:unfollowed_post) do
      FactoryGirl.create(:micropost, user: FactoryGirl.create(:user))
    end
    its(:feed) { should include(newer_micropost) }
    its(:feed) { should include(older_micropost) }
    its(:feed) { should_not include(unfollowed_post) }
  end
```



# 第十一章

关注或取消关注

首页动态显示已关注用户的微博更新

views-已关注的用户列表

views-粉丝列表

## 11.2.5课程bug

```
Failures:

  1) RelationshipsController creating a relationship with Ajax should increment the Relationship count
     Failure/Error: cookies[:remember_token] = remember_token user.update_attribute(:remember_token, User.encrypt(remember_token))

     NoMethodError:
       undefined method `remember_token' for #<RSpec::ExampleGroups::RelationshipsController::CreatingARelationshipWithAjax:0x007f836346bcf0>
     # ./spec/support/utilities.rb:29:in `sign_in'
     # ./spec/controllers/relationships_controller_spec.rb:7:in `block (2 levels) in <top (required)>'
```

### 原因：

跟上边的教材一样，没有require引入共用文件。

### 解决办法：

```

```

