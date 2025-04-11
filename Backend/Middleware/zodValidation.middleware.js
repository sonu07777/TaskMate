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

export default validate;
