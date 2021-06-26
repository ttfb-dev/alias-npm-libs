import fetch from "node-fetch";

export default class BaseDatasets {
  constructor(logger, host = "http://datasets-server-nodejs") {
    this.logger = logger;
    this.host = host;
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
        method,
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
        method,
        path,
        data,
      });

      return false;
    }
  }
}
