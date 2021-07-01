import BaseDatasets from "./BaseDatasets.js";

export default class UserDatasets extends BaseDatasets {
  constructor(...args) {
    super(...args);
  }

  async activate(roomId, id) {
    return await this.post({
      path: `${this.host}/user/${roomId}/activate-dataset`,
      data: {
        datasetId: id,
      },
      method: "UserDatasets.activate",
    });
  }

  async deactivate(roomId, id) {
    return await this.post({
      path: `${this.host}/user/${roomId}/deactivate-dataset`,
      data: {
        datasetId: id,
      },
      method: "UserDatasets.deactivate",
    });
  }

  async getActive(roomId) {
    return await this.get({
      path: `${this.host}/user/${roomId}/active`,
      method: "UserDatasets.getActive",
    });
  }
}
