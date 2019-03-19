---
title: ror-function-导出excel/导出csv/导入csv
date: '2018-01-17 23:30'
categories:
  - ror功能
tags:
  - ror功能
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fnfvqdlgzej30d608s74i.jpg'
abbrlink: a86e36c0
---

* 201801
* 编程+rails



# 一、转出csv

1、app/controllers/admin/product_controller.rb

```
require 'csv'
class Admin::ProductsController < ApplicationController
def index
  @products = Product.all
  respond_to do |format|
    format.html
    format.csv {
      @products = @products.reorder("id ASC")
      csv_string = CSV.generate do |csv|
        csv << ["id", "title", "description", "price", "quantity"]
        @products.each do |p|
          csv << [p.id, p.title, p.description, p.price, p.quantity]
        end
      end
      send_data csv_string, :filename => "products-#{Time.now.to_s(:number)}.csv"
    }
  end
end
```



2、app/views/admin/products/index.html.erb

```
<%= link_to "汇出 CSV", admin_products_path(:format => :csv), :class => "btn btn-danger" %>
```



# 二、转出excel

1、gemfile，bundle并重启rails s

```
gem 'rubyzip', '>= 1.2.1'
gem 'axlsx', git: 'https://github.com/randym/axlsx.git', ref: 'c8ac844'
gem 'axlsx_rails'
```

这几个gem，最好看官网最新文档，可能会有变化导致报错。https://github.com/straydogstudio/axlsx_rails



2、app/views/admin/products/index.html.erb

```
<%= link_to "汇出 Excel", admin_products_path(:format => :xlsx), :class => "btn btn-danger" %>
```



3、app/controllers/admin/product_controller.rb

```
def index 
  ...
  respond_to do |format|
    format.csv {
     # 略
  	}
    format.xlsx
  end
end
```



4、app/views/admin/products/index.xlsx.axlsx

```
wb = xlsx_package.workbook
wb.add_worksheet(name: "Buttons") do |sheet|
  sheet.add_row ["id", "title", "description", "price", "quantity"]
  @products.each do |p|
    sheet.add_row [p.id, p.title, p.description, p.price, p.quantity]
  end
end
```





# 三、导入csv

xlsx怎么转化为csv？Convertio，有chrome插件版和网页版，https://convertio.co/zh/xlsx-converter/



lib/tasks/dev.rake

```
require 'csv'
namespace :dev do
   task :import_csv => :environment do
     success = 0
     failed_records = []
     CSV.foreach("#{Rails.root}/tmp/products.csv") do |row|
       product = Product.new(
                          :title => row[1],
                          :description => row[2],
                          :price => row[3],
                          :quantity => row[4])
       if product.save
         success += 1
       else
         failed_records << [row, product]
       end
     end

     puts "总共汇入 #{success} 笔，失败 #{failed_records.size} 笔"
     failed_records.each do |record|
       puts "#{record[0]} ---> #{record[1].errors.full_messages}"
     end
   end
end

```

执行rake dev:import_csv



## 1）Bug第二次导入，或数据库有数据，就会报错。原因是id重复导入，其实不用加id的系统会自动加，删除这一行就可以重复导入`:id => row[0],`。

```
 ✘ apple@apple ⮀ ~/rails/jdstore005 ⮀ ⭠ test± ⮀ rake dev:import_csv
rake aborted!
ActiveRecord::RecordNotUnique: SQLite3::ConstraintException: UNIQUE constraint failed: products.id: INSERT INTO "products" ("id", "title", "description", "quantity", "price", "created_at", "updated_at") VALUES (?, ?, ?, ?, ?, ?, ?)
```



### 2）Bug，csv文件的编辑不能用excel，而是要用mac的Number，否则编辑后导入会出现utf8相关的报错。



### 3）Bug，经常忘了选文件就点上传，会报错。