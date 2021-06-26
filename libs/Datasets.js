import fetch from "node-fetch";

export default class Datasets {
  constructor(logger, host = "http://datasets-server-nodejs") {
    this.host = host;
    this.logger = logger;
  }

  async getById(id) {
    return await this.get({ path: `${this.host}/datasets/${id}` });
  }

  async getWordsById(id) {
    return await this.get({ path: `${this.host}/datasets/${id}/words` });
  }

  async getAll() {
    return await this.get({ path: `${this.host}/datasets` });
  }

  async getAllGame() {
    return await this.get({ path: `${this.host}/datasets/type/game` });
  }

  async get({ path, method = null }) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.logger.critical(error.message, {
        method: method ?? "Datasets.get",
        path,
      });
      return;
    }
  }

  async post({ path, data, method = null }) {
    try {
      const response = await fetch(path, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return true;
    } catch (error) {
      this.logger.critical(error.message, {
        method: method ?? "Datasets.post",
        path,
        data,
      });

      return false;
    }
  }
}
