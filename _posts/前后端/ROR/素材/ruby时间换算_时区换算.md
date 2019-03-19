* 20180705



# 一、时间换算









# 二、时区换算

## 1、常用

夏令时+1，冬令时-1

    	注意：中国等国家都有多个时区，只要以一个时区为准计算，一个月下来所有数据跑不掉的。时间也统一换算成东八区，所以数据都以东八区为标准，一个月下来所有数据跑不掉的。

  * [ ] 美国站Washington：冬季utc-8，夏季utc-7。in_time_zone("Pacific Time (US & Canada)")
  * [ ] 日本站Tokyo：冬夏季utc+9。in_time_zone(("Tokyo")) 
  * [ ] 德国站Berlin：冬季utc+1，夏季utc+2。in_time_zone(("Berlin")) 
  * [ ] 英国站London：冬季utc0，夏季utc+1。in_time_zone("London") 
  * [ ] 加拿大站Ottawa：冬季utc-3，夏季utc-4。in_time_zone("Eastern Time (US & Canada)") 
  * [ ] 意大利站Rome：冬季utc+1，夏季utc+2。in_time_zone("Rome") 
  * [ ] 法国站Paris：冬季utc+1，夏季utc+2。in_time_zone("Paris")
  * [ ] 西班牙站Madrid：冬季utc+1，夏季utc+2。in_time_zone("Madrid")



## 2、总表

```
 MAPPING = {"International Date Line West" => "Pacific/Midway",
           "Midway Island" => "Pacific/Midway",
           "Samoa" => "Pacific/Pago_Pago",
           "Hawaii" => "Pacific/Honolulu",
           "Alaska" => "America/Juneau",
           "Pacific Time (US & Canada)" => "America/Los_Angeles",
           "Tijuana" => "America/Tijuana",
           "Mountain Time (US & Canada)" => "America/Denver",
           "Arizona" => "America/Phoenix",
           "Chihuahua" => "America/Chihuahua",
           "Mazatlan" => "America/Mazatlan",
           "Central Time (US & Canada)" => "America/Chicago",
           "Saskatchewan" => "America/Regina",
           "Guadalajara" => "America/Mexico_City",
           "Mexico City" => "America/Mexico_City",
           "Monterrey" => "America/Monterrey",
           "Central America" => "America/Guatemala",
           "Eastern Time (US & Canada)" => "America/New_York",
           "Indiana (East)" => "America/Indiana/Indianapolis",
           "Bogota" => "America/Bogota",
           "Lima" => "America/Lima",
           "Quito" => "America/Lima",
           "Atlantic Time (Canada)" => "America/Halifax",
           "Caracas" => "America/Caracas",
           "La Paz" => "America/La_Paz",
           "Santiago" => "America/Santiago",
           "Newfoundland" => "America/St_Johns",
           "Brasilia" => "America/Argentina/Buenos_Aires",
           "Buenos Aires" => "America/Argentina/Buenos_Aires",
           "Georgetown" => "America/Argentina/San_Juan",
           "Greenland" => "America/Godthab",
           "Mid-Atlantic" => "Atlantic/South_Georgia",
           "Azores" => "Atlantic/Azores",
           "Cape Verde Is." => "Atlantic/Cape_Verde",
           "Dublin" => "Europe/Dublin",
           "Edinburgh" => "Europe/Dublin",
           "Lisbon" => "Europe/Lisbon",
           "London" => "Europe/London",
           "Casablanca" => "Africa/Casablanca",
           "Monrovia" => "Africa/Monrovia",
           "UTC" => "Etc/UTC",
           "Belgrade" => "Europe/Belgrade",
           "Bratislava" => "Europe/Bratislava",
           "Budapest" => "Europe/Budapest",
           "Ljubljana" => "Europe/Ljubljana",
           "Prague" => "Europe/Prague",
           "Sarajevo" => "Europe/Sarajevo",
           "Skopje" => "Europe/Skopje",
           "Warsaw" => "Europe/Warsaw",
           "Zagreb" => "Europe/Zagreb",
           "Brussels" => "Europe/Brussels",
           "Copenhagen" => "Europe/Copenhagen",
           "Madrid" => "Europe/Madrid",
           "Paris" => "Europe/Paris",
           "Amsterdam" => "Europe/Amsterdam",
           "Berlin" => "Europe/Berlin",
           "Bern" => "Europe/Berlin",
           "Rome" => "Europe/Rome",
           "Stockholm" => "Europe/Stockholm",
           "Vienna" => "Europe/Vienna",
           "West Central Africa" => "Africa/Algiers",
           "Bucharest" => "Europe/Bucharest",
           "Cairo" => "Africa/Cairo",
           "Helsinki" => "Europe/Helsinki",
           "Kyev" => "Europe/Kiev",
           "Riga" => "Europe/Riga",
           "Sofia" => "Europe/Sofia",
           "Tallinn" => "Europe/Tallinn",
           "Vilnius" => "Europe/Vilnius",
           "Athens" => "Europe/Athens",
           "Istanbul" => "Europe/Istanbul",
           "Minsk" => "Europe/Minsk",
           "Jerusalem" => "Asia/Jerusalem",
           "Harare" => "Africa/Harare",
           "Pretoria" => "Africa/Johannesburg",
           "Moscow" => "Europe/Moscow",
           "St. Petersburg" => "Europe/Moscow",
           "Volgograd" => "Europe/Moscow",
           "Kuwait" => "Asia/Kuwait",
           "Riyadh" => "Asia/Riyadh",
           "Nairobi" => "Africa/Nairobi",
           "Baghdad" => "Asia/Baghdad",
           "Tehran" => "Asia/Tehran",
           "Abu Dhabi" => "Asia/Muscat",
           "Muscat" => "Asia/Muscat",
           "Baku" => "Asia/Baku",
           "Tbilisi" => "Asia/Tbilisi",
           "Yerevan" => "Asia/Yerevan",
           "Kabul" => "Asia/Kabul",
           "Ekaterinburg" => "Asia/Yekaterinburg",
           "Islamabad" => "Asia/Karachi",
           "Karachi" => "Asia/Karachi",
           "Tashkent" => "Asia/Tashkent",
           "Chennai" => "Asia/Kolkata",
           "Kolkata" => "Asia/Kolkata",
           "Mumbai" => "Asia/Kolkata",
           "New Delhi" => "Asia/Kolkata",
           "Kathmandu" => "Asia/Katmandu",
           "Astana" => "Asia/Dhaka",
           "Dhaka" => "Asia/Dhaka",
           "Sri Jayawardenepura" => "Asia/Dhaka",
           "Almaty" => "Asia/Almaty",
           "Novosibirsk" => "Asia/Novosibirsk",
           "Rangoon" => "Asia/Rangoon",
           "Bangkok" => "Asia/Bangkok",
           "Hanoi" => "Asia/Bangkok",
           "Jakarta" => "Asia/Jakarta",
           "Krasnoyarsk" => "Asia/Krasnoyarsk",
           "Beijing" => "Asia/Shanghai",
           "Chongqing" => "Asia/Chongqing",
           "Hong Kong" => "Asia/Hong_Kong",
           "Urumqi" => "Asia/Urumqi",
           "Kuala Lumpur" => "Asia/Kuala_Lumpur",
           "Singapore" => "Asia/Singapore",
           "Taipei" => "Asia/Taipei",
           "Perth" => "Australia/Perth",
           "Irkutsk" => "Asia/Irkutsk",
           "Ulaan Bataar" => "Asia/Ulaanbaatar",
           "Seoul" => "Asia/Seoul",
           "Osaka" => "Asia/Tokyo",
           "Sapporo" => "Asia/Tokyo",
           "Tokyo" => "Asia/Tokyo",
           "Yakutsk" => "Asia/Yakutsk",
           "Darwin" => "Australia/Darwin",
           "Adelaide" => "Australia/Adelaide",
           "Canberra" => "Australia/Melbourne",
           "Melbourne" => "Australia/Melbourne",
           "Sydney" => "Australia/Sydney",
           "Brisbane" => "Australia/Brisbane",
           "Hobart" => "Australia/Hobart",
           "Vladivostok" => "Asia/Vladivostok",
           "Guam" => "Pacific/Guam",
           "Port Moresby" => "Pacific/Port_Moresby",
           "Magadan" => "Asia/Magadan",
           "Solomon Is." => "Asia/Magadan",
           "New Caledonia" => "Pacific/Noumea",
           "Fiji" => "Pacific/Fiji",
           "Kamchatka" => "Asia/Kamchatka",
           "Marshall Is." => "Pacific/Majuro",
           "Auckland" => "Pacific/Auckland",
           "Wellington" => "Pacific/Auckland",
           "Nuku'alofa" => "Pacific/Tongatapu"
}
```

