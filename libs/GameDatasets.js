import Datasets from "./Datasets";

export default class GameDatasets extends Datasets {
  constructor() {
    super();
  }

  async activate(roomId, id) {
    return await this.post({
      host: `${this.host}/room/${roomId}/activate-dataset`,
      data: {
        id,
      },
      method: "GameDatasets.post",
    });
  }

  async deactivate(roomId, id) {
    return await this.post({
      host: `${this.host}/room/${roomId}/deactivate-dataset`,
      data: {
        id,
      },
      method: "GameDatasets.post",
    });
  }

  async getActive(roomId) {
    return await this.get({
      host: `${this.host}/room/${roomId}/active`,
      method: "GameDatasets.post",
    });
  }
}
