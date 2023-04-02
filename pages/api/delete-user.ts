import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import adminApp from "../../helpers/firebaseAdmin";

const auth = getAuth(adminApp);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const selectedUser = req.body;

    try {
      await auth.deleteUser(selectedUser.id);

      console.log("Successfully deleted user");

      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.log("Error deleting user:", error);

      res.status(500).json({ error: "An error occurred while deleting user." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
