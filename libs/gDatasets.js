import fetch from 'node-fetch';

class GDatasets {
  host = 'http://datasets-server-nodejs';
  logger = null

  constructor (logger, host = null) {
    if (host) {
      this.host = host;
    }

    this.logger = logger;
  }

  async activate(roomId, datasetId) {
    return await this.post(this.host + `/room/${roomId}/activate-dataset`, {datasetId});
  }

  async deactivate(roomId, datasetId) {
    return await this.post(this.host + `/room/${roomId}/deactivate-dataset`, {datasetId});
  }

  async getActive(roomId) {
    return await this.get(this.host + `/room/${roomId}/active`);
  }

  async get(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`)
      }

      return await response.json();
    } catch (error) {
      this.logger.critical(error.message, {method: 'GDatasets.get', path});
      return ;
    }
  }

  async post(path, data) {
    try {
      const response = await fetch(path, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`)
      }
      return true;
    } catch (error) {
      this.logger.critical(error.message, {method: 'GDatasets.post', path, data});
      return false;
    }
  }
}

export default GDatasets;
