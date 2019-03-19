# 第十八章 File 类与 Dir 类

`IO` 类是 `File` 类的父类

与文件以及目录相关的操作一般有以下几种：

- 文件的操作：名称的变更、拷贝、删除等基本操作。

- 目录的操作：目录的引用、创建、删除等操作。

- 属性的操作：“只读”等文件属性的操作。

  

## 18.1 File 类

`File.rename(before, after)` 变更文件名。还可以将文件移动到已存在的目录下（不能跨文件系统、驱动器）

```
File.rename("before.txt", "after.txt")
File.rename("data.txt", "backup/data.txt")
```

通过引用 `fileutils` 库，使用其中的 `FileUtils.cp`（文件拷贝）、`FileUtils.mv`（可以跨文件系统、驱动器的文件移动）等方法来操作文件。

```
require "fileutils"
FileUtils.cp("data.txt", "backup/data.txt")
FileUtils.mv("data.txt", "backup/data.txt")
```

`File.delete(file)` 删除文件

`File.unlink(file)` 删除文件



## 18.2 目录的操作

`Dir.pwd` 获取当前目录

`Dir.chdir(dir)` 变更当前目录

`Dir.open(path)`

`Dir.close`

和 `File.open` 同样，对 `Dir.open` 使用块后也可以省略 `close` 方法的调用。

`dir.read` 读取打开的目录下的内容

例子1：输出指定目录下的所有文件名，执行结果只显示在控制台中。

```
    def traverse(path)
      if File.directory?(path)  # 如果是目录
        dir = Dir.open(path)
        while name = dir.read
          next if name == "."   # ※
          next if name == ".."  # ※
          traverse(path + "/" + name)
        end
        dir.close
      else
        process_file(path)      # 处理文件
      end
    end
    def process_file(path)
      puts path                 # 输出结果
    end
    　
    traverse(ARGV[0])
```

`Dir.glob` 可以像 shell 那样使用 `*` 或者 `?` 等通配符（wildcard character）来取得文件名

```
# 获取当前目录中所有的文件名
Dir.glob("*")

# 获取当前目录中所有的隐藏文件名
Dir.glob(".*")

# 获取当前目录中扩展名为 .html 或者 .htm 的文件名
Dir.glob(["*.html", "*.htm"])

# 获取子目录下扩展名为 .html 或者 .htm 的文件名
Dir.glob(["*/*.html", "*/*.htm"])

# 获取文件名为 foo.c、foo.h、foo.o 的文件
Dir.glob("foo.[cho]")

# 获取目录 foo 及其子目录中所有扩展名为 .html 的文件名，递归查找目录。
Dir.glob("foo/**/*.html")
```

例子2：改写例子 1

```
def traverse(path)
  Dir.glob(["#{path}/**/*", "#{path}/**/.*"]).each do |name|
    unless File.directory?(name)
      process_file(name)
    end
  end
end
```

`Dir.mkdir(path)` 创建目录

`Dir.rmdir(path)` 删除目录



## 18.3 文件与目录的属性

`File.stat(path)` 获取文件、目录的属性

`File.ctime(path)` 文件状态的最后更改时间

`File.mtime(path)` 文件最后修改时间

`File.atime(path)` 文件最后访问时间

`File.utime(atime, mtime, path)` 改变文件属性中的最后访问时间 *atime*、最后修改时间 *mtime*

`File.chmod(mode, path)` 修改文件 *path* 的访问权限（permission）。*mode* 的值为整数值

`File.chown(owner, group, path)` 改变文件 *path* 的所有者



## 18.4 文件名的操作

`File.basename(path[, suffix])` 返回路径 *path* 中最后一个 `"/"` 以后的部分。

`File.dirname(path)` 返回路径 *path* 中最后一个 `"/"` 之前的内容

`File.extname(path)` 返回路径 *path* 中 `basename` 方法返回结果中的扩展名。

`File.split(path)` 将路径 *path* 分割为目录名与文件名两部分，并以数组形式返回

`File.join(name1[, name2, …])` 用 `File::SEPARATOR` 连接参数指定的字符串。`File::SEPARATOR` 的默认设值为 `"/"` 

`File.expand_path(path[, default_dir])` 将相对路径 *path* 转换为绝对路径



## 18.5 与操作文件相关的库

### find 库

`Find.find(dir){|path| …}` 将目录 *dir* 下的所有文件路径逐个传给路径 *path*

`Find.prune` 跳过当前查找目录下的所有路径

```
require 'find'
　
IGNORES = [ /^\./, /^CVS$/, /^RCS$/ ]
　
def listdir(top)
  Find.find(top) do |path|
    if FileTest.directory?(path)  # 如果path 是目录
      dir, base = File.split(path)
      IGNORES.each do |re|
        if re =~ base             # 需要忽略的目录
          Find.prune              # 忽略该目录下的内容的查找
        end
      end
      puts path                   # 输出结果
    end
  end
end
　
listdir(ARGV[0])
```

### tempfile 库

`Tempfile.new(basename[, tempdir])` 创建临时文件。实际生成的文件名的格式为“*basename*+ 进程 ID+ 流水号”。因此，即使使用同样的 *basename*，每次调用 `new`方法生成的临时文件也都是不一样的。

`tempfile.close(real)` 关闭临时文件

`tempfile.open` 再次打开 `close` 方法关闭的临时文件

`tempfile.path` 返回临时文件的路径

### fileutils 库

`FileUtils.cp(from, to)` 把文件从 *from* 拷贝到 *to*

`FileUtils.cp_r(from, to)` 功能与 `FileUtils.cp` 几乎一模一样，不同点在于 *from* 为目录时，则会进行递归拷贝

`FileUtils.mv(from, to)` 把文件（或者目录）*from* 移动到 *to*

`FileUtils.rm(path)` 删除 *path*。*path* 只能为文件，删除处理的过程中，若发生异常则中断处理

`FileUtils.rm_f(path)` 删除 *path*。*path* 只能为文件，删除处理的过程中，若发生异常则继续执行

`FileUtils.rm_r(path)` 删除 *path*。*path* 为目录时，则进行递归删除。删除处理的过程中，若发生异常则中断处理

`FileUtils.rm_rf(path)` 删除 *path*。*path* 为目录时，则进行递归删除。删除处理的过程中，若发生异常则继续执行

`FileUtils.compare(from, to)` 比较 *from* 与 *to* 的内容，相同则返回 `true`，否则则返回 `false`

`FileUtils.install(from, to[, option])` 把文件从 *from* 拷贝到 *to*。如果 *to* 已经存在，且与 *from* 内容一致，则不会拷贝

`FileUtils.mkdir_p(path)` 只需调用一次就可以自动创建各层的目录，比如 `FileUtils.mkdir_p("foo/bar/baz")`



在程序中生成这些对象（一部分除外）时都会消耗内存空间。例如数组、字符串等，如果长度变大了，那么它们需要的内存空间也会随之变大。

在 Ruby（Java、Perl、Lisp 等语言也都具备这样的功能）中，解析器（interpreter）会在适当的时机，释放已经没有被任何地方引用的对象所占的资源。这样的功能，我们称之为 Garbage Collection（垃圾回收的意思），简称 GC。

