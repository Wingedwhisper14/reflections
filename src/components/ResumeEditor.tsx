import { useState, useEffect } from 'react';
import { storage } from '../data/storage';
import type { ResumeData, ResumeExperience } from '../types/resume';
import { Save, Plus, Trash2 } from 'lucide-react';

export function ResumeEditor() {
    const [data, setData] = useState<ResumeData | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {
        try {
            const resumeData = await storage.getResume();
            setData(resumeData);
        } catch (error) {
            console.error('Failed to load resume:', error);
        }
    };

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        try {
            await storage.saveResume(data);
            setTimeout(() => setSaving(false), 1000);
        } catch (error) {
            console.error('Failed to save resume:', error);
            alert('Failed to save resume');
            setSaving(false);
        }
    };


    if (!data) return <div>Loading...</div>;

    const updateProfile = (field: string, value: string) => {
        setData({ ...data, profile: { ...data.profile, [field]: value } });
    };

    const addExperience = () => {
        const newExp: ResumeExperience = {
            id: Date.now().toString(),
            company: 'New Company',
            position: 'Position',
            location: 'Location',
            startDate: '',
            endDate: '',
            description: ['']
        };
        setData({ ...data, experience: [...data.experience, newExp] });
    };

    const updateExperience = (index: number, field: keyof ResumeExperience, value: any) => {
        const newExp = [...data.experience];
        newExp[index] = { ...newExp[index], [field]: value };
        setData({ ...data, experience: newExp });
    };

    const removeExperience = (index: number) => {
        const newExp = data.experience.filter((_, i) => i !== index);
        setData({ ...data, experience: newExp });
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold">Edit Resume</h2>
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Profile Section */}
            <section className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <h3 className="text-lg font-semibold">Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Name"
                        value={data.profile.name}
                        onChange={e => updateProfile('name', e.target.value)}
                    />
                    <input
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Title"
                        value={data.profile.title}
                        onChange={e => updateProfile('title', e.target.value)}
                    />
                    <input
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Email"
                        value={data.profile.email}
                        onChange={e => updateProfile('email', e.target.value)}
                    />
                    <input
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Location"
                        value={data.profile.location}
                        onChange={e => updateProfile('location', e.target.value)}
                    />
                    <textarea
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 md:col-span-2"
                        placeholder="Summary"
                        rows={3}
                        value={data.profile.summary}
                        onChange={e => updateProfile('summary', e.target.value)}
                    />
                </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Experience</h3>
                    <button onClick={addExperience} className="text-sm flex items-center gap-1 text-blue-600">
                        <Plus className="w-4 h-4" /> Add Job
                    </button>
                </div>

                {data.experience.map((exp, index) => (
                    <div key={exp.id} className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl relative group">
                        <button
                            onClick={() => removeExperience(index)}
                            className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                                placeholder="Company"
                                value={exp.company}
                                onChange={e => updateExperience(index, 'company', e.target.value)}
                            />
                            <input
                                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                                placeholder="Position"
                                value={exp.position}
                                onChange={e => updateExperience(index, 'position', e.target.value)}
                            />
                            <input
                                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                                placeholder="Start Date"
                                value={exp.startDate}
                                onChange={e => updateExperience(index, 'startDate', e.target.value)}
                            />
                            <input
                                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                                placeholder="End Date"
                                value={exp.endDate}
                                onChange={e => updateExperience(index, 'endDate', e.target.value)}
                            />
                        </div>
                        <textarea
                            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                            placeholder="Description (one bullet per line)"
                            rows={4}
                            value={exp.description.join('\n')}
                            onChange={e => updateExperience(index, 'description', e.target.value.split('\n'))}
                        />
                    </div>
                ))}
            </section>
        </div>
    );
}
