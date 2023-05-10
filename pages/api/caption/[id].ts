import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id }: any = req.query;
    const { caption } = req.body;

    await client.patch(id).set({ caption }).commit();

    res.status(201).end();
  }
}
