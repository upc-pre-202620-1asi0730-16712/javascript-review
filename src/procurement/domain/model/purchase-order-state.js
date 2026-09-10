import { ValidationError } from '../../../shared/domain/model/errors.js';

export class PurchaseOrderState {
  static #VALID_STATES = {
    DRAFT: 'DRAFT',
    SUBMITTED: 'SUBMITTED',
    APPROVED: 'APPROVED',
    SHIPPED: 'SHIPPED',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
  };
  #value;

  constructor(value = PurchaseOrderState.#VALID_STATES.DRAFT) {
    this.#value = value;
  }

  #validateState(state) {
    if (!Object.values(PurchaseOrderState.#VALID_STATES).includes(state)) {
      throw new ValidationError(`Invalid state ${state} for PurchaseOrderState.#VALID_STATES. Must be one of ${Object.values(PurchaseOrderState.#VALID_STATES).join(', ')}.`);
    }
  }

  toSubmittedFrom(currentState) {
    if (currentState.value !== PurchaseOrderState.#VALID_STATES.DRAFT) {
      throw new ValidationError("PurchaseOrder can only be submitted from DRAFT state.");
    }
    return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SUBMITTED);
  }

  isDraft() {
    return this.#value === PurchaseOrderState.#VALID_STATES.DRAFT;
  }

  get value() {
    return this.#value;
  }

  equals(otherValue) {
    return otherValue instanceof PurchaseOrderState && otherValue === this.#value;
  }

}