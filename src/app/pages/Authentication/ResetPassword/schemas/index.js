import { z } from "zod";
import errMsg from "app/locales/errMsg.json";

const schema = z.object({
  email: z.string().email({ message: errMsg.emailInvalid }),
});

export default schema;
