import BaseDatasets from "./BaseDatasets";

export default class UserDatasets extends BaseDatasets {
  constructor(...args) {
    super(...args);
  }

  async activate(roomId, id) {
    return await this.post({
      path: `${this.host}/user/${roomId}/activate-dataset`,
      data: {
        id,
      },
      method: "UserDatasets.post",
    });
  }

  async deactivate(roomId, id) {
    return await this.post({
      path: `${this.host}/user/${roomId}/deactivate-dataset`,
      data: {
        id,
      },
      method: "UserDatasets.post",
    });
  }

  async getActive(roomId) {
    return await this.get({
      path: `${this.host}/user/${roomId}/active`,
      method: "UserDatasets.get",
    });
  }
}
