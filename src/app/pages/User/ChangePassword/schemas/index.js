import { z } from "zod";
import errMsg from "app/locales/errMsg.json";

const schema = z
  .object({
    password: z.string().min(8, { message: errMsg.passMin8Char }),
    confirmPassword: z.string().min(8, { message: errMsg.didNotMatch }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: errMsg.didNotMatch,
        path: ["confirmPassword"],
      });
    }
  });
export default schema;
