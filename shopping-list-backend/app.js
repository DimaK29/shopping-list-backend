const express = require('express');
const cors = require('cors');
const shoppingListRoutes = require('./routes/shoppingListRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/shopping-list', shoppingListRoutes);

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
