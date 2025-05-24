import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/menu.css";

const PageNotFound = () => {
  return (
    <>
      <Header className="menu__header" />
      <div className="page__unfound">
        <h1 className="page__unfound_title">Page not found</h1>
        <p className="page__unfound_text">
          Please, visit
          <Link
            className="page__unfound_link"
            to="/pizza-app-redux-toolkit-rtk-query/">
            <span> Login&nbsp;</span>
          </Link>
          page
        </p>
      </div>
    </>
  );
};

export default PageNotFound;
