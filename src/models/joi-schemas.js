// TODO: Delete TrackSpec & PlaylistSpec 

import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const TrackSpec = {
  title: Joi.string().required(),
  artist: Joi.string().required(),
  duration: Joi.number().allow("").optional(),
};

export const PlaylistSpec = {
  title: Joi.string().required(),
};

export const SpotSpec = {
  name: Joi.string().required(),
  category: Joi.string().allow("").optional(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
};

export const SpotEdit = {
  name: Joi.string().allow("").optional(),
  category: Joi.string().allow("").optional(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().min(-90).max(90).allow("").optional(),
  longitude: Joi.number().min(-180).max(180).allow("").optional(),
};