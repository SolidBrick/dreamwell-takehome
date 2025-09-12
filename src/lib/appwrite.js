import { Client, Account, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);

export async function fetchBrandInfo(brandNameStr) {
  const execution = await functions.createExecution(
    "68c37cd40009ba4b4efa", // function ID from Appwrite
    JSON.stringify({ brandName: brandNameStr })
  );
  console.log("Execution response:", execution);

  // Appwrite stores function result in execution.response
  return JSON.parse(execution.response);
}

export { client, account, databases, functions };
