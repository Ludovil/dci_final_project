export const isAdministrator = (req, res, next) => {
  if (
    req.user.role === 'admin' ||
    req.params?.id === req.user._id.toString() ||
    req.user.apartment_images.include(req.params.id)
  ) {
    next();
  } else {
    res.json({ success: false, message: 'Unauthorized access' });
  }
};
