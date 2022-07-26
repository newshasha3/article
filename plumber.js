
// 去除img标签的固定宽高
var imgs = document.getElementsByTagName('img');
for (var index = 0; index < imgs.length; index ++)
{
  var img = imgs[index]
  img.removeAttribute("width")
  img.removeAttribute("height")
}
