import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { AddUserForm } from "../../types/add-user-form";
import adminApp from "../../helpers/firebaseAdmin";

const auth = getAuth(adminApp);

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData: AddUserForm = req.body;

    try {
      const userRecord = await auth.createUser(userData);

      console.log("Successfully created new user:", userRecord.uid);

      res.status(200).json({ message: "User created successfully." });
    } catch (error) {
      console.log("Error creating new user:", error);

      res.status(500).json({ error: error});
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
