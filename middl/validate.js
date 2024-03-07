const yup = require("yup");
const validate = async (req, res, next) => {
  try {
    const Schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.email().required(),
      cin: yup.number().required(),
    });
    await Schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
module.exports = validate;
