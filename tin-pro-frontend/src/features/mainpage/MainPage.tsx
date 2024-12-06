import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

import "../../assets/styles/style.css";

export default function MainPage() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <div className="container">
                <h1></h1>

            </div>
            <Footer />
        </>
    )
}