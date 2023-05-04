export const isAdministratorRicardo = (req, res, next) => {
  if (req.user.role === 'admin' || req.params?.id === req.user.id.toString()) {
    next();
  } else {
    res.json({ success: false, message: 'Unauthorized access' });
  }
};
