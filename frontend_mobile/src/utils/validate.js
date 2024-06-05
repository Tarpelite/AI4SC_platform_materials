/**
 * Created by PanJiaChen on 16/11/18.
 */
import { bookApi } from '@/api/book'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}


/* 英文逗号分隔的数字 */
export const validateDataIds = (str) => {
  const reg = /^(\d+,)*\d+$/
  return reg.test(str)
}

// 书籍ID验证
function formatIdList(idList) {
  const lens = idList.length
  const ids = idList.join(',')
  if (ids.length <= 10) {
    return ids
  }
  return `${ids.slice(0, 10) }...(${ lens })`
}

export const validateBookIds = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  if (!validateDataIds(value)) {
    callback(new Error('应该是以英文逗号分隔的数字'))
    return
  }
  if (rule.maxBookNum) {
    if (value.split(',').length > rule.maxBookNum) {
      callback(new Error(`传入书籍不能多于${rule.maxBookNum}本`))
      return
    }
  }
  // 后端说如果长度超过11位前端自己校验下，因为他去校验会报错，这很合理
  const longErrorValue = value.toString().split(',').find(item => item && item.length > 11)
  if (longErrorValue) {
    callback(new Error(`不存在ID为${longErrorValue}的书籍`))
    return;
  }
  // 通过API校验
  bookApi.validate({
    book_ids: value,
    scheme: rule.scheme
  })
    .then((resp) => {
      if (resp.code !== 0) {
        callback(new Error('请求后端接口失败'))
        return
      }
      const notExistList = resp.data.not_exist_id_list
      if (notExistList && notExistList.length) {
        let errorPrefix = '不存在ID为'
        if (rule.scheme) {
          errorPrefix = `${rule.scheme}方案下不存在ID为`
        }
        const msg = `${errorPrefix + formatIdList(notExistList)}的书籍`
        callback(new Error(msg))
        return
      }
      // 如果需要校验下架
      const offshelfList = resp.data.not_exist_id_list
      if (rule.isOnshelf && offshelfList && offshelfList.length) {
        const msg = `ID为${formatIdList(offshelfList)}的书籍已下架`
        callback(new Error(msg))
        return
      }
      // 校验是否完结
      if ('isComplete' in rule) {
        if (rule.isComplete) {
          const unCompleteList = resp.data.uncomplete_id_list
          if (unCompleteList && unCompleteList.length) {
            const msg = `ID为${formatIdList(unCompleteList)}的书籍未完结`
            callback(new Error(msg))
            return
          }
        } else {
          const completeList = resp.data.complete_id_list
          if (completeList && completeList.length) {
            const msg = `ID为${formatIdList(completeList)}的书籍已完结`
            callback(new Error(msg))
            return
          }
        }
      }
      callback()
    })
}

// 仅检查格式，不检查书籍ID是否存在
export const validateLocalBookIds = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  if (!validateDataIds(value)) {
    callback(new Error('应该是以英文逗号分隔的数字'))
    return
  }
  if (rule.maxBookNum) {
    if (value.split(',').length > rule.maxBookNum) {
      callback(new Error(`传入书籍不能多于${rule.maxBookNum}本`))
      return
    }
  }
  // 后端说如果长度超过11位前端自己校验下，因为他去校验会报错，这很合理
  const longErrorValue = value.toString().split(',').find(item => item && item.length > 11)
  if (longErrorValue) {
    callback(new Error(`不存在ID为${longErrorValue}的书籍`))
    return
  }
  callback()
}
