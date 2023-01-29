import cronTasks from './cron-tasks'

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: env.bool('PROXY', false),
  url: env('URL', 'http://localhost:1337'),
  frontendUrl: env('FRONTEND_URL', 'http://localhost:3000'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
})
