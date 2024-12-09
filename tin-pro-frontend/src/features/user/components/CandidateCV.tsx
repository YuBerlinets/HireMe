import { useState } from "react";
import { message, Upload, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useTranslation } from "react-i18next";
import { api } from "../../../app/api/ApiConfig";
import { FaFileAlt, FaTrashAlt } from "react-icons/fa";

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
        accept: ".pdf,.doc,.docx",

        async customRequest({ file, onSuccess, onError }) {
            try {
                const uploadFile = file as any;
                const originFileObj = uploadFile.originFileObj as File;

                if (!originFileObj) {
                    message.error("Invalid file.");
                    return;
                }

                if (originFileObj.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
                    message.error(`${originFileObj.name} is larger than 5 MB.`);
                    return;
                }

                const formData = new FormData();
                formData.append("file", originFileObj);

                const response = await api.candidate.uploadCV(formData);
                if (response.status === 200) {
                    message.success(`${originFileObj.name} uploaded successfully.`);
                    setCv(originFileObj);
                    setCvFileName(originFileObj.name);
                    onSuccess?.(response.data, file);
                }
            } catch (error) {
                message.error("File upload failed.");
                console.error("Upload error:", error);
                onError?.(error as Error);
            }
        },

        onDrop(e) {
            const file = e.dataTransfer.files[0];
            if (file) {
                const request: any = { file, onSuccess: () => { }, onError: () => { } };
                props.customRequest?.(request);
            }
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
            console.error("CV deletion error:", error);
        }
    }

    return (
        <div className="candidate_cv">
            <span className="candidate_cv_title">{t("account.cv")}</span>

            {cv ? (
                <div className="candidate_cv_card">
                    <span>{cvFileName}</span>
                    <FaTrashAlt onClick={handleCVDelete} className="cv_delete_button" />

                    <a className="action_button cv_download_button" href={URL.createObjectURL(cv)} download>
                        {t("account.download")}
                    </a>
                </div>
            ) : (
                <Dragger {...props}>
                    <FaFileAlt className="cv_upload_icon"/>

                    <p className="cv_upload_text">{t("account.draggerText")}</p>
                    <p className="cv_upload_hint">
                        {t("account.draggerHint")}
                    </p>
                </Dragger>
            )}
        </div>
    );
}
