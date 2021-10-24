import fetch from 'node-fetch';

class EventBus {

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
  
  async get({ path }) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.logger.critical(error.message, {
        path,
      });
      return;
    }
  }

  async post({ path, data }) {
    try {
      const response = await fetch(path, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return true;
    } catch (error) {
      this.logger.critical(error.message, {
        path,
        data,
      });

      return false;
    }
  }
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
  USER_PLAYS_GAME_HALLOWEEN_2021 = {
    name: 'user_plays_game_halloween_2021',
    hosts: [hosts.datasets]
  },
  USER_FORWARD_POST_HALLOWEEN_2021 = {
    name: 'user_forward_post_halloween_2021',
    hosts: [hosts.datasets],
  },
  USER_COMPLETE_EVENT_HALLOWEEN_2021 = {
    name: 'user_complete_event_halloween_2021',
    hosts: [hosts.logux],
  }
}

export default EventBus;
