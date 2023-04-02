import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { UpdatePassForm } from "../../types/update-pass-form";
import adminApp from "../../helpers/firebaseAdmin";

const auth = getAuth(adminApp);

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData: UpdatePassForm = req.body;

    try {
      if (userData.uid) {
        const userRecord = await auth.updateUser(userData.uid, {
          password: userData.password,
        });

        console.log(
          "Password has been successfully updated",
          userRecord.toJSON()
        );

        res.status(200).json({ message: "Password changed successfully." });
      } else {
        res.status(400).json({ error: "User ID is required." });
      }
    } catch (error) {
      console.log("Error updating password:", error);

      res
        .status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
