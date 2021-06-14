import fetch from 'node-fetch';

import Notify from './notify.js';

class Logger {
  host = '';
  service = '';

  constructor (host, service) {
    if (typeof host !== 'string' || host.length === 0 || typeof service !== 'string') {
      throw new Error(`Invalid logger params: host ${host}, service ${service}`)
    }
    this.host = host;
    this.service = service;
  }

  isValidLevel (level) {
    return ['debug', 'info', 'warning', 'error', 'critical', 'analytics'].includes(level)
  }

  isValidService (service) {
    // чтоб можно было слать пуши с фронта (frontend.client)
    // и с текущего микросервиса, в котором инициализирована либа
    // при добавлении ещё одного клиента добавлять руками сюда или переделать логику
    return ['vk-miniapp-cli', this.service].includes(service)
  }

  async debug(message, data) {
    return await this.exec('debug', this.service, { ...data, message });
  }

  async info(message, data) {
    return await this.exec('info', this.service, { ...data, message });
  }

  async warning(message, data) {
    return await this.exec('warning', this.service, { ...data, message });
  }

  async error(message, data) {
    return await this.exec('error', this.service, { ...data, message });
  }

  async critical(message, data) {
    return await this.exec('critical', this.service, { ...data, message });
  }

  async analytics(action, user_id, data) {
    return await this.execAnalytics(this.service, action, user_id, data);
  }
  
  async exec(level, service, data) {
    if (!this.isValidLevel(level)) {
      console.log(`invalid level: ${level}`)
      return ;
    }
    if (!this.isValidService(service)) {
      console.log(`invalid service: ${service}`)
      return ;
    }
    try {
      await fetch(this.host + `/service/${service}/${level}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    } catch (error) {
      console.error(error);
    }
  }
  
  async execAnalytics(service, action, user_id, data) {
    if (!this.isValidService(service)) {
      console.log(`invalid service: ${service}`)
      return ;
    }
    try {
      await fetch(this.host + `/analytics/service/${service}/action/${action}/user_id/${user_id}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Logger;
