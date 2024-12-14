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

    const {t}= useTranslation();

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
            footer={[
                <button key="back" onClick={onClose}>
                    Close
                </button>,
            ]}
        >
            <p>{cvName}</p>
            {cvUrl ? (
                <div>
                    <Document
                        file={cvUrl}
                        onLoadSuccess={onLoadSuccess}
                        onLoadError={(error) => console.error(error)}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <div>
                        <button onClick={goToPrevPage} disabled={pageNumber === 1}>
                            Previous
                        </button>
                        <span>
                            Page {pageNumber} of {numPages}
                        </span>
                        <button onClick={goToNextPage} disabled={pageNumber === numPages}>
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p>No CV available</p>
            )}
        </Modal>
    );
}
