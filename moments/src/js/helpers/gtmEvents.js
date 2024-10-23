/* eslint-disable no-use-before-define */
// GTM EVENTS

import { generateId } from './utils';

class GTMEvents {
  constructor() {
    this.clientHeight = document.documentElement.clientHeight;
    this.fullEventData = {};
  }

  /**
  * @param {MouseEvent} event
  */
  handleClick(event) {
    const className = 'js-gtm-event';
    const target = (event.target.classList.contains(className))
      ? event.target
      : event.target.closest(`.${className}`);

    if (target) {
      const eventBlock = target;
      const clickEventData = {
        eventAction: 'click',
        eventLabel: eventBlock.getAttribute('data-event') || null,
        eventLocation: eventBlock.getAttribute('data-section') || null,
        eventContext: eventBlock.getAttribute('data-context') || null,
        eventCategory: eventBlock.getAttribute('data-event-category') || 'Interactions',
      };

      this.gaPush(clickEventData);
    }
  }

  /**
   * @param {string} eventName
   * @param {string} [eventAction]
   */
  handleDataLayerPush(eventName, eventAction) {
    this.fullEventData = {
      eventLabel: `${eventName}`,
      hitsTime: Date.now(),
      requestId: generateId(7),
      firingOptions: 'onesPerEvent',
      event: 'event',
      eventStream: 'flight',
      eventAction: `${eventAction}` || null,
      eventCategory: 'Interactions',
      eventContent: null,
      eventValue: null,
      ecommerce: null,
      ecommerceAction: false,
      noninteraction: false,
    };

    try {
      dataLayer.push(this.fullEventData);
    } catch (e) {
      console.log(this.fullEventData);
    }
  }

  gaPush(eventData) {
    this.fullEventData = {
      eventLabel: eventData.eventLabel,
      eventLocation: eventData.eventLocation || null, // data-section
      eventContext: eventData.eventContext || null,
      hitsTime: Date.now(),
      requestId: generateId(7),
      firingOptions: 'onesPerEvent',
      event: 'event',
      eventStream: 'flight',
      eventAction: eventData.eventAction,
      eventCategory: eventData.eventCategory,
      eventContent: eventData.eventContent || null,
      eventValue: eventData.eventValue || null,
      ecommerce: null,
      ecommerceAction: false,
      noninteraction: false,
    };

    try {
      dataLayer.push(this.fullEventData);
    } catch (e) {
      console.log(this.fullEventData);
    }
  }

  addEventListeners() {
    document.body.addEventListener('click', this.handleClick.bind(this));
  }
}

export default GTMEvents;
