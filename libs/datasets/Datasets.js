import BaseDatasets from "./BaseDatasets";

export default class Datasets extends BaseDatasets {
  constructor(...args) {
    super(...args);
  }

  async getById(id) {
    return await this.get({
      path: `${this.host}/datasets/${id}`,
      method: "Datasets.get",
    });
  }

  async getWordsById(id) {
    return await this.get({
      path: `${this.host}/datasets/${id}/words`,
      method: "Datasets.get",
    });
  }

  async getAll() {
    return await this.get({
      path: `${this.host}/datasets`,
      method: "Datasets.get",
    });
  }

  async getAllGame() {
    return await this.get({
      path: `${this.host}/datasets/type/game`,
      method: "Datasets.get",
    });
  }
}
