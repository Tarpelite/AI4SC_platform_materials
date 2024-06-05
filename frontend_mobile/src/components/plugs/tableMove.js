import Vue from 'vue';

Vue.directive('tableMove', {
  bind: (el, binding, vnode) => {
    const odiv = el // 获取当前表格元素

    // 修改样式小手标志
    // el.style.cursor = 'pointer'
    el.querySelector('.el-table .el-table__body-wrapper').style.cursor = 'pointer'

    let mouseDownAndUpTimer = null
    let mouseOffset = 0
    let mouseFlag = false

    odiv.onmousedown = (e) => {
      const ePath = composedPath(e)
      // 拖拽表头不滑动
      if (ePath.some(res => { return res && res.className && res.className.indexOf('el-table__header') > -1 })) return

      if (e.which !== 1) return

      mouseOffset = e.clientX
      mouseDownAndUpTimer = setTimeout(() => {
        mouseFlag = true
      }, 80)
    }

    odiv.onmouseup = (e) => {
      setTimeout(() => {
        // 解决拖动列宽行不对齐问题--渲染表格
        vnode.context.$refs.dataTable.doLayout()
      }, 200)
      if (mouseFlag) {
        mouseFlag = false
      } else {
        clearTimeout(mouseDownAndUpTimer) // 清除延迟时间
      }
    }

    odiv.onmouseleave = (e) => {
      setTimeout(() => {
        // 解决拖动列宽行不对齐问题--渲染表格
        vnode.context.$refs.dataTable.doLayout()
      }, 200)
      mouseFlag = false
    }

    odiv.onmousemove = (e) => {
      if (e.which !== 1) return

      const divData = odiv.querySelector('.el-table .el-table__body-wrapper')
      if (mouseFlag && divData) {
        // 设置水平方向的元素的位置
        divData.scrollLeft -= (-mouseOffset + (mouseOffset = e.clientX))
      }
    }

    // 解决有些时候,在鼠标松开的时候,元素仍然可以拖动;
    odiv.ondragstart = (e) => {
      e.preventDefault()
    }

    odiv.ondragend = (e) => {
      e.preventDefault()
    }

    // 点击复制文本
    // odiv.onclick = (e) => {
    //   setTimeout(() => {
    //     if (mouseFlag) return
    //     if (e.target.nodeName === 'SPAN') {
    //       console.log(mouseFlag, e.target.nodeName, this)
    //       var aux = document.createElement('input')
    //       aux.setAttribute('value', e.target.outerText)
    //       document.body.appendChild(aux)
    //       aux.select()
    //       document.execCommand('copy')
    //       document.body.removeChild(aux)
    //       if (document.execCommand('copy')) {
    //         console.log('复制成功')
    //       } else {
    //         console.log('复制失败')
    //       }
    //     }
    //   }, 300)
    // }

    // 是否拖拽可选中文字
    odiv.onselectstart = () => {
      return false
    }

    // 浏览器Event.path属性不存在
    function composedPath(e) {
      // 存在则直接return
      if (e.path) { return e.path }
      // 不存在则遍历target节点
      let target = e.target
      e.path = []
      while (target.parentNode !== null) {
        e.path.push(target)
        target = target.parentNode
      }
      // 最后补上document和window
      e.path.push(document, window)
      return e.path
    }
  }
})

