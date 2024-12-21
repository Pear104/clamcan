import { z } from "zod";
import errMsg from "app/locales/errMsg.json";

const schema = z.object({
  email: z.string().email({ message: errMsg.emailInvalid }),
  // password: z.string().min(1, { message: errMsg.passMin8Char }),
  password: z.string().min(8, { message: errMsg.passMin8Char }),
});
export default schema;
