const host = 'http://localhost:8080/power';
// const host = '';
const APIV1 = host+'/api/v1'
const APIV2 = host+'/api/v2'
const APIV3 = '/api/v1'
module.exports = {
  name: '工程管理',
  prefix: 'engAdmin',
  footerText: 'Eng Design Admin  © 2017 suntak',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: ['http://localhost:8080'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  APIV3,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:userid`,
    userValidstatus: `${APIV1}/user/validstatus`,
    roles: `${APIV1}/roles`,
    role: `${APIV1}/role/:roleid`,
    roleValidstatus: `${APIV1}/role/validstatus`,
    posts: `${APIV1}/posts`,
    dashboard: `${APIV3}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV3}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
  token: {
    secret: {
      v1: 'TYUIOHJKRTYUIOFS345678RTYFGHJK',
    }
  }
}
