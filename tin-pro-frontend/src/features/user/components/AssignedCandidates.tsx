import { List, Skeleton, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import { AssignedCandidate } from "../RecruiterAccount";
import { useNavigate } from "react-router-dom";
import { api } from "../../../app/api/ApiConfig";

interface AssignedCandidatesProps {
    assignedCandidates: AssignedCandidate[];
}

export default function AssignedCandidates({ assignedCandidates }: AssignedCandidatesProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleUnassignCandidate = async (jobCandidateId: number) => {
        try {
            await api.recruiter.unassignCandidateFromJob(jobCandidateId);
            assignedCandidates = assignedCandidates.filter((candidate) => candidate.jobCandidateId !== jobCandidateId);
        } catch (error) {
            console.error("Error unassigning candidate", error);
        }
    };

    return (
        <div className="assigned_candidates">
            <h2 className="block_title">{t("account.assignedCandidates")}</h2>
            <List
                className="assigned_candidates_list"
                itemLayout="horizontal"
                dataSource={assignedCandidates}
                renderItem={(candidate) => (
                    <List.Item
                        actions={[
                            <a key="viewCandidateJob" onClick={() => navigate(`/jobs/${candidate.jobId}`)}>
                                {t("account.assignedCandidate.viewJob")}
                            </a>,
                            <a key="viewCandidate" onClick={() => navigate(`/candidates/${candidate.candidateId}`)}>
                                {t("account.assignedCandidate.viewCandidate")}
                            </a>,
                            <a key="unassign" onClick={() => handleUnassignCandidate(candidate.jobCandidateId)}>
                                {t("account.assignedCandidate.unassign")}
                            </a>,
                        ]}
                        className="assigned_candidates_item"
                    >
                        <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar style={{ backgroundColor: "#87d068" }}>
                                        {candidate.candidateName.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                title={candidate.candidateName}
                                description={`${candidate.jobTitle}`}
                            />
                            <div>{candidate.status}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
}
