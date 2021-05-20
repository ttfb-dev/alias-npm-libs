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

  async getNextInt(parameter) {
    try {
      const response = await fetch(this.host + `/increment/parameter/${parameter}`);

      const result = await response.text();

      return parseInt(result);
    } catch (error) {
      this.logger.error(error.message, {method: 'PrStorage.getNextInt', parameter});
      return 0;
    }
  }

  async get(path, defValue) {
    try {
      const response = await fetch(path);

      const result = await response.text();

      return this.convertFromString(result);
    } catch (error) {
      this.logger.error(error.message, {method: 'PrStorage.get', path});
      return defValue;
    }
  }

  async set(path, data) {
    try {
      await fetch(path, {
        method: 'post',
        body: this.convertToString(data),
      });
      return true;
    } catch (error) {
      this.logger.error(error.message, {method: 'PrStorage.set', path, data});
      return false;
    }
  }

  convertToString(value) {
    if (value instanceof Object) {
      return JSON.stringify(value);
    }
    return String(value);
  }

  convertFromString(value) {
    if (value.length === 0) {
      return value;
    }

    if (!isNaN(value)) {
      return value.includes('.') ? parseFloat(value) : parseInt(value);
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}

export default PrStorage;
