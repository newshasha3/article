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
  if (!filename || filename.length === 0 || filename === 'index.html') {
    filename = 'index.htm'
  }
  var issueTerm = `${originhost}/${filename}`

  var container = document.getElementsByTagName('body')

  var scriptNode = document.createElement("script")
  scriptNode.src = "https://utteranc.es/client.js"
  scriptNode.async = true
  scriptNode.setAttribute("repo", "newshasha3/article")
  scriptNode.setAttribute("issue-term", issueTerm)
  scriptNode.setAttribute("theme", "github-light")
  scriptNode.setAttribute("crossorigin", "anonymous")
  scriptNode.setAttribute("async", "true")

  var remarkNode = document.createElement("div")
  remarkNode.setAttribute("page-id", issueTerm)
  remarkNode.setAttribute("page-url", location.href)
  remarkNode.setAttribute("page-title", document.title)

  container[0].appendChild(remarkNode)
  container[0].appendChild(scriptNode)
}