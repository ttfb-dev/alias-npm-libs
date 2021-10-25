import BaseDatasets from "./BaseDatasets.js";

export default class UserDatasets extends BaseDatasets {
  constructor(...args) {
    super(...args);
  }

  async activate(userId, id) {
    return await this.post({
      path: `${this.host}/user/${userId}/activate-dataset`,
      data: {
        datasetId: id,
      },
      method: "UserDatasets.activate",
    });
  }

  async deactivate(userId, id) {
    return await this.post({
      path: `${this.host}/user/${userId}/deactivate-dataset`,
      data: {
        datasetId: id,
      },
      method: "UserDatasets.deactivate",
    });
  }

  async getActive(userId) {
    return await this.get({
      path: `${this.host}/user/${userId}/active`,
      method: "UserDatasets.getActive",
    });
  }

  async getFixed(userId) {
    return await this.get({
      path: `${this.host}/user/${userId}/fixed`,
      method: "UserDatasets.getFixed",
    });
  }
}
