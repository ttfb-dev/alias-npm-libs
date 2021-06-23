import fetch from 'node-fetch';

class UDatasets {
  host = 'http://datasets-server-nodejs';
  logger = null

  constructor (logger, host = null) {
    if (host) {
      this.host = host;
    }

    this.logger = logger;
  }

  async activate(userId, datasetId) {
    return await this.post(this.host + `/user/${userId}/activate-dataset`, {datasetId});
  }

  async deactivate(userId, datasetId) {
    return await this.post(this.host + `/user/${userId}/deactivate-dataset`, {datasetId});
  }

  async getActive(userId) {
    return await this.get(this.host + `/user/${userId}/active`);
  }

  async get(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`)
      }

      return await response.json();
    } catch (error) {
      this.logger.critical(error.message, {method: 'UDatasets.get', path});
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
      this.logger.critical(error.message, {method: 'UDatasets.post', path, data});
      return false;
    }
  }
}

export default UDatasets;
