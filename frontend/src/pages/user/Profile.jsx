import { useUpdateUserAIAttributesMutation, useUpdateUserProfileMutation } from '@/api/users';
import { Loading } from '@/components/Layout/Loading';
import { AccountSettingsCard } from '@/components/users_pages/profile/AccountSettingsCard';
import { BasicInfoCard } from '@/components/users_pages/profile/BasicInfoCard';
import { MeasurementsCard } from '@/components/users_pages/profile/MeasurementsCard';
import { StylePreferencesCard } from '@/components/users_pages/profile/StylePreferencesCard';
import { UserProfileCard } from '@/components/users_pages/profile/UserProfileCard';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';



export default function ProfilePage() {
    const { user } = useAuth();
    const updateUser = useUpdateUserProfileMutation().mutateAsync;
    const updateAIAttributes = useUpdateUserAIAttributesMutation().mutateAsync;
    const [initialLoading, setInitialLoading] = useState(true);
    const [editMode, setEditMode] = useState(null);
    const [loading, setLoading] = useState(false);

    // 

    // -------------------- USER DATA --------------------
    const [userData, setUserData] = useState({
        id: user?._id || '',                  // leave blank if not set
        name: user?.name || '',               // no default name
        email: user?.email || '',             // no default email
        gender: user?.gender || '',           // empty until user selects
        preferredTargetGroup: user?.preferredTargetGroup || '', // empty until user selects
        skinTone: user?.skinTone || '',       // empty
        bodyType: user?.bodyType || '',       // empty
        heightCm: user?.heightCm || null,     // use null instead of 180
        weightKg: user?.weightKg || null,     // use null instead of 75
        role: user?.role || 'USER',           // role default is fine
        createdAt: user?.createdAt || '',     // blank if not set
        updatedAt: user?.updatedAt || '',     // blank if not set
    });

    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        gender: userData.gender || '',
        preferredTargetGroup: userData.preferredTargetGroup || '',
        skinTone: userData.skinTone || '',
        bodyType: userData.bodyType || '',
        heightCm: userData.heightCm?.toString() || '',
        weightKg: userData.weightKg?.toString() || '',
    });

    // Sync formData when userData changes
    useEffect(() => {
        setFormData({
            name: userData.name,
            email: userData.email,
            gender: userData.gender || '',
            preferredTargetGroup: userData.preferredTargetGroup || '',
            skinTone: userData.skinTone || '',
            bodyType: userData.bodyType || '',
            heightCm: userData.heightCm?.toString() || '',
            weightKg: userData.weightKg?.toString() || '',
        });
    }, [userData]);

    // -------------------- HELPERS --------------------
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // -------------------- SAVE PROFILE --------------------
    const handleSaveProfile = async () => {
        setLoading(true);

        if (!formData.name.trim()) {
            toast.error("Name cannot be empty");
            setLoading(false);
            return;
        }
        if (formData.name.trim().length < 2) {
            toast.error("Name must be at least 2 characters");
            setLoading(false);
            return;
        }
        if (!validateEmail(formData.email)) {
            toast.error("Invalid email format");
            setLoading(false);
            return;
        }

        try {
            const updatedUser = await updateUser({ name: formData.name, email: formData.email });
            setUserData(prev => ({ ...prev, ...updatedUser, updatedAt: new Date().toISOString().split('T')[0] }));
            setEditMode(null);
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    // -------------------- SAVE STYLE --------------------
    const handleSaveStyle = async () => {
        setLoading(true);

        if (!formData.gender || !formData.preferredTargetGroup || !formData.skinTone || !formData.bodyType) {
            toast.error("Please fill in all style preferences");
            setLoading(false);
            return;
        }

        try {
            const updatedUser = await updateAIAttributes({
                gender: formData.gender,
                preferredTargetGroup: formData.preferredTargetGroup,
                skinTone: formData.skinTone,
                bodyType: formData.bodyType,
            });

            setUserData(prev => ({ ...prev, ...updatedUser, updatedAt: new Date().toISOString().split('T')[0] }));
            setEditMode(null);
            toast.success("Style preferences updated!");
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Failed to update style");
        } finally {
            setLoading(false);
        }
    };

    // -------------------- SAVE MEASUREMENTS --------------------
    const handleSaveMeasurements = async () => {
        setLoading(true);

        const heightNum = parseInt(formData.heightCm);
        const weightNum = parseInt(formData.weightKg);

        if (!heightNum || !weightNum) {
            toast.error("Please fill in all measurements");
            setLoading(false);
            return;
        }
        if (heightNum < 100 || heightNum > 250) {
            toast.error("Height must be between 100-250 cm");
            setLoading(false);
            return;
        }
        if (weightNum < 30 || weightNum > 300) {
            toast.error("Weight must be between 30-300 kg");
            setLoading(false);
            return;
        }

        try {
            const updatedUser = await updateAIAttributes({ heightCm: heightNum, weightKg: weightNum });
            setUserData(prev => ({ ...prev, ...updatedUser, updatedAt: new Date().toISOString().split('T')[0] }));
            setEditMode(null);
            toast.success("Measurements updated!");
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Failed to update measurements");
        } finally {
            setLoading(false);
        }
    };

    // -------------------- RESET FORM --------------------
    const resetForm = () => {
        setFormData({
            name: userData.name,
            email: userData.email,
            gender: userData.gender || '',
            preferredTargetGroup: userData.preferredTargetGroup || '',
            skinTone: userData.skinTone || '',
            bodyType: userData.bodyType || '',
            heightCm: userData.heightCm?.toString() || '',
            weightKg: userData.weightKg?.toString() || '',
        });
        setEditMode(null);
    };
    useEffect(() => {
        if (user) {
            setUserData(prev => ({
                ...prev,
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender || '',
                preferredTargetGroup: user.preferredTargetGroup || '',
                skinTone: user.skinTone || '',
                bodyType: user.bodyType || '',
                heightCm: user.heightCm || null,
                weightKg: user.weightKg || null,
                role: user.role || 'USER',
                createdAt: user.createdAt || '',
                updatedAt: user.updatedAt || '',
            }));
            setInitialLoading(false);
        }
    }, [user]);

    if (initialLoading) {
        return <Loading text="Loading profile..." size="lg" />;
    }

    return (
        <div className="min-h-screen bg-background">

            {/* Main Content */}
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-semibold text-foreground">My Profile</h1>
                    <p className="mt-2 text-muted-foreground text-lg">
                        Manage your personal information and style preferences
                    </p>
                </div>

                {/* Profile Overview Card */}
                <UserProfileCard userData={userData} />

                {/* Sections Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <BasicInfoCard
                        userData={userData}
                        formData={formData}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSaveProfile={handleSaveProfile}
                        resetForm={resetForm}
                        loading={loading}
                    />

                    {/* Style Preferences */}
                    <StylePreferencesCard
                        userData={userData}
                        formData={formData}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSaveStyle={handleSaveStyle}
                        resetForm={resetForm}
                        loading={loading}
                    />

                    {/* Measurements */}
                    <MeasurementsCard
                        userData={userData}
                        formData={formData}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSaveMeasurements={handleSaveMeasurements}
                        resetForm={resetForm}
                        loading={loading}
                    />
                    {/* Account Settings */}
                    <AccountSettingsCard
                        userData={{
                            createdAt: userData.createdAt,
                            updatedAt: userData.updatedAt,
                            status: userData.status, // can be "Active", "Inactive", etc.
                        }}
                        onDeleteAccount={() => console.log("account deleted")}
                    />
                </div>
            </main>


        </div>
    );
}
