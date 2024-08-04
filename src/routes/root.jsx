import { useLoaderData, useNavigation } from "react-router-dom";

import ContactsList from "../components/ContactsList/ContactsList";
import CreateForm from "../components/CreateForm/CreateForm";
import CircularProgress from "@mui/material/CircularProgress";

export default function Root() {
  const navigation = useNavigation();

  const { contacts } = useLoaderData();

  return (
    <div className="pageWrapper stickyPage">
      {/* <div className={styles.rootWrp}> */}
      <div className="section sticky">
        <CreateForm />
      </div>

      <div className="section">
        {navigation.state === "loading" ? (
          <div>
            <CircularProgress />
          </div>
        ) : null}
        <ContactsList contacts={contacts} />
        {/* </div> */}
      </div>
    </div>
  );
}
