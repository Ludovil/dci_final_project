import rateLimit from 'express-rate-limit'; // npm install express-rate-limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  onLimitReached: (req, res, options) => {
    res.status(429).json({
      message: 'Too many requests, please try again later',
    });
  },
});
