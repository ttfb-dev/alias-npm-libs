import fetch from 'node-fetch';

class PrStorage {
  host = 'http://prs-server-nodejs';
  logger = null

  constructor (logger, host = null) {
    if (host) {
      this.host = host;
    }

    this.logger = logger;
  }

  async getUserParameter(user_id, parameter, defValue) {
    return await this.get(this.host + `/user/${user_id}/parameter/${parameter}`, defValue);
  }

  async setUserParam(level, service, data) {
    try {
      await fetch(this.host + `/service/${service}/${level}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async get(path, defValue) {
    try {
      const response = await fetch(path);

      const result = await response.json();

      return result;
    } catch (error) {
      this.logger.error(error, {method: 'PrStorage.get', path});
      return defValue;
    }
  }

  async set(path, data) {
    if (typeof data !== 'object') {
      this.logger.error('PrStorage expect data as object', {method: 'PrStorage.set', path, data});
      throw new Error('Prs expect data as object');
    }
    try {
      await fetch(path, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      this.logger.error(error, {method: 'PrStorage.set', path, data});
    }
  }
}

export default PrStorage;
