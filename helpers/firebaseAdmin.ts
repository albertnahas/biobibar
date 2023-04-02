import { App, initializeApp, ServiceAccount } from "firebase-admin/app";
import { credential } from "firebase-admin";
import * as adminFirebaseConfig from "../biobibar-firebase-adminsdk.json";
import { DATABASE_URL } from "./constants";
import { getApps } from "firebase-admin/app";

const serviceAccount = adminFirebaseConfig;

let adminApp: App | undefined;

if (getApps().length < 1)
  adminApp = initializeApp(
    {
      credential: credential.cert(serviceAccount as ServiceAccount),
      databaseURL: DATABASE_URL,
    }
  );

export default adminApp;
