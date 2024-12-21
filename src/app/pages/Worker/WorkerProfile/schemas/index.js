import { z } from "zod";
import errMsg from "app/locales/errMsg.json";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  name: z
    .string()
    .min(1, { message: errMsg.required })
    .max(255, { message: errMsg.invalidNumber }),
  phone: z
    .string()
    .min(10, { message: errMsg.invalidNumber })
    .regex(phoneRegex, { message: errMsg.invalidNumber }),
});

export default schema;
