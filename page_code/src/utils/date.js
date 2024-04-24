export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export const timestampToDate = (timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (String(timestamp).length === 10) { timestamp = timestamp * 1000 }
  return formatDate(new Date(timestamp), fmt)
}

// fmt  ms: 毫秒 s: 秒
export const dateToTimestamp = (data, fmt = 'ms') => {
  let timestamp = Date.parse(data)
  if (fmt === 's') {
    timestamp = parseInt(timestamp / 1000)
  }
  return timestamp
}

// 获取当天00:00:00时间戳
export const getTodayTimeTamp = (data, fmt = 'ms') => {
  const todaydayStr = formatDate(new Date(), 'yyyy-MM-dd') + ' 00:00:00'
  return new Date(todaydayStr).getTime()
}
// 获取当天23:59:59时间戳
export const getTodayEndTamp = (data, fmt = 'ms') => {
  const todaydayStr = formatDate(new Date(), 'yyyy-MM-dd') + ' 23:59:59'
  return new Date(todaydayStr).getTime()
}

// 获取明日00:00:00时间戳
export const getTomorrowTimeTamp = (data, fmt = 'ms') => {
  const tomDayStr = formatDate(new Date(Date.now() + 24 * 60 * 60000), 'yyyy-MM-dd') + ' 00:00:00'
  return new Date(tomDayStr).getTime()
}
