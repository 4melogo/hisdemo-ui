import axios from 'axios'
import {getToken} from '@/utils/auth'

const mimeMap = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip'
}

const baseUrl = process.env.VUE_APP_BASE_API
export function downLoadZip(str, filename) {
  var url = baseUrl + str
  axios({
    method: 'get',
    url: url,
    responseType: 'blob',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  }).then(res => {
    resolveBlob(res, mimeMap.zip)
    // resolveBody(res)
  })
}

/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */
export function resolveBlob(res, mimeType) {
  const aLink = document.createElement('a')
  var blob = new Blob([res.data], { type: mimeType })
  // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  var contentDisposition = decodeURI(res.headers['content-disposition'])
  var result = patt.exec(contentDisposition)
  var fileName = result[1]
  fileName = fileName.replace(/\"/g, '')
  aLink.style.display = 'none'
  aLink.href = URL.createObjectURL(blob)
  aLink.setAttribute('download', fileName) // 设置下载文件名称
  document.body.appendChild(aLink)
  aLink.click()
  URL.revokeObjectURL(aLink.href);//清除引用
  document.body.removeChild(aLink);
}

export function resolveBody(response) {

  if (response.data.type === 'application/octet-stream') {
    // 获取http头部的文件名信息，若无需重命名文件，将下面这行删去
    const fileName = response.headers['content-disposition'].split('=')[1]
    /* 兼容ie内核，360浏览器的兼容模式 */
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      const blob = new Blob([response.data], {type: 'application/zip'})
      window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
      /* 火狐谷歌的文件下载方式 */
      const blob = new Blob([response.data], {type: 'application/zip'})
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a') // 创建a标签
      link.href = url
      link.download = fileName // 文件重命名，若无需重命名，将该行删去
      link.click()
      URL.revokeObjectURL(url) // 释放内存
    }
    // resolve(response)
  } else {
    const reader = new FileReader()
    reader.onload = function (event) {
      const msg = JSON.parse(reader.result).data
      // _this.$errorMsg(message) // 将错误信息显示出来
    }
    reader.readAsText(response.data)

  }
}
