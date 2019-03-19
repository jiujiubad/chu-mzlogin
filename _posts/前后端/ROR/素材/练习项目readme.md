```
class Admin::SuppliersController < ApplicationController
  before_action :find_supplier, only: [:edit, :update, :destroy]

  def index
    @suppliers = Supplier.all
    @supplier = Supplier.new
  end

  def edit
  end

  def create
    @supplier = Supplier.new(supplier_params)
    if @supplier.save
      redirect_back(fallback_location: root_path)
    else
      flash[:alert] = "创建失败"
    end
  end

  def update
    if @supplier.update(supplier_params)
      redirect_to root_path
    else
      redirect_to shop_regions_path
    end
  end

  def destroy
    @supplier.destroy
    redirect_back(fallback_location: root_path)
  end

  private 

  def find_supplier
    @supplier = Supplier.find(params[:id])
  end  

  def supplier_params
    params.require(:supplier).permit(:name)
  end
end



<%= f.label "新增供应商" %>
<%= f.text_field :name %>
<%= f.submit "保存" %>



<div class="col-md-2">
  <%= form_for @supplier, :url => admin_suppliers_path do |f| %>
    <%= render :partial => "form", :locals => { :f => f } %>
  <% end %>
</div>

<div class="table-responsive">
  <table id="datatable-1" class="table table-datatable table-striped table-hover">
    <thead>
      <tr>
        <th>id</th>
        <th>供应商名称</th>
        <th>管理</th>
      </tr>
    </thead>
    <tbody>
      <% @suppliers.each do |supplier| %>
        <tr>
          <td><%= supplier.id %></td>
          <td><%= supplier.name %></td>
          <td>
            <%= link_to '编辑', edit_admin_supplier_path(supplier), class:'btn btn-danger btn-sm pull-right' %>
            <%= link_to '删除', admin_supplier_path(supplier), class:'btn btn-danger btn-sm pull-right', method: :delete %>
          </td>
        </tr>
      <% end %>
    </tbody>
  </table>
</div>
```









```
# 遇到的问题

## 5. gem devise tag:login/logout/signup/flash不能关闭/dropdown下拉菜单失效

1）bootstrap flash 不能关闭，以及下拉菜单dropdown不能使用的问题

解决办法：bootstrap-sass官方文档，安装gem jquery-rails，并添加//= require jquery和//= require bootstrap-sprockets，特别注意//= require jquery的位置会关系到下拉菜单dropdown能不能生效、以及flash能不能关闭。

​```
//= require rails-ujs
//= require jquery
//= require bootstrap-sprockets
//= require bootstrap/dropdown
//= require activestorage
//= require turbolinks
//= require bootstrap/alert
//= require_tree .
​```


## 11. gem carrierwave + mini_magick tag:上传/裁剪/upload/ignore

1）上传图片的时候报错，上传不了？

解决办法：运行以下命令，然后bundle。

​```
brew upgrade imagemagick
​```


## 13. add_to_cart button tag:redirect_to :back

1）redirect_to :back ，返回报错

rails5.1之后取消这个用法，替代的写法是：

​```
redirect_back(fallback_location: root_path)
​```


## 14. add_product_to_cart

1）model常用

​```
rails g model xx yy:references
has_many :xxs, dependent: :destroy
belongs_to :yy, optional: true
​```


## 15. 自定义current_cart.add_product_to_cart

1）代码解释

​```
  helper_method :current_cart

  def current_cart
    @current_cart ||= find_cart
  end
  
  private
  
  def find_cart
    cart = Cart.find_by(id: session[:cart_id])
    if cart.blank?
      cart = Cart.create
    end
    session[:cart_id] = cart.id
    return cart
  end
​```

* helper_method用后就能使用@current_cart？

* Cart.find_by(id: session[:cart_id])，这里的session是什么，为什么在rails c里不能使用？
```



# 一、教程及网址



# 二、遇到的问题

## 5】 gem devise tag:login/logout/signup/flash不能关闭/dropdown下拉菜单失效

1）bootstrap flash 不能关闭，以及下拉菜单dropdown不能使用的问题

解决办法：bootstrap-sass官方文档，安装gem jquery-rails，并添加//= require jquery和//= require bootstrap-sprockets，特别注意//= require jquery的位置会关系到下拉菜单dropdown能不能生效、以及flash能不能关闭。

```
//= require rails-ujs
//= require jquery
//= require bootstrap-sprockets
//= require bootstrap/dropdown
//= require activestorage
//= require turbolinks
//= require bootstrap/alert
//= require_tree .
```


## 11. gem carrierwave + mini_magick tag:上传/裁剪/upload/ignore

1）上传图片的时候报错，上传不了？

解决办法：运行以下命令，然后bundle。

```
brew upgrade imagemagick
```


## 13. add_to_cart button tag:redirect_to :back

1）redirect_to :back ，返回报错

rails5.1之后取消这个用法，替代的写法是：

```
redirect_back(fallback_location: root_path)
```


## 14. add_product_to_cart

1）model常用

```
rails g model xx yy:references
has_many :xxs, dependent: :destroy
belongs_to :yy, optional: true
```


## 15. 自定义current_cart.add_product_to_cart

1）代码解释

```
  helper_method :current_cart

  def current_cart
    @current_cart ||= find_cart
  end
  
  private
  
  def find_cart
    cart = Cart.find_by(id: session[:cart_id])
    if cart.blank?
      cart = Cart.create
    end
    session[:cart_id] = cart.id
    return cart
  end
```

* helper_method用后就能使用@current_cart？

* Cart.find_by(id: session[:cart_id])，这里的session是什么，为什么在rails c里不能使用？