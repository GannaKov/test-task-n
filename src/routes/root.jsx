import { useLoaderData} from "react-router-dom";

import ContactsList from "../components/ContactsList/ContactsList";
import CreateForm from "../components/CreateForm/CreateForm";



export default function Root() {
  const { contacts } = useLoaderData();

  return (
    <div className="pageWrapper">
      <div className="section">
        <CreateForm />
      </div>

      <div className="section">
        <ContactsList contacts={contacts} />
      </div>
    </div>
  );
}
