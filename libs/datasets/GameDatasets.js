import BaseDatasets from "./BaseDatasets";

export default class GameDatasets extends BaseDatasets {
  constructor(...args) {
    super(...args);
  }

  async activate(roomId, id) {
    return await this.post({
      path: `${this.host}/room/${roomId}/activate-dataset`,
      data: {
        datasetId: id,
      },
      method: "GameDatasets.activate",
    });
  }

  async deactivate(roomId, id) {
    return await this.post({
      path: `${this.host}/room/${roomId}/deactivate-dataset`,
      data: {
        datasetId: id,
      },
      method: "GameDatasets.deactivate",
    });
  }

  async getActive(roomId) {
    return await this.get({
      path: `${this.host}/room/${roomId}/active`,
      method: "GameDatasets.getActive",
    });
  }
}
