// 调用方法时，反转this某个属性
export const toggleParam = (paramName = 'disabled') => {
  return function func(target, name, descriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args) {
      let res;
      try {
        this[paramName] = !this[paramName];
        res = await method.apply(this, args);
        return res;
      } finally {
        this[paramName] = !this[paramName];
      }
    };
  };
};

// 操作前确认
export const confirmAction = (msg, title = '提示', conf = null) => {
  return function func(target, name, descriptor) {
    if (!msg) {
      console.warn('msg参数为空，装饰器无法正常使用');
    }
    if (conf === null) {
      conf = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      };
    }
    const method = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        await this.$confirm(msg, title, conf);
      } catch {
        return;
      }
      const res = await method.apply(this, args);
      return res;
    };
  };
};

// 检查选中
export const checkSelection = (message = '配置', upperLimit = 50) => {
  return function func(target, name, descriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args) {
      const selection = args[0];
      if (!selection || selection.length === 0) {
        this.$message.warning(`请选择至少一条${message}`);
        return;
      }
      if (selection.length > upperLimit) {
        this.$message.warning(`单次操作中最多只可选择${upperLimit}条${message}`);
        return;
      }
      const res = await method.apply(this, args);
      return res;
    };
  };
};


/**
 * 检测列表内对 sourceMap属性是否都一致 如 列表作者和渠道是否一致
 * @param sourceMap {author: '作者', channel: '渠道'}
 * @returns {(function(*, *, *): void)|*}
 */
export const checkSameSource = (sourceMap) => {
  return function func(target, name, descriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args) {
      const selection = args[0];
      const regKeys = Object.keys(sourceMap)
      const keySet = new Set()
      selection.forEach((item) => {
        regKeys.forEach((key) => {
          keySet.add(item[key])
        })
      })
      if (keySet.size !== regKeys.length) {
        this.$message.info(`${Object.values(sourceMap)
          .join(',')}需一致`);
        return
      }
      const res = await method.apply(this, args);
      return res;
    };
  };
};

// 检查表单校验
export const checkFormValidate = (ref = 'form') => {
  return function func(target, name, descriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        await this.$refs[ref].validate();
      } catch (err) {
        if (err === false) {
          return;
        }
        throw err;
      }
      const res = await method.apply(this, args);
      return res;
    };
  };
};

// 检查是否是超级管理员
export const checkSuperUserPermission = () => {
  const SUPER_USER_ROLE_ID = 1;
  return function func(target, name, descriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args) {
      if (!this.$store.getters['user/roleIds'].includes(SUPER_USER_ROLE_ID)) {
        this.$message.warning('只有超级管理员允许进行该操作');
        return;
      }
      const res = await method.apply(this, args);
      return res;
    };
  };
};

// 检查权限
export const checkPermission = (permission, dejianpermission) => {
  return function check(target, name, descriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args) {
      // 得间业务线与其他业务线区分
      if (dejianpermission && this.is_dejian && !this.hasPermission(dejianpermission)) {
        this.$message.info('很抱歉，你没有得间操作权限');
        return;
      }
      if (!this.hasPermission(permission)) {
        this.$message.info('很抱歉，你没有对应操作权限');
        return;
      }
      method.apply(this, args);
    };
  };
};

