import fetch from 'node-fetch';

class Notify {
  host = '';

  constructor (host = 'http://notify-server-nodejs') {
    if (typeof host !== 'string' || host.length === 0) {
      throw new Error(`Invalid notify params: host ${host}`)
    }
    this.host = host;
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

export default Notify;
