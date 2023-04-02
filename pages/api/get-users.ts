import { getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
import adminApp from "../../helpers/firebaseAdmin";

const auth = getAuth(adminApp);

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const listUsersResult = await auth.listUsers(100);
    const users = listUsersResult.users.map((userRecord) =>
      userRecord.toJSON()
    );
    res.status(200).json({ users }); // send a response with the users property
  } catch (error) {
    console.log("Error listing users:", error);
    res.status(500).json({ error: "Error listing users" }); // send an error response
  }
};

export default getUsers;
