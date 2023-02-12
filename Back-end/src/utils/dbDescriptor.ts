export interface DbDescriptor {
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
}

export const dbD: DbDescriptor = {
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
