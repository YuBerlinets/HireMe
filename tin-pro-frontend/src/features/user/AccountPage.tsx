import { useState, useEffect } from "react";
import CandidateAccount from "./components/CandidateAccount";
import RecruiterAccount from "./components/RecruiterAccount";
import { api } from "../../app/api/ApiConfig";
import { Candidate, Recruiter, UserData } from "./models/UserModels";

export default function AccountPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchUserData = async (): Promise<UserData> => {
            const response = await api.user.getUserInfo();
            if (response.status === 200) {
                const data = response.data;
                if (data.role === "CANDIDATE") {
                    return {
                        ...data,
                        cv: data.cv ? new Blob([data.cv], { type: "application/pdf" }) : null,
                    } as Candidate;
                }
                return data as Recruiter;
            }
            throw new Error("Failed to fetch user data");
        };

        const loadUserData = async () => {
            try {
                const data = await fetchUserData();
                // console.log(data);
                setUserData(data);
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    if (loading) return <div >Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <h1>Account</h1>
            {userData?.role === "CANDIDATE" ? (
                <CandidateAccount data={userData as Candidate} />
            ) : (
                <RecruiterAccount data={userData as Recruiter} />
            )}
        </div>
    );
}
