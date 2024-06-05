const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  phone: (state) => state.user.phone,
  nickName: (state) => state.user.nickName,
  realName: (state) => state.user.realName,
  roles: (state) => state.user.roles,
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  permission_routes: (state) => state.permission.routes
};
export default getters;
