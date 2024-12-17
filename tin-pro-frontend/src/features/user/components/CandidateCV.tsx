import { useState } from "react";
import { message, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useTranslation } from "react-i18next";
import { api } from "../../../app/api/ApiConfig";
import { FaFileAlt, FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface CandidateCVProps {
    cvName: string;
    cv: Blob | null;
}

export default function CandidateCV({ cvName, cv: initialCv }: CandidateCVProps) {
    const { t } = useTranslation();
    const [cv, setCv] = useState<Blob | null>(initialCv);
    const [cvFileName, setCvFileName] = useState<string>(cvName);

    const MAX_FILE_SIZE_MB = 5;

    const props: UploadProps = {
        name: "file",
        multiple: false,
        accept: ".pdf",

        async customRequest({ file, onSuccess, onError }) {
            try {

                const uploadFile = file as File;

                if (uploadFile.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
                    message.error(`${uploadFile.name} is larger than 5 MB.`);
                    return;
                }

                const formData = new FormData();
                formData.append("file", uploadFile);

                const response = await api.candidate.uploadCV(formData);
                if (response.status === 200) {
                    message.success(`${uploadFile.name} uploaded successfully.`);
                    setCv(uploadFile);
                    setCvFileName(uploadFile.name);
                    onSuccess?.(response.data, file);
                }
            } catch (error) {
                message.error("File upload failed.");
                console.error("Upload error:", error);
                onError?.(error as Error);
            }
        },

        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };


    const handleCVDelete = async () => {
        try {
            const response = await api.candidate.deleteCV();
            if (response.status === 200) {
                message.success("CV deleted successfully.");
                setCv(null);
                setCvFileName("");
            }
        } catch (error) {
            message.error("CV deletion failed.");
            // console.error("CV deletion error:", error);
        }
    };

    return (
        <div className="candidate_cv">
            <span className="candidate_cv_title">{t("account.cv")}</span>

            {cv ? (
                <div className="candidate_cv_card">
                    <span>{cvFileName}</span>
                    <RiDeleteBin6Fill onClick={handleCVDelete} className="cv_delete_button" />


                    <a className="action_button cv_download_button"
                        href={URL.createObjectURL(cv)}
                        download={cvFileName}
                    >
                        {t("buttons.download")}
                    </a>
                </div>
            ) : (
                <Dragger {...props}>
                    <FaFileAlt className="cv_upload_icon" />

                    <p className="cv_upload_text">{t("account.draggerText")}</p>
                    <p className="cv_upload_hint">{t("account.draggerHint")}</p>
                </Dragger>
            )}
        </div>
    );
}
