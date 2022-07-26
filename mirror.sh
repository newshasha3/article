#!/bin/bash
#
# 镜像静态网站
#

git fetch
git checkout master -f

WK_DIR=$(
  cd $(dirname $0)
  pwd
)

TEMP_DIR=${WK_DIR}/temp

TARGET="newshasha3.com"
BASE_SITE="http://${TARGET}"
TIME=$(date "+%Y-%m-%d %H:%M:%S")

if [[ -d "${TEMP_DIR}" ]]; then
  rm -rf "${TEMP_DIR}"
fi
mkdir -p "${TEMP_DIR}"

pushd ${TEMP_DIR} >/dev/null

wget -c -m -k -np -p -E -U Mozilla --no-check-certificate $BASE_SITE
RET=$?

if [[ "$RET" == "0" ]]; then
  echo "镜像成功:${TIME}"
else
  echo "镜像失败:$RET"
  exit $RET
fi

# 转换为utf-8编码 brew install enca
enca -L zh_CN -x utf-8 ${TEMP_DIR}/${TARGET}/*.htm*
# 替换 <meta charset=gb2312> 为 <meta charset=utf-8>
sed -i "" "s/charset=gb2312/charset=utf-8/g" ${TEMP_DIR}/${TARGET}/*.htm*
# 修改 viewport 适配移动端
sed -i "" "s/<meta/<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no\"><meta/g" ${TEMP_DIR}/${TARGET}/*.htm*
# 取消table固定宽
sed -i "" "s/<table width=\"1000\"/<table/g" ${TEMP_DIR}/${TARGET}/*.htm*
# 图片适配
sed -i "" "s/<img/<img style=\"width: 100%;\"/g" ${TEMP_DIR}/${TARGET}/*.htm*
# 注入js
sed -i "" "s/<\/html>/<script src=\"plumber.js\"><\/script><\/html>/g" ${TEMP_DIR}/${TARGET}/*.htm*
# 注入样式
sed -i "" "s/<\/html>/<link rel=\"stylesheet\" type=\"text\/css\" href=\"style\.css\"><\/html>/g" ${TEMP_DIR}/${TARGET}/*.htm*
# 评论
# sed -i "" "s/<\/html>/<div\ id=\"lv-container\"\ data-id=\"city\"\ data-uid=\"MTAyMC81Njg5Ni8zMzM2MA==\">	<script\ type=\"text\/javascript\">\ (function(d,\ s)\ {\ var\ j,\ e\ =\ d.getElementsByTagName(s)[0];\ if\ (typeof\ LivereTower\ ===\ \'function\')\ {\ return;\ }\ j\ =\ d.createElement(s);\ j.src\ =\ \'https:\/\/cdn-city.livere.com\/js\/embed.dist.js\';\ j.async\ =\ true;\ e.parentNode.insertBefore(j,\ e);\ })(document,\ \'script\');	<\/script><noscript>^_^<\/noscript><\/div><\/html>/g" ${TEMP_DIR}/${TARGET}/*.htm*

cp -r ${WK_DIR}/plumber.js ${TEMP_DIR}/${TARGET}/plumber.js
cp -r ${WK_DIR}/style.css ${TEMP_DIR}/${TARGET}/style.css

popd >/dev/null

NEW_MD5=$(
  cd ${TEMP_DIR}/${TARGET}
  md5 -q *
)
OLD_MD5=$(
  cd ${WK_DIR}/${TARGET}
  md5 -q *
)

OLD_MD5=$(md5 -q -s "${OLD_MD5}")
NEW_MD5=$(md5 -q -s "${NEW_MD5}")

echo "OLD_MD5 ${OLD_MD5}"
echo "NEW_MD5 ${NEW_MD5}"

if [[ "${OLD_MD5}" == "${NEW_MD5}" ]]; then
  echo "无变化"
else
  echo "有更新"
  git fetch
  git clean -df

  git checkout master -f
  git pull
  cp -r ${TEMP_DIR}/${TARGET}/* ${WK_DIR}/${TARGET}
  git add -A
  git commit -m "镜像成功:${TIME}"
  git push
  exit 1
fi
