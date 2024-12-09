import { Recruiter } from "../models/UserModels";
import { Field } from "./Field";

interface RecruiterAccountProps {
    data: Recruiter;
}

export default function RecruiterAccount({ data }: RecruiterAccountProps) {
    return (
        <div>
            <Field label="First Name" value={data.firstName} isEditable={false} />
            <Field label="Company" value={data.company} isEditable={true} />
            <Field label="Position" value={data.position} isEditable={true} />
        </div>
    );
}
