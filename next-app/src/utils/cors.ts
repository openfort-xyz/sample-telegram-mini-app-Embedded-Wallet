import { NextRequest } from "next/server";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"],
  origin: "*",
  credentials: true,
});

// Modified runMiddleware to work with Next.js routing handler
function runMiddleware(req: NextRequest, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(
      req,
      {
        end: () => resolve(null),
        setHeader: () => {}, // Dummy function as new routing doesn't directly work with response like this
      },
      (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      }
    );
  });
}

export { cors, runMiddleware };