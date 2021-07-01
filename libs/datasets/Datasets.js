import BaseDatasets from "./BaseDatasets";

export default class Datasets extends BaseDatasets {
  constructor(...args) {
    super(...args);
  }

  async getById(id) {
    return await this.get({
      path: `${this.host}/datasets/${id}`,
      method: 'Datasets.getById',
    });
  }

  async getWordsById(id) {
    return await this.get({
      path: `${this.host}/datasets/${id}/words`,
      method: 'Datasets.getWordsById',
    });
  }

  async setWordsById(id, words) {
    return await this.get({
      path: `${this.host}/datasets/${id}/words`,
      method: 'Datasets.getWordsById',
      data: words,
    });
  }

  async getAll() {
    return await this.get({
      path: `${this.host}/datasets`,
      method: 'Datasets.getAll',
    });
  }

  async getAllGame() {
    return await this.get({
      path: `${this.host}/datasets/type/game`,
      method: "Datasets.getAllGame",
    });
  }

  async setAll(datasets) {
    return await this.post({
      path: `${this.host}/datasets`,
      method: 'Datasets.setAll',
      data: datasets,
    })
  }
}
