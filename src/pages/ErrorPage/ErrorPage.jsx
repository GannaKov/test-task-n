import { useRouteError } from "react-router-dom";
import GoBack from "../../components/Shared/GoBack/GoBack";
import style from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="pageWrapper">
      <div className="section">
        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <GoBack state="/" />
          </div>
          <h1 className={style.text}>Oops!</h1>
          <p className={style.text}>Sorry, an unexpected error has occurred!</p>
          <p className={style.text}>
            <i>{error.statusText || error.message}</i>
          </p>
          {error.status && <p>Error Code: {error.status}</p>}
        </div>
      </div>
    </div>
  );
}
