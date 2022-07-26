// 去除img标签的固定宽高
var imgs = document.getElementsByTagName('img')
for (var index = 0; index < imgs.length; index++) {
  var img = imgs[index]
  img.removeAttribute('width')
  img.removeAttribute('height')
}

// 指向当前页面的 a 标签显示为黑色
var as = document.getElementsByTagName('a')
for (var index = 0; index < as.length; index++) {
  var a = as[index]
  var clazz = a.getAttribute('class')
  var href = a.getAttribute('href')
  var ps = location.href.split('/')
  ps.splice(-1)
  ps.push(href)
  var p = ps.join('/')
  if (p == location.href) {
    a.setAttribute('class', clazz + ' ' + 'current')
  }
}

// var comment = "<div\ id=\"lv-container\"\ data-id=\"city\"\ data-uid=\"MTAyMC81Njg5Ni8zMzM2MA==\">	<script\ type=\"text\/javascript\">\ (function(d,\ s)\ {\ var\ j,\ e\ =\ d.getElementsByTagName(s)[0];\ if\ (typeof\ LivereTower\ ===\ \'function\')\ {\ return;\ }\ j\ =\ d.createElement(s);\ j.src\ =\ \'https:\/\/cdn-city.livere.com\/js\/embed.dist.js\';\ j.async\ =\ true;\ e.parentNode.insertBefore(j,\ e);\ })(document,\ \'script\');	<\/script><noscript>^_^<\/noscript><\/div>"

/**
 <!-- 来必力City版安装代码 -->
<div id="lv-container" data-id="city" data-uid="MTAyMC81Njg5Ni8zMzM2MA==">
	<script type="text/javascript">
   (function(d, s) {
       var j, e = d.getElementsByTagName(s)[0];

       if (typeof LivereTower === 'function') { return; }

       j = d.createElement(s);
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
   })(document, 'script');
	</script>
<noscript>^_^</noscript>
</div>
<!-- City版安装代码已完成 -->
 */
