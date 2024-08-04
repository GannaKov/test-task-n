import { useRouteError } from "react-router-dom";
import GoBack from "../../components/Shared/GoBack/GoBack";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div style={{ marginBottom: "2rem" }}>
        <GoBack state="/" />
      </div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
