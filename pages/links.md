---
layout: page
title: 友情链接
description: 没有链接的博客是孤独的
keywords: 友情链接
comments: true
menu: 链接
permalink: /links/
---

> 没有链接的博客是孤独的，感谢朋友们！

{% for link in site.data.links %}
* [{{ link.name }}]({{ link.url }})
{% endfor %}
