* 201804
* 编程+ruby
* 项目+mws

Nokogiri::XML::Node#parent

Nokogiri::XML::Node#children

Nokogiri::XML::Node#next

Nokogiri::XML::Node#previous




## 用Nokogiri解析xml代码并写入数据库

app/models/order.rb

```
class Order < ApplicationRecord
  require "peddler"
  require "Nokogiri"

  def self.ww
    client = MWS::Orders::Client.new(
      marketplace_id:        'ATVPDKIKX0DER',
      merchant_id:           'A2X31MLNUAZPY0',
      aws_access_key_id:     'AKIAIZWZXMWCSANJZROA',
      aws_secret_access_key: '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'
    )

    res = client.list_orders(opts = {created_after: Date.new(2018,4,2)})
    doc = Nokogiri::XML(res.body)

    doc.css('Order').each do |order|
      children = order.children
      Order.create!(
        latest_ship_date: children.css('LatestShipDate').inner_text,
        order_type: children.css('OrderType').inner_text,
        purchase_date: children.css('PurchaseDate').inner_text,
        amazon_order_id: children.css('AmazonOrderId').inner_text,
        buyer_email: children.css('BuyerEmail').inner_text,
        is_replacement_order: children.css('IsReplacementOrder').inner_text,
        last_update_date: children.css('LastUpdateDate').inner_text,
        number_of_items_shipped: children.css('NumberOfItemsShipped').inner_text,
        ship_service_level: children.css('ShipServiceLevel').inner_text,
        order_status: children.css('OrderStatus').inner_text,
        sales_channel: children.css('SalesChannel').inner_text,
        is_business_order: children.css('IsBusinessOrder').inner_text,
        number_of_items_unshipped: children.css('NumberOfItemsUnshipped').inner_text,
        payment_method_detail: children.css('PaymentMethodDetail').inner_text,
        buyer_name: children.css('BuyerName').inner_text,
        is_premium_order: children.css('IsPremiumOrder').inner_text,
        earliest_ship_date: children.css('EarliestShipDate').inner_text,
        market_place_id: children.css('MarketplaceId').inner_text,
        fulfillment_channel: children.css('FulfillmentChannel').inner_text,
        payment_method: children.css('PaymentMethod').inner_text,
        is_prime: children.css('IsPrime').inner_text,
        shipment_service_level_category: children.css('ShipmentServiceLevelCategory').inner_text,
        seller_order_id: children.css('SellerOrderId').inner_text
      )
    end
  end
end
```

在`rails c`里，执行`Order.ww`，即可把请求到的数据写入数据库。