import { z } from "zod";
import errMsg from "app/locales/errMsg.json";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  name: z.string({ message: "Required" }).min(1, { message: "Required" }),
  dob: z.coerce.date(),
  description: z.string(),
  address: z.string({ message: "Required" }).min(1, { message: "Required" }),
  phone: z
    .string({ message: "Invalid phone number" })
    .min(10, { message: "Invalid phone number" })
    .regex(phoneRegex, { message: "Invalid phone number" }),
  school: z.string({ message: "Required" }).min(1, { message: "Required" }),
  major: z.string({ message: "Required" }).min(1, { message: "Required" }),
  degree: z.string({ message: "Required" }).min(1, { message: "Required" }),
});
export default schema;
