#!/bin/bash
#
# 镜像静态网站
#

WK_DIR=$(
  cd $(dirname $0)
  pwd
)

pushd ${WK_DIR}

TARGET="newshasha3.com"
BASE_SITE="http://${TARGET}"
TIME=$(date "+%Y-%m-%d %H:%M:%S")

if [[ -d "${WK_DIR}/${TARGET}" ]]; then
  rm -rf "${WK_DIR}/${TARGET}"
fi

wget -c -m -k -np -p -E -U Mozilla --no-check-certificate $BASE_SITE
RET=$?

if [[ "$RET" == "0" ]]; then
  echo "镜像成功:${TIME}" >>mirror.log.md
else
  echo "镜像失败:$RET"
  exit -1
fi

popd
