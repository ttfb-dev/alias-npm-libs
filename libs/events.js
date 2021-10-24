import BaseJsonRequest from './BaseJsonRequest.js';

class EventBus extends BaseJsonRequest {

  async newEvent (event, data) {
    const hosts = event.hosts;
    for (const host of hosts) {
      await this.post({
        path: `${host}/event`,
        data: {
          ...data,
          _name: event.name,
        }
      })
    }
  };
}

export class Event {
  name = ''
  hosts = []

  constructor({name, hosts}) {
    this.name = name;
    this.hosts = hosts;
  }
}

const hosts = {
  logux: 'http://logux-proxy',
  datasets: 'http://datasets-server-nodejs',
};

export const EVENTS = {
  USER_PLAYS_GAME_HALLOWEEN_2021: {
    name: 'user_plays_game_halloween_2021',
    hosts: [hosts.datasets]
  },
  USER_POST_REVIEW_HALLOWEEN_2021: {
    name: 'user_post_review_halloween_2021',
    hosts: [hosts.datasets],
  },
  USER_COMPLETE_EVENT_HALLOWEEN_2021: {
    name: 'user_complete_event_halloween_2021',
    hosts: [hosts.logux],
  }
}

export default EventBus;
