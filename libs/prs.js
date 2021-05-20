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

  async getUserParam(user_id, parameter, defValue) {
    return await this.get(this.host + `/user/${user_id}/parameter/${parameter}`, defValue);
  }

  async setUserParam(user_id, parameter, data) {
    return await this.set(this.host + `/user/${user_id}/parameter/${parameter}`, data)
  }

  async getRoomParam(room_id, parameter, defValue) {
    return await this.get(this.host + `/room/${room_id}/parameter/${parameter}`, defValue);
  }

  async setRoomParam(room_id, parameter, data) {
    return await this.set(this.host + `/room/${room_id}/parameter/${parameter}`, data)
  }

  async getAppParam(parameter, defValue) {
    return await this.get(this.host + `/app/parameter/${parameter}`, defValue);
  }

  async setAppParam(parameter, data) {
    return await this.set(this.host + `/app/parameter/${parameter}`, data)
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
      return true;
    } catch (error) {
      this.logger.error(error, {method: 'PrStorage.set', path, data});
      return false;
    }
  }
}

export default PrStorage;
