## 1、mws hash to hash，去除表格\n\t\r

1）res4 = client3.get_report(report_id)

```
#<Excon::Response:0x00007fbd5ecad4d8 @data={:body=>"sku\tfnsku\tasin\tproduct-name\treserved_qty\treserved_customerorders\treserved_fc-transfers\treserved_fc-processing\r\niPhone 8 Case glass\tX001PNCEFB\tB079BV54RS\tMUKER iPhone 8 Case, iPhone 7 Case, TPU Bumper & Tempered Glass effective Scratch Resistant, Drop Protection and Support Wireless Charging Slim Case for iPhone 7/iPhone 8(4.7 inch)-Black\t7\t3\t3\t1\r\nGI-BESM-2EFK\tX001QYUEQF\tB07C3YF3M4\t[4 Pack] Lightning cable, [3FT 6FT 6FT 10FT] Durable Nylon Braided Lightning Cord, Data Syncing and Charging Cable Compatible with iPhone X/8/8Plus/7/7 Plus/6/6Plus/6S Plus/5/5s,iPad,iPod\t598\t269\t0\t329", :cookies=>[], :host=>"mws.amazonservices.com", :headers=>{"Server"=>"Server", "Date"=>"Fri, 08 Jun 2018 15:53:50 GMT", "Content-Type"=>"text/plain;charset=Cp1252", "Content-Length"=>"585", "Connection"=>"keep-alive", "x-mws-quota-max"=>"60.0", "x-mws-quota-remaining"=>"60.0", "x-mws-quota-resetsOn"=>"2018-06-08T16:00:00.000Z", "Content-MD5"=>"rmLUiwKzhLO7eVANv3tv/Q==", "x-mws-response-context"=>"CCB4FvHHKEKWUSKfREVulUaC4CHnYaN4slH9N+K0Rwi6+jf1dvvkgRqF+n8MuBciPr5GGbD/8kk=, 2vipNidKDh6JhlNCWYbQ1hpHMj3PoZJ1gpX3yE3uE9VKtr0xND2alObxElPjIlCJ7E1mBR4pa8I=", "x-amz-request-id"=>"b888d83a-89d7-4862-aec9-7f1cf5c9d129", "x-mws-request-id"=>"b888d83a-89d7-4862-aec9-7f1cf5c9d129", "x-mws-timestamp"=>"2018-06-08T15:53:50.059Z", "Vary"=>"Accept-Encoding,User-Agent"}, :path=>"/", :port=>443, :status=>200, :status_line=>"HTTP/1.1 200 OK\r\n", :reason_phrase=>"OK", :remote_ip=>"54.239.25.238", :local_port=>54034, :local_address=>"192.168.43.24"}, @body="sku\tfnsku\tasin\tproduct-name\treserved_qty\treserved_customerorders\treserved_fc-transfers\treserved_fc-processing\r\niPhone 8 Case glass\tX001PNCEFB\tB079BV54RS\tMUKER iPhone 8 Case, iPhone 7 Case, TPU Bumper & Tempered Glass effective Scratch Resistant, Drop Protection and Support Wireless Charging Slim Case for iPhone 7/iPhone 8(4.7 inch)-Black\t7\t3\t3\t1\r\nGI-BESM-2EFK\tX001QYUEQF\tB07C3YF3M4\t[4 Pack] Lightning cable, [3FT 6FT 6FT 10FT] Durable Nylon Braided Lightning Cord, Data Syncing and Charging Cable Compatible with iPhone X/8/8Plus/7/7 Plus/6/6Plus/6S Plus/5/5s,iPad,iPod\t598\t269\t0\t329", @headers={"Server"=>"Server", "Date"=>"Fri, 08 Jun 2018 15:53:50 GMT", "Content-Type"=>"text/plain;charset=Cp1252", "Content-Length"=>"585", "Connection"=>"keep-alive", "x-mws-quota-max"=>"60.0", "x-mws-quota-remaining"=>"60.0", "x-mws-quota-resetsOn"=>"2018-06-08T16:00:00.000Z", "Content-MD5"=>"rmLUiwKzhLO7eVANv3tv/Q==", "x-mws-response-context"=>"CCB4FvHHKEKWUSKfREVulUaC4CHnYaN4slH9N+K0Rwi6+jf1dvvkgRqF+n8MuBciPr5GGbD/8kk=, 2vipNidKDh6JhlNCWYbQ1hpHMj3PoZJ1gpX3yE3uE9VKtr0xND2alObxElPjIlCJ7E1mBR4pa8I=", "x-amz-request-id"=>"b888d83a-89d7-4862-aec9-7f1cf5c9d129", "x-mws-request-id"=>"b888d83a-89d7-4862-aec9-7f1cf5c9d129", "x-mws-timestamp"=>"2018-06-08T15:53:50.059Z", "Vary"=>"Accept-Encoding,User-Agent"}, @status=200, @remote_ip="54.239.25.238", @local_port=54034, @local_address="192.168.43.24">
```

2）res4.data[:body].split(/\r\n/)

```
["sku\tfnsku\tasin\tproduct-name\treserved_qty\treserved_customerorders\treserved_fc-transfers\treserved_fc-processing\r\niPhone 8 Case glass\tX001PNCEFB\tB079BV54RS\tMUKER iPhone 8 Case, iPhone 7 Case, TPU Bumper & Tempered Glass effective Scratch Resistant, Drop Protection and Support Wireless Charging Slim Case for iPhone 7/iPhone 8(4.7 inch)-Black\t7\t3\t3\t1\r\nGI-BESM-2EFK\tX001QYUEQF\tB07C3YF3M4\t[4 Pack] Lightning cable, [3FT 6FT 6FT 10FT] Durable Nylon Braided Lightning Cord, Data Syncing and Charging Cable Compatible with iPhone X/8/8Plus/7/7 Plus/6/6Plus/6S Plus/5/5s,iPad,iPod\t598\t269\t0\t329"]
```

3）data_arr = res4.data[:body].split(/\r\n/).map { |i| i.split(/\t/) }

```
[["sku", "fnsku", "asin", "product-name", "reserved_qty", "reserved_customerorders", "reserved_fc-transfers", "reserved_fc-processing"], ["iPhone 8 Case glass", "X001PNCEFB", "B079BV54RS", "MUKER iPhone 8 Case, iPhone 7 Case, TPU Bumper & Tempered Glass effective Scratch Resistant, Drop Protection and Support Wireless Charging Slim Case for iPhone 7/iPhone 8(4.7 inch)-Black", "7", "3", "3", "1"], ["GI-BESM-2EFK", "X001QYUEQF", "B07C3YF3M4", "[4 Pack] Lightning cable, [3FT 6FT 6FT 10FT] Durable Nylon Braided Lightning Cord, Data Syncing and Charging Cable Compatible with iPhone X/8/8Plus/7/7 Plus/6/6Plus/6S Plus/5/5s,iPad,iPod", "598", "269", "0", "329"]]
```

4）h1 = Hash[*data_arr[0].zip(data_arr[i]).flatten]

```
{"sku"=>"iPhone 8 Case glass", "fnsku"=>"X001PNCEFB", "asin"=>"B079BV54RS", "product-name"=>"MUKER iPhone 8 Case, iPhone 7 Case, TPU Bumper & Tempered Glass effective Scratch Resistant, Drop Protection and Support Wireless Charging Slim Case for iPhone 7/iPhone 8(4.7 inch)-Black", "reserved_qty"=>"7", "reserved_customerorders"=>"3", "reserved_fc-transfers"=>"3", "reserved_fc-processing"=>"1"}
```



## 2、xml to hash

`ha["ListInboundShipmentsResponse"]["ListInboundShipmentsResult"]["ShipmentData"]["member"]`

