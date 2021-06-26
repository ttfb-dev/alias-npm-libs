import Datasets from "./Datasets";

export default class UserDatasets extends Datasets {
  constructor(...args) {
    super(...args);
  }

  async activate(roomId, id) {
    return await this.post({
      host: `${this.host}/user/${roomId}/activate-dataset`,
      data: {
        id,
      },
      method: "UserDatasets.post",
    });
  }

  async deactivate(roomId, id) {
    return await this.post({
      host: `${this.host}/user/${roomId}/deactivate-dataset`,
      data: {
        id,
      },
      method: "UserDatasets.post",
    });
  }

  async getActive(roomId) {
    return await this.get({
      host: `${this.host}/user/${roomId}/active`,
      method: "UserDatasets.get",
    });
  }
}
