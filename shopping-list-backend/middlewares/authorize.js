exports.authorize = (req, res, next) => {
  // Імітація авторизації через заголовок Authorization
  const userToken = req.headers['authorization'];

  if (!userToken) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  // У реальному додатку тут перевіряється токен
  if (userToken === 'valid-token') {
    req.userId = 'default-user'; // Імітація ідентифікації користувача
    next();
  } else {
    return res.status(403).json({ error: 'Forbidden access' });
  }
};
