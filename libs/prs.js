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

  async getUserParam(userId, parameter, defValue) {
    return await this.get(this.host + `/user/${userId}/parameter/${parameter}`, defValue);
  }

  async delUserParam(userId, parameter) {
    return await this.del(this.host + `/user/${userId}/parameter/${parameter}`);
  }

  async setUserParam(userId, parameter, data) {
    return await this.set(this.host + `/user/${userId}/parameter/${parameter}`, data)
  }

  async getRoomParam(roomId, parameter, defValue) {
    return await this.get(this.host + `/room/${roomId}/parameter/${parameter}`, defValue);
  }

  async delRoomParam(roomId, parameter) {
    return await this.del(this.host + `/room/${roomId}/parameter/${parameter}`);
  }

  async setRoomParam(roomId, parameter, data) {
    return await this.set(this.host + `/room/${roomId}/parameter/${parameter}`, data)
  }

  async getRoomGameParam(roomId, gameId, parameter, defValue) {
    return await this.get(this.host + `/room/${roomId}/game/${gameId}/parameter/${parameter}`, defValue);
  }

  async delRoomGameParam(roomId, gameId, parameter) {
    return await this.del(this.host + `/room/${roomId}/game/${gameId}/parameter/${parameter}`);
  }

  async setRoomGameParam(roomId, gameId, parameter, data) {
    return await this.set(this.host + `/room/${roomId}/game/${gameId}/parameter/${parameter}`, data)
  }

  async getAppParam(parameter, defValue) {
    return await this.get(this.host + `/app/parameter/${parameter}`, defValue);
  }

  async delAppParam(parameter) {
    return await this.del(this.host + `/app/parameter/${parameter}`);
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
      if (!response.ok && response.status !== 404) { //404 - ok
        throw new Error(`Response status is not OK: ${response.status}`)
      }

      if (response.status === 404) {
        return defValue;
      }

      const result = await response.text();

      return this.convertFromString(result);
    } catch (error) {
      this.logger.error(error.message, {method: 'PrStorage.get', path});
      return defValue;
    }
  }

  async set(path, data) {
    try {
      const response = await fetch(path, {
        method: 'post',
        body: this.convertToString(data),
      });
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`)
      }
      return true;
    } catch (error) {
      this.logger.error(error.message, {method: 'PrStorage.set', path, data});
      return false;
    }
  }
  
  async del(path) {
    try {
      const response = await fetch(path, {
        method: 'delete',
      });
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`)
      }
      return true;
    } catch (error) {
      this.logger.error(error.message, {method: 'PrStorage.del', path});
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
