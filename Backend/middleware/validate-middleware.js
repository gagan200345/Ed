const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ mess:"validation failed" });
  }
};

module.exports = validate;