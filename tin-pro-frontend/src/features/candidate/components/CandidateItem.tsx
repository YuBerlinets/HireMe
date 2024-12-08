import { useTranslation } from "react-i18next";

interface CandidateItemProps {
    firstName: string
    lastName: string
    yearsOfExperience: number
    desiredPosition: string
    desiredSalary: string
    onClick?: () => void
}

export default function CandidateItem(props: CandidateItemProps) {
    const { t } = useTranslation();
    return (
        <div className="candidate_card" onClick={props.onClick}>
            <div className="candidate_card_image">
                <img src="https://via.placeholder.com/60" alt="candidate" />
            </div>
            <div className="candidate_card_info">
                <h3>{props.firstName} {props.lastName}</h3>
                <p>{t('candidate.list.position', { position: props.desiredPosition })}</p>
                <p>{t('candidate.list.years', { years: props.yearsOfExperience })}</p>
                <p>{t('candidate.list.salary', { salary: props.desiredSalary })}</p>
            </div>
        </div>
    )
}