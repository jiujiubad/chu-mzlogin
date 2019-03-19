* 201801
* 编程+rails



http://blog.csdn.net/jianjun200607/article/details/50543017

elasticdump，他也是可以实现导出一个索引的数据到文件中，并且可以导出索引数据到另一个集群的索引中等等功能



https://stackoverflow.com/questions/27977939/using-elasticsearch-and-or-solr-as-a-datastore-for-ms-office-and-pdf-documents

Using ElasticSearch and/or Solr as a datastore for MS Office and PDF documents



parser-excel-elasticsearch，用来将xlsx文件分析为elasticsearch。



我目前正在设计一个全文搜索系统，用户对MS Office和PDF文档进行文本查询，结果将返回最符合查询的文档列表。然后，用户将选择任何返回的文档，并在MS Word，Excel或PDF查看器中查看该文档。

我可以使用ElasticSearch或Solr将原始二进制文档（即.docx，.xlsx，.pdf文件）导入到其“数据存储”中，然后根据命令将文档导出到用户设备以供查看。

以前，我使用MongoDB 2.6.6将原始文件导入到GridFS中，并将提取的文本导入到一个单独的集合中（该集合包含一个文本索引）并且工作正常。但是，MongoDB全文搜索是非常基本的，因此我现在正在查看Solr或ElasticSearch来执行更复杂的文本搜索。



elasticsearch导入csv或excel，对某一列的每一行做搜索

功能如下：『点击按钮导入csv或excel，指定表格里的某一列，用每一行的数据分别做全文搜索。最后，点击另一个按钮可以导出所有搜索结果』。

我是一个ruby on rails新手，因为数据量上万笔所以打算由ransack改用elasticsearch。在google和stackoverflow上搜索，能找到一些csv或excel相关的gem，但还是不知道要如何实现以上功能。

请问我应该用什么gem，希望大家能帮我提供一些思路？





How to use elasticsearch Import csv or excel to search for each row of a column ？
Functions are as follows: "Click the button to import csv or excel, specify a column in the table, with full text search for each row of data. Finally, click on another button to export all search results. "
I am a ruby on rails novice, because tens of thousands of data so I intend to switch from ransack to elasticsearch. Search on google and stackoverflow, can find some csv or excel gems, but still do not know how to achieve the above functions.
What gem should I use, I hope you can help to provide some ideas?



Parse CSV file with header fields as attributes for each row，https://stackoverflow.com/questions/3717464/parse-csv-file-with-header-fields-as-attributes-for-each-row

csv-search.rb，https://gist.github.com/copiousfreetime/1367985

search through a csv file，https://www.ruby-forum.com/topic/3008843

How to search through csv files in a folder for a string through excel vba?，https://stackoverflow.com/questions/22385248/how-to-search-through-csv-files-in-a-folder-for-a-string-through-excel-vba

How do quickly search through a .csv file in Python，https://stackoverflow.com/questions/2299454/how-do-quickly-search-through-a-csv-file-in-python

Importing CSV and Excel，http://railscasts.com/episodes/396-importing-csv-and-excel