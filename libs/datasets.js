import fetch from 'node-fetch';

class Datasets {
  host = 'http://datasets-server-nodejs';
  logger = null

  constructor (logger, host = null) {
    if (host) {
      this.host = host;
    }

    this.logger = logger;
  }

  async getById(datasetId) {
    return await this.get(`/datasets/${datasetId}`);
  }

  async getWordsById(datasetId) {
    return await this.get(`/datasets/${datasetId}/words`);
  }

  async getAll() {
    return await this.get(`/datasets`);
  }

  async getAllGame() {
    return await this.get(`/datasets/type/game`);
  }

  async get(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`)
      }

      return await response.json();
    } catch (error) {
      this.logger.critical(error.message, {method: 'Datasets.get', path});
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
      this.logger.critical(error.message, {method: 'Datasets.post', path, data});
      return false;
    }
  }
}

export default Datasets;
