import markdownit from 'markdown-it'
import mk from 'markdown-it-katex'

export function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export function formatPostData(data) {
  if (isObject(data)) {
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key] = JSON.stringify(data[key])
      }
      if (isObject(data[key])) {
        data[key] = JSON.stringify(data[key])
      }
    }
    return data
  }
  return data
}

const color = ['#7874F0', '#FFA091', '#25B3B9', '#F0B42D', '#DB68D9', '#98CA43', '#3AC0F6', '#5584FB', '#FF749D', '#CA8B8B', '#AFC1D7']

export function pieChartOptions(pieObject) {
  return {
    title: {
      text: pieObject.title,
      left: 'center',
      x: 'center',
      textAlign: 'left',
      textStyle: {
        fontSize: 14,
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    color,
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      data: pieObject.showLegend ? pieObject.data && pieObject.data.map(item => item.name) : []
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: pieObject.data,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inner',
              formatter: '{d}%',
              distance: 0.5,
              textStyle: {
                align: 'center',
                color: '#fff',
                baseline: 'middle',
                fontSize: 14,
                fontWeight: 'bolder'
              }
            },
            labelLine: {
              show: false
            }
          }
        }
      }
    ]
  }
}

export function lineChartOptions(lineObj) {
  const lineOptions = {
    title: {
      text: lineObj.title,
      left: 'center',
      textAlign: 'left',
      x: 'center',
      textStyle: {
        fontSize: 14,
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
      }
    },
    grid: {
      top: '18%',
      left: '14%',
      bottom: '24%'
    },
    tooltip: lineObj.tooltip ? lineObj.tooltip : { trigger: 'axis' },
    color,
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      data: lineObj.showLegend ? lineObj.legend : []
    },
    xAxis: {
      type: 'category',
      data: lineObj.xAxis
    },
    yAxis: {
      type: 'value'
    }
  }
  const isDimensionArr = lineObj.data.some(items => {
    return Array.isArray(items);
  })
  const markPoint = lineObj.markPoint || {}
  if (isDimensionArr) {
    lineOptions.series = lineObj.data.map((item, index) => {
      return {
        name: lineObj.legend[index],
        data: item,
        type: 'line',
        smooth: true,
        markPoint
      }
    })
  } else {
    lineOptions.series = {
      name: Array.isArray(lineObj.legend) ? lineObj.legend[0] : lineObj.legend,
      data: lineObj.data,
      type: 'line',
      smooth: true,
      markPoint
    }
  }
  return lineOptions
}

export function mdParser(mdText) {
  const md = markdownit()
  md.use(mk);
  return  md.render(mdText);
}
