import { useLoaderData } from "react-router-dom";

import ContactsList from "../components/ContactsList/ContactsList";
import CreateForm from "../components/CreateForm/CreateForm";

export default function Root() {
  const { contacts } = useLoaderData();

  return (
    <div className="pageWrapper stickyPage">
      {/* <div className={styles.rootWrp}> */}
      <div className="section sticky">
        <CreateForm />
      </div>

      <div className="section">
        <ContactsList contacts={contacts} />
        {/* </div> */}
      </div>
    </div>
  );
}
