interface FieldProps {
    label: string;
    value: string | number;
    isEditable: boolean;
    onChange?: (value: string) => void;
}

export const Field = ({ label, value, isEditable, onChange }: FieldProps) => {
    return (
        <div className="account_field">
            <label>{label}</label>
            {isEditable ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            ) : (
                <p>{value}</p>
            )}
        </div>
    );
};
