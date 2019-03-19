* 201804
* 编程+rails

# excel导入数据库time的问题

## excel xlsx文件导入数据库add_column时，时间显示不正确？

解决办法：

1）最最重要的一步：在excel里把时间格式设置为"2018/2/17  12:00:00 AM"类。

2）数据库迁移migration

```
class AddMoreDetailToGuanggaos < ActiveRecord::Migration[5.1]
  def change
    add_column :guanggaos, :riqi, :datetime
  end
end
```

运行

```
rake db:migrate
```

3）导入的时间用`Time.parse(row[0])`转换。

```
def import
    csv_string = params[:csv_file].read.force_encoding('utf-8')
    success = 0
    failed_records = []

    CSV.parse(csv_string) do |row|
      guanggao = Guanggao.new(
        :riqi =>  Time.parse(row[0]),
    ...
```

