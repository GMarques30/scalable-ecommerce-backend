import { Order } from '../entity/Order'

export enum Status {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAYMENT_REFUSED = 'PAYMENT REFUSED',
  PAID = 'PAID',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export abstract class OrderStatus {
  private readonly order: Order
  abstract status: Status

  constructor(order: Order) {
    this.order = order
  }

  public getOrder() {
    return this.order
  }

  public getStatus() {
    return this.status
  }

  abstract processing(): void
  abstract refused(): void
  abstract paid(): void
  abstract sent(): void
  abstract completed(): void
  abstract canceled(): void
}

class PendingStatus extends OrderStatus {
  status: Status

  constructor(order: Order) {
    super(order)
    this.status = Status.PENDING
  }

  processing(): void {
    this.getOrder().status = new ProcessingStatus(this.getOrder())
  }

  refused(): void {
    throw new Error('Action not allowed in the current status.')
  }

  paid(): void {
    throw new Error('Action not allowed in the current status.')
  }

  sent(): void {
    throw new Error('Action not allowed in the current status.')
  }

  completed(): void {
    throw new Error('Action not allowed in the current status.')
  }

  canceled(): void {
    this.getOrder().status = new CanceledStatus(this.getOrder())
  }
}

class ProcessingStatus extends OrderStatus {
  status: Status

  constructor(order: Order) {
    super(order)
    this.status = Status.PROCESSING
  }

  processing(): void {
    throw new Error('Action not allowed in the current status.')
  }

  refused(): void {
    this.getOrder().status = new RefusedStatus(this.getOrder())
  }

  paid(): void {
    this.getOrder().status = new PaidStatus(this.getOrder())
  }

  sent(): void {
    throw new Error('Action not allowed in the current status.')
  }

  completed(): void {
    throw new Error('Action not allowed in the current status.')
  }

  canceled(): void {
    this.getOrder().status = new CanceledStatus(this.getOrder())
  }
}

class RefusedStatus extends OrderStatus {
  status: Status

  constructor(order: Order) {
    super(order)
    this.status = Status.PAYMENT_REFUSED
  }

  processing(): void {
    throw new Error('Action not allowed in the current status.')
  }

  refused(): void {
    throw new Error('Action not allowed in the current status.')
  }

  paid(): void {
    throw new Error('Action not allowed in the current status.')
  }

  sent(): void {
    throw new Error('Action not allowed in the current status.')
  }

  completed(): void {
    throw new Error('Action not allowed in the current status.')
  }

  canceled(): void {
    throw new Error('Action not allowed in the current status.')
  }
}

class PaidStatus extends OrderStatus {
  status: Status

  constructor(order: Order) {
    super(order)
    this.status = Status.PAID
  }

  processing(): void {
    throw new Error('Action not allowed in the current status.')
  }

  refused(): void {
    throw new Error('Action not allowed in the current status.')
  }

  paid(): void {
    throw new Error('Action not allowed in the current status.')
  }

  sent(): void {
    this.getOrder().status = new SentStatus(this.getOrder())
  }

  completed(): void {
    throw new Error('Action not allowed in the current status.')
  }

  canceled(): void {
    this.getOrder().status = new CanceledStatus(this.getOrder())
  }
}

class SentStatus extends OrderStatus {
  status: Status

  constructor(order: Order) {
    super(order)
    this.status = Status.SENT
  }

  processing(): void {
    throw new Error('Action not allowed in the current status.')
  }

  refused(): void {
    throw new Error('Action not allowed in the current status.')
  }

  paid(): void {
    throw new Error('Action not allowed in the current status.')
  }

  sent(): void {
    throw new Error('Action not allowed in the current status.')
  }

  completed(): void {
    this.getOrder().status = new CompletedStatus(this.getOrder())
  }

  canceled(): void {
    this.getOrder().status = new CanceledStatus(this.getOrder())
  }
}

class CompletedStatus extends OrderStatus {
  status: Status

  constructor(order: Order) {
    super(order)
    this.status = Status.COMPLETED
  }

  processing(): void {
    throw new Error('Action not allowed in the current status.')
  }

  refused(): void {
    throw new Error('Action not allowed in the current status.')
  }

  paid(): void {
    throw new Error('Action not allowed in the current status.')
  }

  sent(): void {
    throw new Error('Action not allowed in the current status.')
  }

  completed(): void {
    throw new Error('Action not allowed in the current status.')
  }

  canceled(): void {
    throw new Error('Action not allowed in the current status.')
  }
}

class CanceledStatus extends OrderStatus {
  status: Status

  constructor(order: Order) {
    super(order)
    this.status = Status.CANCELED
  }

  processing(): void {
    throw new Error('Action not allowed in the current status.')
  }

  refused(): void {
    throw new Error('Action not allowed in the current status.')
  }

  paid(): void {
    throw new Error('Action not allowed in the current status.')
  }

  sent(): void {
    throw new Error('Action not allowed in the current status.')
  }

  completed(): void {
    throw new Error('Action not allowed in the current status.')
  }

  canceled(): void {
    throw new Error('Action not allowed in the current status.')
  }
}

export class OrderStatusFactory {
  static create(order: Order, status: string) {
    if (status.toUpperCase() === Status.PENDING) return new PendingStatus(order)
    if (status.toUpperCase() === Status.PROCESSING)
      return new ProcessingStatus(order)
    if (status.toUpperCase() === Status.PAYMENT_REFUSED)
      return new RefusedStatus(order)
    if (status.toUpperCase() === Status.PAID) return new PaidStatus(order)
    if (status.toUpperCase() === Status.SENT) return new SentStatus(order)
    if (status.toUpperCase() === Status.COMPLETED)
      return new CompletedStatus(order)
    if (status.toUpperCase() === Status.CANCELED)
      return new CanceledStatus(order)
    throw new Error('Invalid status.')
  }
}
