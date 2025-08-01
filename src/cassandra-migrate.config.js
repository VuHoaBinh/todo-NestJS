module.exports = {
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'user_management',
  },
  migrations: {
    dir: 'migrations',
  },
};
