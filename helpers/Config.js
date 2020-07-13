export default {
  VERSION_INDEXDB: 1,
  INDEXDB_NAME: 'kdn',
  PAGE_SIZE: 10,
  LINK_LOGIN: `${process.env.KV_LOGIN_ENPOINT}?more_acc=1&redirectUrl=${process.env.BASE_URL}/login`,
  NOT_AUTHENTICATED: ['login']
}
