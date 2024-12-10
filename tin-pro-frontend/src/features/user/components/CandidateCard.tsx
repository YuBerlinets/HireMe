
export default function CandidateCard({ data }: any) {
    return (
        <div className="user_acc_card">
            <img src="https://via.placeholder.com/170" alt="account_icon" className="account_icon" />
            <span className="user_acc_card_name">{data.firstName} {data.lastName}</span>
            {data.desiredSalary && <span>{data.desiredSalary}$</span>}
            {data.email && <span>{data.email}</span>}
            {data.desiredPositin && <span>{data.desiredPosition}</span>}
            <span>{data.yearsOfExperience} years of experience</span>
        </div>
    )
};
