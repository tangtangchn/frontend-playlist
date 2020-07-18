/**
 * Created by tangtangchn on 2019/5/20.
 * 适用于Vue项目
 * Adapts to Vue projects.
 */

function watermark (settings) {
  // 设置默认
  let defaultSettings = {
    watermark_dom: '', // 需要添加水印的dom
    watermark_txt: '', // 水印内容
    watermark_x: 50, // 水印起始位置X轴坐标
    watermark_y: 50, // 水印起始位置Y轴坐标
    watermark_rows: 4, // 水印行数
    watermark_cols: 4, // 水印列数
    watermark_x_space: 260, // 水印X轴间距
    watermark_y_space: 150, // 水印Y轴间距
    watermark_color: '#bfbfbf', // 水印字体颜色
    watermark_alpha: 0.3, // 水印透明度
    watermark_fontsize: '100px', // 水印字体大小
    watermark_font: '?????????', // 水印字体
    watermark_width: 260, // 水印宽度
    watermark_height: 150, // 水印长度
    watermark_angle: 10 // 水印倾斜度数
  }
  // 采用配置项替换默认值，作用类似jquery.extend
  if (arguments.length === 1 && typeof arguments[0] === 'object') {
    let src = arguments[0] || {}
    for (let key in src) {
      if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key]) {
        continue
      } else if (src[key]) {
        defaultSettings[key] = src[key]
      }
    }
  }
  let tempDiv = document.createDocumentFragment()
  // 获取页面最大宽度
  let pageWidth = Math.max(document.body.scrollWidth, document.body.clientWidth)
  // 获取div的宽度，将其宽度赋值给水印
  // let divWidth = defaultSettings.watermark_dom.offsetWidth
  // let pageWidth = Math.max(divWidth, divWidth)
  // 获取页面最大高度
  let pageHeight = Math.max(document.body.scrollHeight, document.body.clientHeight)
  // 获取div的高度，将其高度赋值给水印
  // let divHeight = defaultSettings.watermark_dom.offsetHeight
  // let pageHeight = Math.max(divHeight, divHeight)
  // 如果将水印的列数设置为0，或水印的列数设置过大，超过页面的最大宽度，则重新计算水印列数和水印X轴间距
  if (defaultSettings.watermark_cols === 0 ||
    (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > pageWidth)) {
    defaultSettings.watermark_cols = parseInt((pageWidth - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space))
    defaultSettings.watermark_x_space = parseInt((pageWidth - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1))
  }
  // 如果将水印的行数设置为0，或水印的行数设置过大，超过页面的最大长度，则重新计算水印行数和水印Y轴间距
  if (defaultSettings.watermark_rows === 0 ||
    (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > pageHeight)) {
    defaultSettings.watermark_rows = parseInt((pageHeight - defaultSettings.watermark_y + defaultSettings.watermark_y_space) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))
    defaultSettings.watermark_y_space = parseInt(((pageHeight - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1))
  }
  let x
  let y
  for (let i = 0; i < defaultSettings.watermark_rows; i++) {
    y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i
    for (let j = 0; j < defaultSettings.watermark_cols; j++) {
      x = defaultSettings.watermark_x + (defaultSettings.watermark_x_space + defaultSettings.watermark_width) * j
      let maskDiv = document.createElement('div')
      maskDiv.id = 'mask_div' + i + j
      maskDiv.className = 'mask_div'
      maskDiv.innerHTML = (defaultSettings.watermark_txt)
      // 设置水印div倾斜显示
      maskDiv.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.visibility = ''
      maskDiv.style.position = 'absolute'
      maskDiv.style.left = x + 'px'
      maskDiv.style.top = y + 'px'
      maskDiv.style.overflow = 'hidden'
      // maskDiv.style.zIndex = '9999' // 整数值，数值越大，表示越置前
      maskDiv.style.zIndex = '-1' // 将水印置于最底层
      maskDiv.style.pointerEvents = 'none' // 使水印不遮挡页面的点击事件（IE8 不适用）
      maskDiv.style.filter = 'alpha(opacity=50)' // 兼容IE9以下
      maskDiv.style.opacity = defaultSettings.watermark_alpha // IE9及以上兼容
      maskDiv.style.fontSize = defaultSettings.watermark_fontsize
      maskDiv.style.fontFamily = defaultSettings.watermark_font
      maskDiv.style.color = defaultSettings.watermark_color
      maskDiv.style.textAlign = 'center'
      maskDiv.style.width = defaultSettings.watermark_width + 'px'
      maskDiv.style.height = defaultSettings.watermark_height + 'px'
      maskDiv.style.display = 'block'
      tempDiv.appendChild(maskDiv)
    }
  }
  // 需要添加水印的div
  let maskElement = defaultSettings.watermark_dom
  // 将水印添加div
  maskElement.appendChild(tempDiv)
}

export default watermark
