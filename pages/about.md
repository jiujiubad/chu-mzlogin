---
layout: page
title: 关于我
description: 少点完美，多点产出
keywords: chu
comments: true
menu: 关于
permalink: /about/
---

『chu』

『王者荣耀』爱好者

『生产力』书控、工具控

『专注内容产出』少点完美，多点产出 ~

## 联系

{% for website in site.data.social %}
<!-- * {{ website.sitename }}：[@{{ website.name }}]({{ website.url }}) -->
* {{ website.sitename }}：<{{ website.url }}>
{% endfor %}

## 技术栈

{% for category in site.data.skills %}
<!-- ### {{ category.name }} -->
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
