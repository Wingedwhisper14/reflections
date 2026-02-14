import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, List, FileText, Edit2 } from 'lucide-react';
import { sections } from '../data/mockData';
import { storage } from '../data/storage';
import { ResumeEditor } from '../components/ResumeEditor';
import type { Item, ItemType, SectionId } from '../types';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [activeTab, setActiveTab] = useState<'add' | 'list' | 'resume'>('list');
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [type, setType] = useState<ItemType>('link');
    const [sectionId, setSectionId] = useState<SectionId>(sections[0].id);
    const [content, setContent] = useState('');
    const [genre, setGenre] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            navigate('/admin');
        }
        loadItems();
    }, [navigate]);

    const loadItems = async () => {
        try {
            const data = await storage.getItems();
            setItems(data);
        } catch (error) {
            console.error('Failed to load items:', error);
            alert('Failed to load items. Check console.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            alert('Title and Content are required');
            return;
        }

        setIsLoading(true);
        try {
            const itemData = {
                section_id: sectionId,
                type,
                title,
                caption,
                content,
                genre: newGenre || genre || undefined,
                image: coverImage || undefined,
            };

            if (editingId) {
                await storage.updateItem(editingId, itemData);
                alert('Item updated successfully!');
            } else {
                await storage.addItem(itemData as any);
                alert('Item added successfully!');
            }

            await loadItems();
            resetForm();
            setActiveTab('list');
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to save item');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (item: Item) => {
        setEditingId(item.id);
        setTitle(item.title);
        setCaption(item.caption || '');
        setType(item.type);
        setSectionId(item.section_id);
        setContent(item.content);
        setGenre(item.genre || '');
        setNewGenre('');
        setCoverImage(item.image || '');
        setActiveTab('add');
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await storage.deleteItem(id);
                await loadItems();
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete item');
            }
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'content' | 'coverInfo') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const publicUrl = await storage.uploadImage(file);
            if (target === 'content') {
                setContent(publicUrl);
                setType('photo');
            } else {
                setCoverImage(publicUrl);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setCaption('');
        setContent('');
        setGenre('');
        setNewGenre('');
        setType('link');
        setCoverImage('');
    };

    // Get unique genres for the selected section
    const existingGenres = Array.from(new Set(
        items
            .filter(i => i.section_id === sectionId)
            .map(i => i.genre)
            .filter(Boolean)
    )) as string[];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => { setActiveTab('list'); resetForm(); }}
                        className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'list'
                            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        <List className="w-4 h-4" /> Manage Content
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'add'
                            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {editingId ? 'Edit Item' : 'Add New Item'}
                    </button>
                    <button
                        onClick={() => { setActiveTab('resume'); resetForm(); }}
                        className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'resume'
                            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        <FileText className="w-4 h-4" /> Resume
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'resume' ? (
                        <ResumeEditor />
                    ) : activeTab === 'list' ? (
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.section_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.genre || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {items.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                    No items found. Add some content!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Section</label>
                                    <select
                                        value={sectionId}
                                        onChange={(e) => setSectionId(e.target.value as SectionId)}
                                        className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                    >
                                        {sections.map(s => (
                                            <option key={s.id} value={s.id}>{s.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value as ItemType)}
                                        className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                    >
                                        <option value="link">Link</option>
                                        <option value="photo">Photo</option>
                                        <option value="article">Article</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="e.g., My Awesome Project"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Caption</label>
                                <textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                    rows={2}
                                    placeholder="Short description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {type === 'photo' ? 'Image (URL or Upload)' : type === 'link' ? 'Link URL' : 'Content / Markdown'}
                                </label>

                                {type === 'photo' && (
                                    <div className="mb-4 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <label className={`cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleFileUpload(e, 'content')}
                                                    disabled={uploading}
                                                />
                                            </label>
                                            <span className="text-xs text-gray-500">or paste URL below</span>
                                        </div>

                                        {content && content.startsWith('http') && (
                                            <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                                <img
                                                    src={content}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setContent('')}
                                                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 font-mono text-sm"
                                    rows={4}
                                    placeholder={type === 'photo' ? 'Enter URL or Upload...' : type === 'link' ? 'https://example.com' : 'Write something...'}
                                    required
                                />
                            </div>

                            {/* Cover Image for Articles and Links */}
                            {(type === 'article' || type === 'link') && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Cover Image (Optional)</label>
                                    <div className="mb-4 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <label className={`cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                <span>{uploading ? 'Uploading...' : 'Upload Cover Image'}</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleFileUpload(e, 'coverInfo')}
                                                    disabled={uploading}
                                                />
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Or paste image URL"
                                                value={coverImage}
                                                onChange={(e) => setCoverImage(e.target.value)}
                                                className="flex-1 p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 text-sm"
                                            />
                                        </div>

                                        {coverImage && (
                                            <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                                <img
                                                    src={coverImage}
                                                    alt="Cover Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setCoverImage('')}
                                                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Genre (Select existing)</label>
                                    <select
                                        value={genre}
                                        onChange={(e) => {
                                            setGenre(e.target.value);
                                            if (e.target.value) setNewGenre('');
                                        }}
                                        className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                        disabled={existingGenres.length === 0}
                                    >
                                        <option value="">-- Select Genre --</option>
                                        {existingGenres.map(g => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Or Add New Genre</label>
                                    <input
                                        type="text"
                                        value={newGenre}
                                        onChange={(e) => {
                                            setNewGenre(e.target.value);
                                            if (e.target.value) setGenre('');
                                        }}
                                        className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="e.g., Philosophy"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => { resetForm(); setActiveTab('list'); }}
                                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={isLoading || uploading}
                                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Saving...' : editingId ? 'Update Item' : 'Post Content'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
