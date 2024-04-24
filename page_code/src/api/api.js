import API from './request';

/**
 * 获取用户信息
 * @returns
 */
export function getUserInfo(data) {
  const url = '/authsys/loginapi/get_user_info';
  return API.get(url, data);
}

/**
 * 登出接口
 * @returns
 */
export function logout(data) {
  const url = '/authsys/api/auth_logout';
  return API.post(url, data);
}

/**
 * 登出接口
 * @returns
 */
export function ossLogin(data) {
  const url = '/authsys/api/sso_login';
  return API.post(url, data);
}

export function getNewsList(data) {
  const url = '/news/';
  return API.get(url, data);
}

export function getNewsDetail(id) {
  const url = '/news_detail/' + id;
  return API.get(url);
}

export function getRelatedNews(id) {
  const url = '/related_news/' + id;
  return API.get(url);
}
export function getScienceList() {
  const url = '/science_tasks/'
  return API.get(url);
}
export function getScienceListByCategory(data) {
  const url = '/science_tasks_filtered/'
  return API.get(url, data);
}
