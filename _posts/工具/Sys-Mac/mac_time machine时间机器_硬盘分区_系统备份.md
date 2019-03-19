* 201805
* 工具+mac



## Mac下移动硬盘的分区以及TimeMachine的备份

帖子：https://www.jianshu.com/p/5f8b4d9a8922

[Tuxera NTFS](https://link.jianshu.com/?t=http://www.tuxera.com/products/tuxera-ntfs-for-mac/download/)，在mac上读写NTFS格式

ExFAT 和 FAT32 是不同的哦！后者才有 4GB 限制，前者 Win 和 Mac 完全无压力支持读写，并且没有大小限制哦。支持使用 ExFAT：为 64 位设计的格式。



### 遇到的问题：Mac自带的磁盘工具无法对移动硬盘进行分区，分区按钮是灰色的，该怎么解决？

帖子：https://www.zhihu.com/question/37544123

> 要在左上角的视图里选择“显示所有设备”才会出现父目录，可能是系统不同的原因。然后要对整个移动硬盘的父目录做格式化的时候才会出现什么GUI。格式化之后分区就不是灰色的了。



### 新买的移动硬盘该格式化为 NTFS 还是 exFAT？ntfs

新买的移动硬盘该格式化为 NTFS 还是 exFAT：https://www.zhihu.com/question/20448164

* 最优：mac安装macfuse、[希捷硬盘paragon ntfs for mas](https://www.seagate.com/support/software/paragon/)、或[Tuxera NTFS](https://link.jianshu.com/?t=http://www.tuxera.com/products/tuxera-ntfs-for-mac/download/)，解决读写ntfs。
* exFAT，支持mac和windows，支持4g以上大文件传输。但知乎上很多人说容易出现坏道，丢数据，不稳定。
* windows安装macdrive解决读写hfs+。

