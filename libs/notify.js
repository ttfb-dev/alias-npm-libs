import fetch from 'node-fetch';

class Notifier {
  host = 'http://notify-server-nodejs-alias';

  constructor (host) {
    if (typeof host !== 'string' || host.length === 0) {
      throw new Error(`Invalid notify params: host ${host}`)
    }
    if (host) {
      this.host = host;
    }
  }

  async tgCritical(message) {
    return await this.exec( `/tg/critical`, message);
  }
  
  async exec(path, message) {
    try {
      await fetch(this.host + path, {
        method: 'post',
        body: message,
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      return true;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Notifier;
