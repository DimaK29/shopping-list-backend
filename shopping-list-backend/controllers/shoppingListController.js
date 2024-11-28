let shoppingLists = []; // Тимчасова база даних (масив)

// Створення нового списку покупок
exports.createShoppingList = (req, res) => {
  const { name, description } = req.body;
  const newShoppingList = {
    id: `${Date.now()}`,
    name,
    description,
    ownerId: req.userId || 'default-user',
    members: [],
    items: []
  };
  shoppingLists.push(newShoppingList);
  res.status(201).json(newShoppingList);
};

// Додавання учасника до списку
exports.addMember = (req, res) => {
  const { shoppingListId, userId } = req.body;
  const list = shoppingLists.find(list => list.id === shoppingListId);

  if (!list) return res.status(404).json({ error: 'Shopping list not found' });
  if (list.ownerId !== req.userId) return res.status(403).json({ error: 'Access denied' });

  if (!list.members.includes(userId)) {
    list.members.push(userId);
  }
  res.status(200).json(list);
};

// Додавання елемента до списку
exports.addItem = (req, res) => {
  const { shoppingListId, item } = req.body;
  const list = shoppingLists.find(list => list.id === shoppingListId);

  if (!list) return res.status(404).json({ error: 'Shopping list not found' });
  if (list.ownerId !== req.userId && !list.members.includes(req.userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const newItem = { id: `${Date.now()}`, ...item, completed: false };
  list.items.push(newItem);
  res.status(201).json(newItem);
};

// Позначення елемента як завершеного
exports.markItem = (req, res) => {
  const { shoppingListId, itemId, completed } = req.body;
  const list = shoppingLists.find(list => list.id === shoppingListId);

  if (!list) return res.status(404).json({ error: 'Shopping list not found' });
  if (list.ownerId !== req.userId && !list.members.includes(req.userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const item = list.items.find(item => item.id === itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  item.completed = completed;
  res.status(200).json(item);
};

// Видалення списку
exports.deleteShoppingList = (req, res) => {
  const { shoppingListId } = req.body;
  const listIndex = shoppingLists.findIndex(list => list.id === shoppingListId);

  if (listIndex === -1) return res.status(404).json({ error: 'Shopping list not found' });
  if (shoppingLists[listIndex].ownerId !== req.userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  shoppingLists.splice(listIndex, 1);
  res.status(200).json({ message: 'Shopping list deleted successfully' });
};
