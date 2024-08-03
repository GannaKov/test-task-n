import { redirect } from "react-router-dom";
import { deleteContact } from "../services/requests";

export async function action({ params }) {
  console.log("delete action", params.contactId);
  await deleteContact(params.contactId);

  return redirect("/");
}
