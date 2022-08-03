// 
window.onload = function() {

  fixHtml()
  addReamrk()
}

function fixHtml() {
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
}

function addReamrk() {

  var segments = location.href.split("/")
  var filename = segments.splice(-1).pop()
  var originhost = segments.splice(-1).pop()
  if (!filename || filename.length === 0 || filename === 'index.html'){
    filename = 'index.htm'
  }

  var container = document.getElementsByTagName('body');

  var scriptNode = document.createElement("script")
  scriptNode.src = "https://remark.feiwen.me/js/cusdis.es.js"
  var scriptNodei18n = document.createElement("script")
  scriptNodei18n.src = "https://remark.feiwen.me/js/widget/lang/zh-cn.js"
  scriptNodei18n.async = true
  scriptNode.async = true
  scriptNodei18n.defer = true
  scriptNode.defer = true
  
  var remarkNode = document.createElement("div")
  remarkNode.setAttribute("id", "cusdis_thread")
  remarkNode.setAttribute("data-host", "https://remark.feiwen.me")
  remarkNode.setAttribute("data-app-id", "eaca9665-2401-41c3-9179-69ad71885fb1")
  remarkNode.setAttribute("data-page-id", originhost + '/' + filename)
  remarkNode.setAttribute("data-page-url", location.href)
  remarkNode.setAttribute("data-page-title", document.title)

  container[0].appendChild(remarkNode)
  container[0].appendChild(scriptNodei18n)
  container[0].appendChild(scriptNode)
}