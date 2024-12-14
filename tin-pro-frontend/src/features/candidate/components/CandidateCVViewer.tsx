import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface CandidateCVViewerProps {
    open: boolean;
    onClose: () => void;
    cvName: string;
    cv: Blob | null;
}

export default function CandidateCVViewer({
    open,
    onClose,
    cvName,
    cv,
}: CandidateCVViewerProps) {
    const [cvUrl, setCvUrl] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const { t } = useTranslation();

    useEffect(() => {
        if (cv) {
            const url = URL.createObjectURL(cv);
            setCvUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setCvUrl(null);
        }
    }, [cv]);

    const onLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
    };

    const goToNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const goToPrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <Modal
            title={t("candidate.cvViewer")}
            open={open}
            onCancel={onClose}
            width={800}
            footer={null}
        >
            {cvUrl ? (
                <div>
                    {numPages > 0 && <div className="cv_viewer_pagination">
                        <button className={`action_button ${pageNumber === 1 ? "disabled_button" : ""}`} onClick={goToPrevPage} disabled={pageNumber === 1}>
                            {t("candidate.previous")}
                        </button>
                        <span>
                            {t("candidate.pages", { pageNumber: pageNumber, numPages: numPages })}
                        </span>
                        <button className={`action_button ${pageNumber === numPages ? "disabled_button" : ""}`} onClick={goToNextPage} disabled={pageNumber === numPages}>
                            {t("candidate.next")}
                        </button>
                    </div>
                    }
                    <Document
                        file={cvUrl}
                        onLoadSuccess={onLoadSuccess}
                        onLoadError={(error) => console.error(error)}
                        className="cv_viewer_document"
                    >
                        <Page pageNumber={pageNumber} className="cv_viewer_page" width={750} />
                    </Document>

                </div>
            ) : (
                <p>{t("candidate.noCV")}</p>
            )}
        </Modal>
    );
}
