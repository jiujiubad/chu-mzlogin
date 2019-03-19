* 20180707



## current_cart

app/controllers/application_controller

```
+  helper_method :current_cart

+  def current_cart
+    @current_cart ||= find_cart
+  end

+  private

+  def find_cart
+    cart = Cart.find_by(id: session[:cart_id])
+    if cart.blank?
+      cart = Cart.create
+    end
+    session[:cart_id] = cart.id
+    return cart
+  end
```

## current_region

app/controllers/application_controller

```
class ApplicationController < ActionController::Base
  include Admin::SessionsHelper
end
```

app/helpers/admin/sessions_helper.rb

```
module Admin::SessionsHelper
  # 当前站点
  def current_region
    @current_region ||= Region.find(params[:region_id]||1)
  end
end
```

