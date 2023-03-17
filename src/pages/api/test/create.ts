import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "lib/mongoose";
import Test from "lib/model/test.model";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { method } = req;
  const userAgent = req.headers["user-agent"];
  console.log(userAgent);
  await clientPromise;
  await Test.init();

  switch (method) {
    case "POST":
      try {
        const create = await Test.create(req.body);
        if (req.body.confPassword !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        res.status(200).json({
          message: "success",
          data: create,
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({
          message: err.message,
        });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({
        message: `Method ${method} Not Allowed`,
      });
  }
}
