

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
