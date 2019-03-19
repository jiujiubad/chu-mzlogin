# chu 的个人博客
博客主题『码志』：<https://github.com/mzlogin/mzlogin.github.io>  

## 评论工具
综合回复：valine + valine-admin > gitalk > gitment > livere > 畅言

## assets 文件夹对应 css
section 首页文章列表  
pygments 代码高亮库  
posts 正文右侧目录  
pages 首页页头  
modules 搜索  
globals common 页头页尾、正文
globals prism 多行代码  
globals responsive 页头页尾、正文  
component boxed-group 和 collection 页头标题部分  
component repo-card 首页右侧项目展示 

修改 `_includes/sns-share.html` 为
```
<div class="share-component" style="margin-top: 40px;"></div>
```
修改 assets/css/globals/common.css
```
.markdown-body {
    overflow: hidden;
    font-size: 16px !important;
    font-family: "Open Sans", "Clear Sans", "Helvetica Neue" !important;
    color: rgb(51, 51, 51) !important;
    line-height: 1.6 !important;
}
.markdown-body h1 {
    padding-bottom: .3em !important;
    font-size: 2.2em !important;
    margin-top: 0em !important;
    margin-bottom: 0.85em !important;
    line-height: 1.2 !important;
    border-bottom: 1px solid #eee !important;
}
.markdown-body h2 {
    padding-bottom: .3em !important;
    font-size: 1.75em !important;
    margin-top: 1.275em !important;
    margin-bottom: 0.85em !important;
    line-height: 1.3 !important;
    border-bottom: 1px solid #eee !important;
}
.markdown-body h3 {
      font-size: 1.3em !important;
      margin-top: 1.275em !important;
      margin-bottom: 0.85em !important;
      line-height: 1.43 !important;
}
```