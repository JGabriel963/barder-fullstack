import { User as UserClient } from '@prisma/client';
import crypto from 'crypto';

export class User {
  id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  stripe_customer_id: string;
  created_at: Date;
  updated_at: Date;

  subscriptions?: Subscription;
}

export class Subscription {
  id: string;
  status: string;
}
