import { User } from 'auth0';

export type TUser = Omit<User<Record<string, unknown>, Record<string, unknown>>, '_id'>;
