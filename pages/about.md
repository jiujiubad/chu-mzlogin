---
layout: page
title: 关于我
description: 少点完美，多点产出
keywords: chu
comments: true
menu: 关于
permalink: /about/
---

我是 chu

王者荣耀爱好者，生产力书控、工具控。希望专注内容，少点完美，多点产出 ~

本博客只用于辅助记录，更多系统性内容整理在 <a href="https://jiujiubad.github.io/gitbook" target="_blank">我的电子书</a>，欢迎查看。

## 联系

{% for website in site.data.social %}
<!-- * {{ website.sitename }}：[@{{ website.name }}]({{ website.url }}) -->
* {{ website.sitename }}：<{{ website.url }}>
{% endfor %}

* 微信：jiujiubad

## 技术栈

{% for category in site.data.skills %}
<!-- ### {{ category.name }} -->
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
