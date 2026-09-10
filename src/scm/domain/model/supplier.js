import { SupplierId } from '../../../shared/domain/model/supplier-id.js';
import { ValidationError } from '../../../shared/domain/model/errors.js';
import { Money } from '../../../shared/domain/model/money.js';

export class Supplier {
  #id;
  #name;
  #contactEmail;
  #lastOrderTotalPrice;

  constructor({ id, name, contactEmail = null, lastOrderTotalPrice = null }) {
    if (!(id instanceof SupplierId)) {
      throw new ValidationError('id must be a SupplierId');
    }

    this.#id = id;
    this.#name = name;
    this.#contactEmail = contactEmail;
    this.#lastOrderTotalPrice = lastOrderTotalPrice;
  }

  recordOrder(orderTotal) {
    if (!(orderTotal instanceof Money)) {
      throw new ValidationError('orderTotal must be a Money object');
    }

    this.#lastOrderTotalPrice = orderTotal;
  }

  #isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get contactEmail() {
    return this.#contactEmail;
  }

  get lastOrderTotalPrice() {
    return this.#lastOrderTotalPrice;
  }

}