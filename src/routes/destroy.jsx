import { redirect } from "react-router-dom";
import { deleteContact } from "../services/requests";

export async function action({ params }) {
  await deleteContact(params.contactId);

  return redirect("/");
}
