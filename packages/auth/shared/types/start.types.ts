import { DATABASE_TYPES } from "../constants";

export type DatabaseType = (typeof DATABASE_TYPES)[number];

type DatabaseOptions = {

}

type DatabaseSetup = {
  type: DatabaseType;
  databasePool: DatabaseOptions;
};

export type initiationObject = {};