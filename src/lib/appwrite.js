import { Client, Account, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);

export async function fetchBrandInfo(brandName) {
  const execution = await functions.createExecution(
    "getBrandDescriptionAndProducts", // function ID from Appwrite
    JSON.stringify({ brandName })
  );

  // Appwrite stores function result in execution.response
  return JSON.parse(execution.response);
}

export { client, account, databases, functions };
