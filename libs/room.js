import BaseJsonRequest from "./BaseJsonRequest.js";

export default class Room extends BaseJsonRequest {
  host = "http://rooms-nodejs";
  logger = null;

  constructor(logger, host = null) {
    super();

    if (host) {
      this.host = host;
    }

    this.logger = logger;
  }

  async getDefaultSettings(roomId) {
    return await this.get({
      path: this.host + `/room/${roomId}/settings/default`,
    });
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
