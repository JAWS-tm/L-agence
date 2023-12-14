import app from './app';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    `\x1b[34mApp is running at \x1b[33mhttp://localhost:${app.get(
      'port'
    )}\x1b[34m in ${app.get('env')} mode\n`,
    '\x1b[32mPress CTRL-C to stop\n\x1b[37m'
  );
});

export default server;
