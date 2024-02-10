import * as Joi from '@hapi/joi';

interface configValidationTypes {
    STAGE: unknown;
    DB_HOST: unknown;
    DB_PORT: unknown;
    DB_USERNAME: unknown;
    DB_PASSWORD: unknown;
    DB_NAME: unknown;
    JWT_SECRET: unknown;
}

export type configValidationValue = keyof configValidationTypes

let test1: configValidationValue = 'DB_PORT'

export const configValidationSchema = Joi.object<configValidationTypes>({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});


