import { Input, Slider, message } from "antd";
import { Candidate } from "./models/UserModels";
import { useState } from "react";
import { api } from "../../app/api/ApiConfig";
import { useTranslation } from "react-i18next";
import CandidateCV from "./components/CandidateCV";
import CandidateCard from "./components/CandidateCard";
import SkillsSection from "./components/SkillsSection";

interface CandidateAccountProps {
    data: Candidate;
}

interface UpdateCandidateData {
    firstName: string;
    lastName: string;
    email: string;
    aboutMe: string;
    yearsOfExperience: number;
    desiredPosition: string;
    desiredSalary: string;
    skills: string;
}

export default function CandidateAccount({ data }: CandidateAccountProps) {
    const { t } = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();

    const [formData, setFormData] = useState<UpdateCandidateData>({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        aboutMe: data.aboutMe,
        yearsOfExperience: data.yearsOfExperience,
        desiredPosition: data.desiredPosition,
        desiredSalary: data.desiredSalary,
        skills: data.skills,
    });

    const handleInputChange = (field: keyof Candidate, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        console.log("Saving data", formData.skills);
        try {
            const response = await api.candidate.updateCandidateInfo(formData);

            if (response.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: t('account.success'),
                });
            }
        } catch (error) {
            // console.error("Error updating data", error);
            messageApi.open({
                type: 'error',
                content: t('account.error'),
            });
        }
    };

    const parseSalary = (value: string): number[] => {
        if (!value) return [0, 0];
        if (value.includes('-')) {
            const [min, max] = value.split('-');
            return [parseInt(min), parseInt(max)];
        }
        const min = parseInt(value);
        return [min, min];
    }

    const onSalaryRangeChange = ([min, max]: number[]) => {
        setFormData((prev) => ({
            ...prev,
            desiredSalary: `${min}-${max}`,
        }));
    };

    const onYearsOfExperienceChange = (value: number) => {
        setFormData((prev) => ({
            ...prev,
            yearsOfExperience: value,
        }));
    };

    return (
        <>
            {contextHolder}
            <div className="user_acc">
                <div className="account_fields">
                    <div className="personal_infromation">
                        <div className="account_field">
                            <span>{t('account.firstName')}</span>
                            <Input
                                value={formData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="account_field">
                            <span>{t('account.lastName')}</span>
                            <Input
                                value={formData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                placeholder="Last Name"
                            />
                        </div>

                        <div className="account_field">
                            <span>{t('account.position')}</span>
                            <Input
                                value={formData.desiredPosition}
                                onChange={(e) => handleInputChange("desiredPosition", e.target.value)}
                                placeholder="Desired Position"
                            />
                        </div>
                        <div className="account_field">
                            <span>{t('account.email')}</span>
                            <Input value={formData.email} disabled />
                        </div>


                    </div>

                    <div className="sliders_section">

                        <div className="account_field acc_slider">
                            <span>{t('account.years')}</span>
                            <Slider
                                min={0}
                                max={30}
                                step={0.5}
                                onChange={onYearsOfExperienceChange}
                                defaultValue={formData.yearsOfExperience}
                                tooltip={{ open: true, placement: "bottom" }}
                            />
                        </div>

                        <div className="account_field acc_slider">
                            <span>{t('account.salary')}</span>
                            <Slider
                                range
                                step={50}
                                min={100}
                                max={10000}
                                defaultValue={parseSalary(formData?.desiredSalary)}
                                tooltip={{ open: true, placement: "bottom" }}
                                onChange={onSalaryRangeChange}
                            />
                        </div>
                    </div>

                    <SkillsSection
                        skills={formData.skills}
                        handleInputChange={handleInputChange}
                    />

                    <div className="candidate_field">
                        <span>{t('account.about')}</span>
                        <Input.TextArea
                            value={formData.aboutMe}
                            showCount
                            maxLength={1000}
                            onChange={(e) => handleInputChange("aboutMe", e.target.value)}
                            placeholder="About Me"
                            style={{ height: 320, resize: 'none', padding: '5px', fontSize: '16px' }}
                        />
                    </div>

                    <button onClick={handleSave} className="action_button save_acc_button">
                        {t('buttons.save')}
                    </button>
                </div>
                <div className="candidate_acc_info">
                    <CandidateCard data={data} />
                    <CandidateCV cvName={data.cvName} cv={data.cv} />
                </div>
            </div>
        </>

    );
}
