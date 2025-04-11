// import { Schema } from "zod";

const validate = (schema) => async (req, res, next) => {
  try {
      console.log("5",req.body);
     req.body = await schema.parseAsync(req.body);
     
    // req.body = parseBody;
    next();
  } catch (err) {
    const message = err.errors;
    const msg = message.map((e) => {
      const message1 = e.message;
      return message1;
    });
    console.log("14", msg);
    res.status(400).json({
      success: false,
      message: msg,
    });
  }
};


export const validateZodRequest = ({
  body = null,
  params = null,
} = {}) => (req, res, next) => {
  if (body) {
    const result = body.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed (body)",
        errors: result.error.errors.map(e => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    req.body = result.data;
  }

  if (params) {
    const result = params.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed (params)",
        errors: result.error.errors.map(e => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    req.params = result.data;
  }

  next();
};


export default validate;
