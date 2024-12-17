import React, { useState } from "react";
import { Input, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { Candidate } from "../models/UserModels";


interface SkillsProps {
    skills: string;
    handleInputChange: (field: keyof Candidate, value: string | number) => void;
}

const SkillsSection: React.FC<SkillsProps> = ({ skills, handleInputChange }) => {
    const [skillInput, setSkillInput] = useState("");
    const [skillsList, setSkillsList] = useState<string[]>(skills ? skills.split(",").filter(Boolean) : []);
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const MAX_SKILLS_LIMIT = 20;

    const handleAddSkill = () => {
        if (skillsList.length >= MAX_SKILLS_LIMIT) {
            setError(t('account.skillsMessages.limit'));
            return;
        }
        setError('');
        if (skillInput.trim() && !skillsList.includes(skillInput.trim())) {
            const updatedSkills = [...skillsList, skillInput.trim()];
            setSkillsList(updatedSkills);
            handleInputChange("skills", updatedSkills.join(","));
            setSkillInput("");
        }
    };

    const handleDeleteSkill = (skillToRemove: string) => {
        const updatedSkills = skillsList.filter((skill) => skill !== skillToRemove);
        setSkillsList(updatedSkills);
        handleInputChange("skills", updatedSkills.join(","));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddSkill();
        }
    };

    return (
        <div className="skills_section">
            <span className="skills_section_text">{t('account.skills')}</span>
            <div className="skills_section_list">

                {skillsList.map((skill, index) => (
                    <Tag
                        key={index}
                        closable
                        onClose={() => handleDeleteSkill(skill)}
                        style={{ margin: "2px" }}
                        className="skill_bar"
                    >
                        {skill}
                    </Tag>
                ))}
            </div>
            {error && <p className="limit_error">{error}</p>}
            <div style={{ display: "flex", gap: "10px" }}>
                <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyUp={handleKeyPress}
                    placeholder="Add a skill"
                />
                <button
                    className={`action_button add_skill_button ${skillsList.length >= 20 ? "disabled_button" : ""}`}
                    onClick={handleAddSkill}
                    disabled={skillsList.length >= 20}>
                    {t('buttons.add')}
                </button>
            </div>
            <span className="skills_explanation">{t('account.skillsExplanation')}</span>
        </div>
    );
};

export default SkillsSection;
