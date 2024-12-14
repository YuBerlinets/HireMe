import { useState, useEffect } from "react";
import CandidateAccount from "./CandidateAccount";
import RecruiterAccount from "./RecruiterAccount";
import { api } from "../../app/api/ApiConfig";
import { Candidate, Recruiter, UserData } from "./models/UserModels";
import { useTranslation } from "react-i18next";
import { base64ToArrayBuffer } from "../candidate/helpers/CVFormatter";
import { Skeleton, Card } from "antd";

export default function AccountPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserData = async (): Promise<UserData> => {
            const response = await api.user.getUserInfo();
            if (response.status === 200) {
                const data = response.data;
                if (data.role === "CANDIDATE") {
                    return {
                        ...data,
                        cv: data.cv ? new Blob([base64ToArrayBuffer(data.cv)], { type: "application/pdf" }) : null,
                    } as Candidate;
                }
                return data as Recruiter;
            }
            throw new Error("Failed to fetch user data");
        };

        const loadUserData = async () => {
            try {
                const data = await fetchUserData();
                setUserData(data);
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <h1 className="account_main_title">
                    Account
                </h1>
                <Card style={{ maxWidth: 1400, margin: "20px auto" }}>
                    <Skeleton
                        active
                        avatar
                        paragraph={{
                            rows: 4,
                        }}
                    />
                </Card>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="account_main_title">
                Account • {userData?.role === "CANDIDATE" ? t('account.candidate') : t('account.recruiter')}
            </h1>
            {userData?.role === "CANDIDATE" ? (
                <CandidateAccount data={userData as Candidate} />
            ) : (
                <RecruiterAccount data={userData as Recruiter} />
            )}
        </div>
    );
}
