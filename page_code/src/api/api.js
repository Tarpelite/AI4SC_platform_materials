import API from './request';

/**
 * 登出接口
 * @returns
 */
export function logout(data) {
  const url = '/authsys/api/auth_logout';
  return API.post(url, data);
}

export function sendCode(data) {
  const url = '/send_code/';
  return API.post(url, data);
}

export function register(data) {
  const url = '/register/';
  return API.post(url, data);
}

export function login(data) {
  const url = '/login/';
  return API.post(url, data);
}

export function getUserInfo() {
  const userId = sessionStorage.getItem('user_id')
  const url = `/users/${userId}`;
  return API.get(url);
}

export function getUserCollectInfo() {
  const userId = sessionStorage.getItem('user_id')
  const url = `/users/${userId}`;
  return API.get(url);
}


export function getNewsList(data) {
  const url = '/news/';
  return API.get(url, data);
}

export function getNewsHotList(data) {
  const url = '/featured_news/';
  return API.get(url, data);
}

// 还一还
export function changeHotNewsList(data) {
  const url = '/random_news/';
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

// 获取相关新闻上下文
export function getRelatedNewsContent(id) {
  const url = `/api/related_news_by_id/${id}/`;
  return API.get(url);
}

export function getScienceList(data) {
  const url = '/science_tasks/'
  return API.get(url, data);
}

export function collectNews(newsId) {
  const userId = sessionStorage.getItem('user_id')
  const url = `/api/toggle_favorite_news/${userId}/${newsId}/`;
  return API.post(url);
}

export function collectScience(scienceId) {
  const userId = sessionStorage.getItem('user_id')
  const url = `/api/toggle_favorite_science_task/${userId}/${scienceId}/`;
  return API.post(url);
}

export function getScienceDomainIntro(data) {
  const url = '/domains/'
  return API.get(url, data);
}

export function getScienceListByCategory(data) {
  const url = '/science_tasks_filtered/'
  return API.get(url, data);
}

export function getScienceDetail(id) {
  const url = `/science_task_detail/${id}/`
  return API.get(url);
}

export function getRelatedScienceList() {
  const url = `/random_science_tasks/`
  return API.get(url);
}

export function getUserCollectScienceList(scienceId) {
  const userId = sessionStorage.getItem('user_id')
  const url = `/api/toggle_favorite_science_task/${userId}/${scienceId}`;
  return API.post(url, data);
}

export function getUserCollectNews(scienceId) {
  const userId = sessionStorage.getItem('user_id')
  const url = `/api/toggle_favorite_science_task/${userId}/${scienceId}`;
  return API.post(url, data);
}

export function recordHistory(data) {
  const url = `/history/`;
  return API.post(url, data);
}

export function getUserHistory() {
  const userId = sessionStorage.getItem('user_id')
  const url = `/user_history/${userId}`;
  return API.get(url);
}

export function smartSearch(data) {
  const url = `/search/`;
  return API.get(url, data);
}
