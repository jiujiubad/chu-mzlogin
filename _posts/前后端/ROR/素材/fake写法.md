## 1、ihower

### 常用随机数

```
name: "No. #{i} Group"      #递增序号
user_id: User.pluck(:id).sample    #随机id
[:visa, mastercard].sample  #随机信用卡类型
rand(1..100)                #随机数字
seller_id = SecureRandom.alphanumeric.upcase[0..13]  #随机字母"IDTAVHBHD40LOU"
next_token: SecureRandom.hex 50                                  #随机一百个字符"fdafdfd...=100"
 (('a'..'z').to_a + (0..9).to_a + ('A'..'Z').to_a ).shuffle[0,99].join  #随机一百字符
SecureRandom.uuid.upcase[0..20]                      #随机字母"0CE18C55-4CDD-4204-AB"
```

### 常用Faker

```
email: Faker::Internet.email
url: "https://www.amazon.com/dp/#{Faker::Code.asin}"
title: Faker::Commerce.product_name
name: Faker::App.name
remark: Faker::App.name
```

## 2、Wells

```
namespace :fake do
  desc "TODO: Generate fake basic datas"
  task all: [
      :create_inventories,
      :create_orders
  ]

  task create_inventories: :environment do
    puts "TODO: Generate fake products."
    100.times do
      Product.create(user_id: 1, region_id: 1, title: Faker::Commerce.product_name)
    end
  end

  task create_orders: :environment do
    puts "TODO: Generate fake shops."
    50.times do
      seller_id = SecureRandom.alphanumeric.upcase[0..13]
      Shop.create(user_id: 1, region_id: 1, name: Faker::App.name, remark: Faker::App.name)
    end
  end
end
```

## 3、Aaron

```
namespace :fake do
  task all: [
      :create_batches,
      :create_inventories
  ]

  task create_batches: :environment do
    100.times do |i|
      Batch.create()
    end
    puts "TODO: Generate batch #{i}"
  end

  task create_inventories: :environment do
    100.times do |i|
      Inventories.create()
    end
    puts "TODO: Generate inventories #{i}"
  end

end
```



## batch

````
:num => nil,
:enabled => false,
````

## product

```
seller_sku = ["PT-G19T-T0SO", "iphone 7 case", "Adapter & Splitter", "6 screen protector"].sample

:shop_id => Shop.pluck(:id).sample,
:batch_id => Batch.pluck(:id).sample,
:asin => SecureRandom.alphanumeric.upcase[0..9],
:seller_sku => seller_sku,
:item_price_amount => rand(1.0..15.0).round(2),
:enabled => [true, false].sample,
```

## inventory

```
:shop_id => 1,
:batch_id => 1,
:seller_sku => "6 screen protector",
:asin => "B07CGPZBVV",
:total_supply_quantity => 2,
:in_stock_supply_quantity => 1,
:reserved_fc_transfers => 1,
:reserved_fc_processing => 2,
:enabled => false,
```

## inbound

```
:shop_id => 3,
:batch_id => 1,
:shipment_id => "FBA15C1BCVF3",
:shipment_status => "CLOSED",
:enabled => false,
```

## inbound_item

```
:inbound_id => 1,
:shipment_id => "FBA15C1BCVF3",
:seller_sku => "48-V1O5-LMWC",
:quantity_shipped => 2000,
:quantity_received => 1998,
:enabled => false,
```

## order

order_id可以有多个item

pending跟有无价格关联number_of_items_shipped、order_total_amount

```
order_id = rand(100..199).to_s + "-" + (0..9).to_a.shuffle[0..6].join + "-" + (0..9).to_a.shuffle[0..6].join

:shop_id => Shop.pluck(:id).sample,
:batch_id => Batch.pluck(:id).sample,
:amazon_order_id => order_id,
:seller_order_id => order_id,
:purchase_date => Faker::Date.between(50.days.ago, Date.today),
:order_status => ["Pending", "Shipped"].sample,
:number_of_items_shipped => 0,
:number_of_items_unshipped => 1,
:order_total_amount => nil,
:enabled => [true, false].sample,
```

## order_item

```
:id => 7,
:order_id => 7,
:asin => "B078BLM11Q",
:seller_sku => "Adapter & Splitter",
:order_item_id => "52914104405466",
:quantity_ordered => 1,
:quantity_shipped => 0,
:enabled => false,
```



步骤1 通过.last或.new查看每个表，粘贴字段

步骤2 删除字段，只保留最必要展示或查询的字段

步骤3 不同表的某些关联字段的处理

```
20.times do
          p_info = info.sample
          order_id = rand(100..199).to_s + "-" + (0..9).to_a.shuffle[0..6].join + "-" + (0..9).to_a.shuffle[0..6].join
          quantity_ordered = rand(1..5)
          quantity_shipped = [0, quantity_ordered].sample
          binding.pry
          OrderItem.create(
              :order_id => order_id,
              :asin => p_info[1],
              :seller_sku => p_info[0],
              :order_item_id => rand(50000000000000..600000000000000),
              :quantity_ordered => quantity_ordered,
              :quantity_shipped => quantity_shipped,
              :enabled => [true, false].sample
              )
        end
        puts "TODO: Generate fake order_items."

        20.times do
          order_id = OrderItem.pluck(:order_id).sample
          purchase_date = Faker::Date.between(40.days.ago, Date.today)
          quantity_shipped = OrderItem.where(order_id).sum(:quantity_shipped)
          quantity_total = OrderItem.where(order_id).sum(:quantity_ordered)
          quantity_unshipped = quantity_total - quantity_shipped
          if quantity_shipped == 0
            order_status = ["PendingAvailability", "Pending"].sample
            order_total_amount = nil
          else
            order_status = ["Unshipped", "Shipped", "PartiallyShipped", "InvoiceUnconfirmed"].sample
            seller_sku = OrderItem.find(order_id).seller_sku
            price = Product.find(seller_sku: seller_sku).item_price_amount
            quantity_ordered = OrderItem.find(order_id).quantity_ordered
            order_total_amount = price * quantity_ordered
          end
          Order.create(
              :shop_id => shop.id,
              :batch_id => batch.id,
              :amazon_order_id => order_id,
              :seller_order_id => order_id,
              :purchase_date => purchase_date,
              :order_status => order_status,
              :number_of_items_shipped => quantity_shipped,
              :number_of_items_unshipped => quantity_unshipped,
              :order_total_amount => order_total_amount,
              :enabled => [true, false].sample
          )
        end
        puts "TODO: Generate fake orders."
```

