关键词：rails import xls

帖子/视频：http://railscasts.com/episodes/396-importing-csv-and-excel?view=asciicast



# 一、common

config/application.rb

```
require 'rails/all'
require 'csv'
```

/app/views/shop_regions/index.html.erb

```
<h2>Import ShopRegions</h2>
<%= form_tag import_region_shop_regions_path, multipart: true do %>
  <%= file_field_tag :file %>
  <%= submit_tag "Import" %>
<% end %>
```

/config/routes.rb

```
  resources :regions do
    resources :shop_regions do
      collection do
        post :import
      end
    end
  end
```

/app/controllers/products_controller.rb

```
  def import
    ShopRegion.import(params[:file])
    redirect_to region_shop_regions_path, notice: "Products imported."
  end
```



# 二、custom

### 练习场景1】Importing CSV Data，导入新数据

/app/models.product.rb

```
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      ShopRegion.create! row.to_hash
    end
  end
```

shop_region.csv，没有id

```
shop_id,region_id,batch_id,order_unpending_amount,order_unpending_quantity,item_unpending_quantity
1,1,9,18.98,2,2
2,1,9,15.16,4,4
3,1,9,50.07,7,7
```



### 练习场景2】Modifying Existing Records，导入新数据或更新旧数据

/app/models.product.rb

```
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      product = find_by_id(row["id"]) || new
      product.attributes = row.to_hash.slice(*attribute_names)
      product.save!
    end
  end
```

shop_region.csv，有id

```
id,shop_id,region_id,batch_id,order_unpending_amount,order_unpending_quantity,item_unpending_quantity
96,1,1,9,18.98,2,2
97,2,1,9,15.16,4,4
98,3,1,9,50.07,7,7
```



### 真实场景3】Importing Excel/CSV Spreadsheets

/app/models.product.rb

```
  def self.import(file)
    spreadsheet = open_spreadsheet(file)
    header = spreadsheet.row(1)
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      shop_region = find_by_id(row["id"]) || new
      shop_region.attributes = row.to_hash.slice(*attribute_names)
      shop_region.save!
    end
  end

  def self.open_spreadsheet(file)
    case File.extname(file.original_filename)
      when '.csv' then Roo::CSV.new(file.path)
      when '.xls' then Roo::Excel.new(file.path)
      when '.xlsx' then Roo::Excelx.new(file.path)
      else raise "Unknown file type: #{file.original_filename}"
    end
  end
```

shop_region.csv，或xlsx文件，或xls文件

```
id,shop_id,region_id,batch_id,order_unpending_amount,order_unpending_quantity,item_unpending_quantity
96,1,1,9,18.98,2,2
97,2,1,9,15.16,4,4
98,3,1,9,50.07,7,7
```