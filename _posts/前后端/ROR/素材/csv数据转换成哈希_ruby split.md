* 201804
* 编程+ruby



1）mws，用gem peddler的get_report，请求到的数据如下：

```
#<Excon::Response:0x00007f9829cc9930 @data={:body=>"sku\tfnsku\tasin\tproduct-name\treserved_qty\treserved_customerorders\treserved_fc-transfers\treserved_fc-processing\r\nAdapter &amp; Splitter\tX001NM4JFR\tB078BLM11Q\tiPhone 7/8 Dual Lightning Adapter & Splitter with Charge, Headphone, Call, Sync for iPhone 7/8, iPhone 7 Plus/8Plus, iPhone X and More Apple Devices (Black)\t2\t0\t0\t2\r\niphone 7 case\tX001NMKDXJ\tB078GNJ2XJ\tiPhone 8 Case, iPhone 7 Case, Anti-fingerprint Thick (1.7mm) TPU Micro Frosted All-round Protection of Soft Case for iPhone 7/8 - Black\t31\t7\t3\t21", :cookies=>[], :host=>"mws.amazonservices.com", :headers=>{"Server"=>"Server", "Date"=>"Wed, 18 Apr 2018 10:39:36 GMT", "Content-Type"=>"text/plain;charset=Cp1252", "Content-Length"=>"503", "Connection"=>"keep-alive", "x-mws-quota-max"=>"60.0", "x-mws-quota-remaining"=>"48.0", "x-mws-quota-resetsOn"=>"2018-04-18T11:15:00.000Z", "Content-MD5"=>"fvxicynv2L9Z7dy9yPbMUA==", "x-mws-response-context"=>"Pwa8aAKCt4URuViVwtE8VMkXlxuXe+znF2qsWuukNP/Ms4P4VeNHZtzz7X09x5tz2dp9DO/1kYU=, HuWGtrVIAaeO1cHds8+ATNqCCGwdJq+VXx5HO/0WwejMjIEzl/MGxB8AOQEBvcw0C3E5DgiSe6o=", "x-amz-request-id"=>"be4cbbe4-4109-4d4b-83bd-4a9618eb195f", "x-mws-request-id"=>"be4cbbe4-4109-4d4b-83bd-4a9618eb195f", "x-mws-timestamp"=>"2018-04-18T10:39:35.934Z", "Vary"=>"Accept-Encoding,User-Agent"}, :path=>"/", :port=>443, :status=>200, :status_line=>"HTTP/1.1 200 OK\r\n", :reason_phrase=>"OK", :remote_ip=>"54.239.25.238", :local_port=>54454, :local_address=>"192.168.0.102"}, @body="sku\tfnsku\tasin\tproduct-name\treserved_qty\treserved_customerorders\treserved_fc-transfers\treserved_fc-processing\r\nAdapter &amp; Splitter\tX001NM4JFR\tB078BLM11Q\tiPhone 7/8 Dual Lightning Adapter & Splitter with Charge, Headphone, Call, Sync for iPhone 7/8, iPhone 7 Plus/8Plus, iPhone X and More Apple Devices (Black)\t2\t0\t0\t2\r\niphone 7 case\tX001NMKDXJ\tB078GNJ2XJ\tiPhone 8 Case, iPhone 7 Case, Anti-fingerprint Thick (1.7mm) TPU Micro Frosted All-round Protection of Soft Case for iPhone 7/8 - Black\t31\t7\t3\t21", @headers={"Server"=>"Server", "Date"=>"Wed, 18 Apr 2018 10:39:36 GMT", "Content-Type"=>"text/plain;charset=Cp1252", "Content-Length"=>"503", "Connection"=>"keep-alive", "x-mws-quota-max"=>"60.0", "x-mws-quota-remaining"=>"48.0", "x-mws-quota-resetsOn"=>"2018-04-18T11:15:00.000Z", "Content-MD5"=>"fvxicynv2L9Z7dy9yPbMUA==", "x-mws-response-context"=>"Pwa8aAKCt4URuViVwtE8VMkXlxuXe+znF2qsWuukNP/Ms4P4VeNHZtzz7X09x5tz2dp9DO/1kYU=, HuWGtrVIAaeO1cHds8+ATNqCCGwdJq+VXx5HO/0WwejMjIEzl/MGxB8AOQEBvcw0C3E5DgiSe6o=", "x-amz-request-id"=>"be4cbbe4-4109-4d4b-83bd-4a9618eb195f", "x-mws-request-id"=>"be4cbbe4-4109-4d4b-83bd-4a9618eb195f", "x-mws-timestamp"=>"2018-04-18T10:39:35.934Z", "Vary"=>"Accept-Encoding,User-Agent"}, @status=200, @remote_ip="54.239.25.238", @local_port=54454, @local_address="192.168.0.102">
```



2）先做切分

```
data_arr = res2.data[:body].split(/\r\n/).map{|i| i.split(/\t/)}
```



3）把两个数组转换成哈希键值对（ruby two array to hash）

```
Hash[*data_arr[0].zip(data_arr[2]).flatten]
```

结果如下：

```
{"sku"=>"iphone 7 case", "fnsku"=>"X001NMKDXJ", "asin"=>"B078GNJ2XJ", "product-name"=>"iPhone 8 Case, iPhone 7 Case, Anti-fingerprint Thick (1.7mm) TPU Micro Frosted All-round Protection of Soft Case for iPhone 7/8 - Black", "reserved_qty"=>"31", "reserved_customerorders"=>"7", "reserved_fc-transfers"=>"3", "reserved_fc-processing"=>"21"}
```

