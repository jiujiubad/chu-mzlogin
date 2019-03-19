* 201804
* 编程+api

# Wells用过的

    # 向微信发起POST请求
  	def wx_post_request(url, body)
       begin
   			uri = URI(url)
   	    res = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
   	      req = Net::HTTP::Post.new(uri,{'Content-Type'=>'application/json'})
   	      req.body = body
   	      http.request(req)
   	    end
   	    result = JSON.parse(res.body)
   	  rescue => e; p e;
   	  end
  	end

    # 向微信发起GET请求
  	def wx_get_request(url)
      begin
  			uri = URI(url)
  	    res = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
  	      req = Net::HTTP::Get.new(uri,{'Content-Type'=>'application/json'})
  	      http.request(req)
  	    end
  	    result = JSON.parse(res.body)
  	  rescue => e; p e;
  	  end
    end

    def api_set_industry(id1, id2)
      url = "https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token="+Wechat::Auth.get_access_token
      body = {"industry_id1": id1, "industry_id2": id2}.to_json
      result = Wechat::Method.wx_post_request(url, body)
    end
    
    # 获取设置的行业信息
    def get_industry
      url = "https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token="+Wechat::Auth.get_access_token
      result = Wechat::Method.wx_get_request(url)
    end


# 全栈营用过的
lib/tasks/dev.rake
    
```
namespace :dev do
  task :fetch_city => :environment do
    puts "Fetch city data..."
    response = RestClient.get "http://v.juhe.cn/weather/citys", :params => { :key => "你申请的key放这里" }
    data = JSON.parse(response.body)

    data["result"].each do |c|
      existing_city = City.find_by_juhe_id( c["id"] )
      if existing_city.nil?
        City.create!( :juhe_id => c["id"], :province => c["province"],
                      :city => c["city"], :district => c["district"] )
      end
    end
    puts "Total: #{City.count} cities"
  end
end

```
执行 `bundle exec rake dev:fetch_city `

# 日本老用ruby NET::HTTP请求call Amazon MWS Api时用到的

http://aws.typepad.com/jp_mws/2012/12/amazon-mws-ruby-sample.html

```
# -*- encoding: utf-8 -*-

require 'uri'
require 'time'
require 'openssl'
require 'base64'
require "net/https"

def url_encode(string)
  return URI.escape(string,Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
end
#####################CONFIG-各種設定項目#####################
METHOD="GET"
ACCESS_KEY_ID='A*******************'
PRIVATE_KEY='**************************'
MARKET_PLACE_ID='A1VC38T7YXB528'; #Markeplace is JP
SELLER_ID='A***************'
ENDPOINT_SCHEME='https://'
ENDPOINT_HOST='mws.amazonservices.jp' #Endpoint to JP MWS
ENDPOINT_URI='/Products/2011-10-01'
#####################CONFIG END##################

#####################INPUT-入力項目#######################
QUERY="村上 1q84"
QUERYCONTEXTID="Books"
#####################INPUT END###################

params={
  "AWSAccessKeyId"=>ACCESS_KEY_ID,
  "MarketplaceId"=>MARKET_PLACE_ID,
  "SellerId"=>SELLER_ID,
  "SignatureMethod"=>"HmacSHA256",
  "SignatureVersion"=>"2",
  "Version"=>"2011-10-01",
  "Timestamp"=>Time.now.utc.iso8601
}

params["Action"]="ListMatchingProducts"
params["Query"]=QUERY
params["QueryContextId"]=QUERYCONTEXTID

#Sorting parameters - パラメータのソート
values = params.keys.sort.collect {|key|  [url_encode(key), url_encode(params[key].to_s)].join("=") }
param=values.join("&")

#Creating Signature String - 電子署名の作成
signtemp = METHOD+"\n"+ENDPOINT_HOST+"\n"+ENDPOINT_URI+"\n"+param
signature_raw = Base64.encode64(OpenSSL::HMAC.digest('sha256',PRIVATE_KEY,signtemp)).delete("\n")
signature=URI.escape(signature_raw,Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))

param+="&Signature="+signature
#Creating URL - URLの作成
url=ENDPOINT_SCHEME+ENDPOINT_HOST+ENDPOINT_URI+"?"+param
puts url


uri=URI.parse(url)

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

#performing HTTP access - HTTPアクセスを実行
request = Net::HTTP::Get.new(uri.request_uri)
response = http.request(request)

#output results - 結果を出力
puts response.body


```