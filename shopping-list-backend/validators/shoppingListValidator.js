const Joi = require('joi');

exports.createShoppingListSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

exports.addMemberSchema = Joi.object({
  shoppingListId: Joi.string().required(),
  userId: Joi.string().required(),
});

exports.addItemSchema = Joi.object({
  shoppingListId: Joi.string().required(),
  item: Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  }).required(),
});
