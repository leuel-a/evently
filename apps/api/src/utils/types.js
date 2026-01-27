import {EVENT_STATUS, EVENT_TYPE} from '../models/events/schema.js';
import {TICKET_STATUS} from '../models/tickets/schema.js';

/**
 * @typedef {Object} Event
 *
 * @property {import('mongoose').Types.ObjectId} organizerId
 * @property {string} title
 * @property {string} description
 * @property {Date} date
 * @property {string} [location]
 * @property {number} price
 * @property {number} capacity
 * @property {string} [checkoutLink]
 * @property {EVENT_STATUS} status
 * @property {EVENT_TYPE} type
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} [virtualUrl]
 * @property {string} categoryId
 * @property {EventCategoryDocument} [category]
 * @property {boolean} isVirtual
 * @property {boolean} isFree
 * @property {string} [address]
 * @property {string} startTime
 * @property {string} endTime
 */

/** @typedef {import('mongoose').Document & Event} EventDocument */

/**
 * @typedef {Object} EventCategory
 *
 * @property {string} name
 * @property {string} description
 */

/** @typedef {import('mongoose').Document & EventCategory} EventCategoryDocument */

/**
 * @typedef {Object} Ticket
 *
 * @property {string} eventId
 * @property {string} purchaseName
 * @property {string} purchaseEmail
 * @property {string} paymentId
 * @property {number} amountPaid
 * @property {string} currency
 * @property {TICKET_STATUS} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} User
 *
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {string} name
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {string} [image]
 * @property {boolean} isOrganizer
 * @property {string} [organizationName]
 * @property {import('mongoose').Types.ObjectId[]} sessions
 * @property {import('mongoose').Types.ObjectId[]} accounts
 * @property {import('mongoose').Types.ObjectId[]} events
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Session
 *
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {Date} expiresAt
 * @property {string} token
 * @property {string} [ipAddress]
 * @property {string} [userAgent]
 * @property {import('mongoose').Types.ObjectId} userId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Account
 *
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {string} accountId
 * @property {string} providerId
 * @property {import('mongoose').Types.ObjectId} userId
 * @property {string} [accessToken]
 * @property {string} [refreshToken]
 * @property {string} [idToken]
 * @property {Date} [accessTokenExpiresAt]
 * @property {Date} [refreshTokenExpiresAt]
 * @property {string} [scope]
 * @property {string} [password]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Verification
 *
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {string} identifier
 * @property {string} value
 * @property {Date} expiresAt
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

export {};
