const express = require('express');
const { validateDto } = require('../middlewares/validateDto');
const { authorize } = require('../middlewares/authorize');
const {
  createShoppingList,
  addMember,
  addItem,
  markItem,
  deleteShoppingList,
} = require('../controllers/shoppingListController');
const {
  createShoppingListSchema,
  addMemberSchema,
  addItemSchema,
} = require('../validators/shoppingListValidator');

const router = express.Router();

// Ендпоінти
router.post('/create', authorize, validateDto(createShoppingListSchema), createShoppingList);
router.post('/add-member', authorize, validateDto(addMemberSchema), addMember);
router.post('/add-item', authorize, validateDto(addItemSchema), addItem);
router.post('/mark-item', authorize, markItem);
router.delete('/delete', authorize, deleteShoppingList);

module.exports = router;
