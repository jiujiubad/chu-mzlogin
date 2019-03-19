关键词：rails export xls

帖子/视频：http://railscasts.com/episodes/362-exporting-csv-and-excel?view=asciicast



# 1、common

config/application.rb

```
require 'rails/all'
require 'csv'
```

/app/views/shop_regions/index.html.erb

```
<h2>Export ShopRegions</h2>
<p>
  Download:
  <%= link_to "CSV", region_shop_regions_path(format: "csv") %> |
  <%= link_to "Excel", region_shop_regions_path(format: "xls") %>
</p>
<hr>
```

/app/controllers/products_controller.rb

```
 def index
    @shop_regions = ShopRegion.all
    respond_to do |format|
      format.html
      format.csv { send_data @shop_regions.to_csv }
      format.xls
    end
  end
```



# 2、custom

### 练习场景1】Exporting CSV，导出csv

/app/models.product.rb，导出所有字段

```
  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |shop_region|
        csv << shop_region.attributes.values_at(*column_names)
      end
    end
  end
```



### 真实场景2】Exporting Excel，导出xls

/config/initializers/mime_types.rb 

```
Mime::Type.register "application/xls", :xls
```

app/views/shop_regions/index.xls.erb，自定义导出的字段

```
<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
          xmlns:html="http://www.w3.org/TR/REC-html40">
  <Worksheet ss:Name="Sheet1">
    <Table>
      <Row>
        <Cell><Data ss:Type="String">店铺</Data></Cell>
        <Cell><Data ss:Type="String">日期</Data></Cell>
        <Cell><Data ss:Type="String">已订购订单数量</Data></Cell>
        <Cell><Data ss:Type="String">已订购商品销售额($)</Data></Cell>
      </Row>
      <% @shop_regions.each do |shop_region| %>
        <Row>
          <Cell><Data ss:Type="Number"><%= shop_region.shop.name %></Data></Cell>
          <Cell><Data ss:Type="String"><%= shop_region.batch.us_date.to_date %></Data></Cell>
          <Cell><Data ss:Type="String"><%= shop_region.order_unpending_quantity %></Data></Cell>
          <Cell><Data ss:Type="Number"><%= shop_region.order_unpending_amount %></Data></Cell>
        </Row>
      <% end %>
    </Table>
  </Worksheet>
</Workbook>
```