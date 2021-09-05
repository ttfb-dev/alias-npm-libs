import BaseRequest from "./BaseJsonRequest";

export default class Room extends BaseRequest {
  host = "http://rooms-nodejs";
  logger = null;

  constructor(logger, host = null) {
    if (host) {
      this.host = host;
    }

    this.logger = logger;
  }

  async getSettings(roomId) {
    return await this.get({ path: this.host + `/room/${roomId}/settings` });
  }

  async getSetting(roomId, key) {
    return await this.get({
      path: this.host + `/room/${roomId}/setting/${key}`,
    });
  }

  async setSetting(roomId, key, value) {
    return await this.post({
      path: this.host + `/room/${roomId}/setting/${key}`,
      data: value,
      method: "setSetting",
    });
  }

  async setSettings(roomId, settings) {
    return await this.post({
      path: this.host + `/room/${roomId}/settings`,
      data: settings,
    });
  }
}
