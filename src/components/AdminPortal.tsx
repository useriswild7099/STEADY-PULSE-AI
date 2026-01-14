import React, { useState, useEffect } from 'react';
import { Shield, LayoutDashboard, FileText, Settings, Users, Search, Bell, Menu, X, ChevronRight, Briefcase, Zap, Brain, Target, Star, Copy, Check, AlertTriangle, ExternalLink, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { PROMPT_TEMPLATES } from '../lib/promptTemplates';
import { generateLeadGenPrompt, generateContentPrompt, generateMissingAnalysis, generateUspStatement } from '../lib/adminPrompts';

export function AdminPortal() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<'clients' | 'submissions' | 'prompts' | 'analytics' | 'settings'>('clients');
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any | null>(null);
    const [modalTab, setModalTab] = useState<'business' | 'brand' | 'lead-gen' | 'content' | 'analysis' | 'usp'>('business');
    const [modalStatus, setModalStatus] = useState<string>('pending');

    // Generated Content State
    const [leadGenPrompt, setLeadGenPrompt] = useState('');
    const [contentPrompt, setContentPrompt] = useState('');
    const [missingAnalysis, setMissingAnalysis] = useState('');
    const [uspStatement, setUspStatement] = useState('');

    const handleLogout = (e?: React.MouseEvent) => {
        e?.preventDefault();
        console.log('Initiating logout...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/', { replace: true });
    };

    // Fetch Clients
    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (!token) return;
            const data = await api.get('/admin/clients', token);
            if (data && data.clients) {
                setClients(data.clients);
            } else if (Array.isArray(data)) {
                setClients(data);
            }
        } catch (error) {
            console.error('Failed to fetch clients', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Generate Logic
    useEffect(() => {
        if (selectedClient) {
            setLeadGenPrompt(generateLeadGenPrompt(selectedClient));
            setContentPrompt(generateContentPrompt(selectedClient));
            setMissingAnalysis(generateMissingAnalysis(selectedClient));
            setUspStatement(generateUspStatement(selectedClient));
            setModalStatus(selectedClient.onboardingStatus || 'pending');
        }
    }, [selectedClient]);

    // --- Create Admin State ---
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [createAdminStatus, setCreateAdminStatus] = useState<{type: 'success' | 'error' | null, message: string}>({ type: null, message: '' });

    // --- Actions ---
    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateAdminStatus({ type: null, message: '' });
        try {
            const token = localStorage.getItem('token');
            await api.post('/auth/create-admin', { email: newAdminEmail, password: newAdminPassword }, token);
            setCreateAdminStatus({ type: 'success', message: 'Admin user created successfully.' });
            setNewAdminEmail('');
            setNewAdminPassword('');
        } catch (err: any) {
            setCreateAdminStatus({ type: 'error', message: err.response?.data?.message || 'Failed to create admin.' });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    const handleSaveChanges = async () => {
        if (!selectedClient) return;
        try {
            const token = localStorage.getItem('token');
            await api.put(`/admin/clients/${selectedClient._id}/status`, { status: modalStatus }, token || '');
            
            // Update local state
            setClients(prev => prev.map(c => 
                c._id === selectedClient._id ? { ...c, onboardingStatus: modalStatus } : c
            ));
            
            // Close modal
            setSelectedClient(null);
        } catch (error) {
            console.error('Failed to update status', error);
            // Optionally add error handling UI here
        }
    };

    // --- Render Helpers ---
    const renderClientManagement = () => (
        <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slideDown">
                <StatCard 
                    title="Total Clients" 
                    value={clients.length} 
                    change="+12% vs last month" 
                    icon={<Users className="w-6 h-6" />}
                    gradient="from-blue-500 to-cyan-400"
                />
                <StatCard 
                    title="Active Strategy" 
                    value={clients.filter(c => c.status === 'in-progress' || c.onboardingStatus === 'in-progress').length} 
                    change="+5% vs last month" 
                    icon={<Zap className="w-6 h-6" />}
                    gradient="from-purple-500 to-pink-400"
                />
                <StatCard 
                    title="Pending Review" 
                    value={clients.filter(c => c.status === 'pending' || c.onboardingStatus === 'pending').length} 
                    change="-2% vs last month" 
                    icon={<AlertTriangle className="w-6 h-6" />}
                    gradient="from-amber-500 to-orange-400"
                />
                <StatCard 
                    title="Completion Rate" 
                    value="94%" 
                    change="+1% vs last month" 
                    icon={<Check className="w-6 h-6" />}
                    gradient="from-emerald-500 to-teal-400"
                />
            </div>

            {/* Client List */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-xl animate-fadeIn">
                <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#111827]">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        Client Database
                    </h2>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search clients..." 
                                className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-xl pl-9 pr-4 py-2 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none w-64 transition-all"
                            />
                        </div>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-700">
                            <Shield className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#1F2937] text-gray-300 text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4 text-left">Client Name</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Stage</th>
                                <th className="px-6 py-4 text-left">Priority</th>
                                <th className="px-6 py-4 text-left">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {clients.map((client) => (
                                <tr key={client._id} className="hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-gray-300 font-bold shadow-inner">
                                                {client.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{client.email}</div>
                                                <div className="text-xs text-gray-500">ID: {client._id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge status={client.onboardingStatus || 'pending'} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                                        {client.onboardingData?.generalData?.stage || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-300 bg-gray-800 w-fit px-2 py-1 rounded-md border border-gray-700">
                                            <div className={`w-1.5 h-1.5 rounded-full ${client.status === 'urgent' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                            {client.onboardingData?.generalData?.priority || 'Normal'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                                        {new Date().toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => { setSelectedClient(client); setModalTab('business'); }}
                                            className="text-sm text-blue-400 hover:text-blue-300 font-semibold hover:underline flex items-center justify-end gap-1"
                                        >
                                            View Details 
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {clients.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                                        No clients found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

    const renderSubmissions = () => (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-500" />
                Form Submissions
            </h2>
            <div className="space-y-4">
                {clients.filter(c => c.onboardingData && Object.keys(c.onboardingData).length > 0).map(client => (
                    <div key={client._id} className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{client.email}</h4>
                                <p className="text-sm text-gray-400">Submitted: {new Date(client.updatedAt || Date.now()).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => { setSelectedClient(client); setModalTab('business'); }}
                            className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
                        >
                            Review Submission
                        </button>
                    </div>
                ))}
                {clients.filter(c => c.onboardingData && Object.keys(c.onboardingData).length > 0).length === 0 && (
                    <div className="text-center py-12 text-gray-500">No submissions found.</div>
                )}
            </div>
        </div>
    );

    const renderPromptLibrary = () => (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-500" />
                Prompt Library
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROMPT_TEMPLATES.map(template => (
                    <div key={template.id} className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors group cursor-pointer shadow-lg">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{template.name}</h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">{template.description}</p>
                        <div className="flex items-center text-xs font-bold text-gray-500 bg-gray-900 w-fit px-2 py-1 rounded border border-gray-800">
                            SYSTEM TEMPLATE
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const processAnalyticsData = (clients: any[]) => {
        if (!clients || clients.length === 0) {
            return null;
        }

        const totalClients = clients.length;
        const completedStrategies = clients.filter(c => c.onboardingStatus === 'completed').length;
        const conversionRate = totalClients > 0 ? (completedStrategies / totalClients) * 100 : 0;

        const pipelineStatus = clients.reduce((acc, client) => {
            const status = client.onboardingStatus || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, { pending: 0, 'in-progress': 0, completed: 0 });

        const industryDistribution = clients.reduce((acc, client) => {
            const industry = client.onboardingData?.generalData?.industry || 'Unknown';
            acc[industry] = (acc[industry] || 0) + 1;
            return acc;
        }, {});

        const topIndustries = Object.entries(industryDistribution)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5);

        const totalManagedAdSpend = clients.reduce((acc, client) => {
            const budget = parseFloat(client.onboardingData?.generalData?.monthlyAdBudget) || 0;
            return acc + budget;
        }, 0);

        return {
            totalClients,
            completedStrategies,
            conversionRate,
            pipelineStatus,
            topIndustries,
            totalManagedAdSpend,
        };
    };

    const AnalyticsStatCard = ({ title, value, subValue, icon, color }: any) => (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
                <div className={`w-12 h-12 rounded-lg bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mb-4`}>
                    {icon}
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
                <div className="text-3xl font-bold text-white">{value}</div>
            </div>
            {subValue && <div className="text-xs text-gray-500 mt-4">{subValue}</div>}
        </div>
    );

    const PipelineBar = ({ data }: any) => {
        const total = Object.values(data).reduce((acc: any, value: any) => acc + value, 0) as number;
        if (total === 0) return null;

        const percentages = {
            completed: (data.completed / total) * 100,
            inProgress: (data['in-progress'] / total) * 100,
            pending: (data.pending / total) * 100,
        };

        return (
            <div className="w-full h-8 bg-gray-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${percentages.completed}%` }} className="h-full bg-green-500 transition-all duration-500" />
                <div style={{ width: `${percentages.inProgress}%` }} className="h-full bg-blue-500 transition-all duration-500" />
                <div style={{ width: `${percentages.pending}%` }} className="h-full bg-yellow-500 transition-all duration-500" />
            </div>
        );
    };
    
    const renderAnalytics = () => {
        const analytics = processAnalyticsData(clients);

        if (!analytics) {
            return (
                <div className="flex flex-col items-center justify-center h-96 bg-[#111827] border border-gray-800 rounded-2xl animate-fadeIn">
                    <Target className="w-12 h-12 text-gray-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-400">No Analytics Data Yet</h3>
                    <p className="text-sm text-gray-500">As clients are onboarded, this dashboard will populate with performance metrics.</p>
                </div>
            );
        }

        const { totalClients, completedStrategies, conversionRate, pipelineStatus, topIndustries, totalManagedAdSpend } = analytics;

        return (
            <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Target className="w-6 h-6 text-green-500" />
                    Analytics Dashboard
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnalyticsStatCard title="Total Clients" value={totalClients} icon={<Users className="w-6 h-6 text-blue-400" />} color="blue" />
                    <AnalyticsStatCard title="Completed Strategies" value={completedStrategies} icon={<Check className="w-6 h-6 text-green-400" />} color="green" />
                    <AnalyticsStatCard title="Conversion Rate" value={`${conversionRate.toFixed(1)}%`} icon={<Zap className="w-6 h-6 text-purple-400" />} color="purple" />
                    <AnalyticsStatCard title="Total Managed Ad Spend" value={`$${totalManagedAdSpend.toLocaleString()}`} subValue="Estimated per month" icon={<Briefcase className="w-6 h-6 text-amber-400" />} color="amber" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-6">Client Pipeline Health</h3>
                        <PipelineBar data={pipelineStatus} />
                        <div className="flex justify-between mt-4 text-xs font-bold text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span>Completed ({pipelineStatus.completed})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span>In Progress ({pipelineStatus['in-progress']})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span>Pending ({pipelineStatus.pending})</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-6">Top 5 Industries</h3>
                        {topIndustries.length > 0 ? (
                            <ul className="space-y-4">
                                {topIndustries.map(([industry, count], i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-400 w-6 text-center">{i + 1}</span>
                                            <span className="text-sm font-bold text-white">{industry}</span>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-bold text-blue-400 bg-blue-500/10 rounded-full">{count} Clients</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-sm text-gray-500 py-8">No industry data available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderSettings = () => (
        <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Settings className="w-6 h-6 text-gray-400" />
                System Settings
            </h2>

            {/* Create Admin Section */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    Create New Admin
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                    Add a new administrator to the system. This user will have full access to all client data and settings.
                </p>

                {createAdminStatus.message && (
                    <div className={`p-4 rounded-lg mb-6 text-sm font-semibold border ${
                        createAdminStatus.type === 'success' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                        {createAdminStatus.message}
                    </div>
                )}

                <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Email</label>
                        <input 
                            type="email" 
                            required 
                            value={newAdminEmail}
                            onChange={(e) => setNewAdminEmail(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                            placeholder="admin@company.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                        <input 
                            type="password" 
                            required 
                            value={newAdminPassword}
                            onChange={(e) => setNewAdminPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 mt-4"
                    >
                        Create Admin Account
                    </button>
                </form>
            </div>
            
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-xl opacity-60">
                 <h3 className="text-lg font-bold text-white mb-4">Application Version</h3>
                 <div className="flex justify-between items-center text-sm text-gray-400 border-b border-gray-800 pb-4">
                    <span>Current Version</span>
                    <span className="font-mono text-white">v2.4.0</span>
                 </div>
                 <div className="flex justify-between items-center text-sm text-gray-400 pt-4">
                    <span>Last Update</span>
                    <span>{new Date().toLocaleDateString()}</span>
                 </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0b0f15] border-r border-white/5 flex flex-col z-20">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Admin Portal</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-3 mb-2 mt-2">Operations</div>
                    <SidebarItem 
                        icon={<Users className="w-5 h-5" />} 
                        label="Client Management" 
                        active={activeSection === 'clients'} 
                        onClick={() => setActiveSection('clients')} 
                    />
                    <SidebarItem 
                        icon={<FileText className="w-5 h-5" />} 
                        label="Form Submissions" 
                        active={activeSection === 'submissions'} 
                        onClick={() => setActiveSection('submissions')}
                        badge={clients.filter(c => c.onboardingStatus === 'pending').length}
                    />
                    
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-3 mb-2 mt-6">Tools</div>
                    <SidebarItem 
                        icon={<Brain className="w-5 h-5" />} 
                        label="Prompt Library" 
                        active={activeSection === 'prompts'} 
                        onClick={() => setActiveSection('prompts')}
                    />
                    <SidebarItem 
                        icon={<Target className="w-5 h-5" />} 
                        label="Analytics" 
                        active={activeSection === 'analytics'} 
                        onClick={() => setActiveSection('analytics')} 
                    />

                    <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-3 mb-2 mt-6">System</div>
                    <SidebarItem 
                        icon={<Settings className="w-5 h-5" />} 
                        label="Settings" 
                        active={activeSection === 'settings'} 
                        onClick={() => setActiveSection('settings')} 
                    />
                </nav>
                
                <div className="p-4 border-t border-white/5 bg-[#0b0f15]">
                    <button 
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium cursor-pointer relative z-50"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm">Sign Out</span>
                    </button>
                    <div className="mt-4 px-3 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
                            AD
                         </div>
                         <div className="overflow-hidden">
                            <div className="text-sm font-bold text-white truncate">Administrator</div>
                            <div className="text-xs text-gray-500 truncate">System Access</div>
                         </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black relative">
                 {/* Background Ambient Effect */}
                 <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]"></div>
                 </div>

                <div className="relative z-10 p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {activeSection === 'clients' && 'Dashboard Overview'}
                                {activeSection === 'submissions' && 'Submissions Review'}
                                {activeSection === 'prompts' && 'AI Prompt Library'}
                                {activeSection === 'analytics' && 'Performance Analytics'}
                                {activeSection === 'settings' && 'System Configuration'}
                            </h1>
                            <p className="text-gray-400">
                                {activeSection === 'clients' && 'Manage client accounts and generate strategic insights.'}
                                {activeSection === 'submissions' && 'Review and process incoming onboarding forms.'}
                                {activeSection === 'prompts' && 'Browse and manage system-wide AI prompt templates.'}
                                {activeSection === 'analytics' && 'Track agency growth and client acquisition metrics.'}
                                {activeSection === 'settings' && 'Manage admin access and platform settings.'}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-gray-500 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                System Online
                            </span>
                        </div>
                    </div>

                    {/* Dynamic Content */}
                    {activeSection === 'clients' && renderClientManagement()}
                    {activeSection === 'submissions' && renderSubmissions()}
                    {activeSection === 'prompts' && renderPromptLibrary()}
                    {activeSection === 'analytics' && renderAnalytics()}
                    {activeSection === 'settings' && renderSettings()}
                </div>
            </main>

            {/* Client Details Modal */}
            {selectedClient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4 animate-fadeIn">
                    <div className="w-full max-w-6xl h-[90vh] bg-[#0E1217] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0E1217]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                                    {selectedClient.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">{selectedClient.email}</h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-700">Premium Plan</span>
                                        <span>•</span>
                                        <span>Joined {new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold border border-gray-700 transition-colors">
                                    Edit Profile
                                </button>
                                <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase mr-2">Status:</span>
                                    <select 
                                        value={modalStatus}
                                        onChange={(e) => setModalStatus(e.target.value)}
                                        className="bg-transparent text-white text-sm font-semibold outline-none cursor-pointer"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <button 
                                    onClick={() => setSelectedClient(null)}
                                    className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-gray-500 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex border-b border-white/10 bg-[#0E1217] px-8 gap-6 overflow-x-auto custom-scrollbar">
                            <TabButton active={modalTab === 'business'} onClick={() => setModalTab('business')} icon={<Briefcase className="w-4 h-4" />} label="Business Fit" />
                            <TabButton active={modalTab === 'brand'} onClick={() => setModalTab('brand')} icon={<Star className="w-4 h-4" />} label="Brand DNA" />
                            <TabButton active={modalTab === 'lead-gen'} onClick={() => setModalTab('lead-gen')} icon={<Target className="w-4 h-4" />} label="Lead Gen Strategy" />
                            <TabButton active={modalTab === 'content'} onClick={() => setModalTab('content')} icon={<FileText className="w-4 h-4" />} label="Content Strategy" />
                            <TabButton active={modalTab === 'analysis'} onClick={() => setModalTab('analysis')} icon={<AlertTriangle className="w-4 h-4" />} label="Missing Analysis" />
                            <TabButton active={modalTab === 'usp'} onClick={() => setModalTab('usp')} icon={<Zap className="w-4 h-4" />} label="USP Generator" />
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 bg-black/20 custom-scrollbar">
                             {/* Content Logic (Same as before) */}
                             {modalTab === 'business' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                                    <DataSection title="Essential Details" data={selectedClient.onboardingData?.generalData} fields={['firstName', 'lastName', 'email', 'phone', 'linkedin', 'companyName']} />
                                    <DataSection title="Business Identity" data={selectedClient.onboardingData?.generalData} fields={['industry', 'businessModel', 'primaryGoal', 'currentRevenue', 'monthlyAdBudget', 'teamSize']} />
                                    <DataSection title="Offer & Audience" data={selectedClient.onboardingData?.generalData} fields={['coreOffer', 'offerPricePoint', 'targetAudience', 'keyPainPoints']} />
                                    <DataSection title="Logistics" data={selectedClient.onboardingData?.generalData} fields={['timezone', 'preferredCommunication', 'startDate']} />
                                </div>
                            )}

                            {modalTab === 'brand' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                                    <DataSection title="Core Identity" data={selectedClient.onboardingData?.brandData} fields={['communicationStyle', 'toneDescriptors', 'archetype', 'emotionalImpact']} />
                                    <DataSection title="Content Strategy" data={selectedClient.onboardingData?.brandData} fields={['contentPillars', 'keyStories', 'contentFrequency', 'preferredFormats']} />
                                    <DataSection title="Visual Style" data={selectedClient.onboardingData?.brandData} fields={['visualAesthetic', 'colorPalette', 'photoStyle']} />
                                    <DataSection title="Audience & Positioning" data={selectedClient.onboardingData?.brandData} fields={['targetAudience', 'uniqueValueProp', 'commonObjections', 'competitors']} />
                                </div>
                            )}

                            {modalTab === 'lead-gen' && (
                                <PromptView 
                                    title="Lead Generation Strategy" 
                                    description="AI-generated 90-day execution plan based on business metrics." 
                                    content={leadGenPrompt} 
                                    onCopy={() => copyToClipboard(leadGenPrompt)}
                                />
                            )}

                            {modalTab === 'content' && (
                                <PromptView 
                                    title="Content Strategy & Calendar" 
                                    description="Comprehensive content roadmap aligned with Brand DNA." 
                                    content={contentPrompt} 
                                    onCopy={() => copyToClipboard(contentPrompt)}
                                />
                            )}

                            {modalTab === 'analysis' && (
                                <PromptView 
                                    title="Missing Data Analysis" 
                                    description="System check for incomplete onboarding fields." 
                                    content={missingAnalysis} 
                                    onCopy={() => {}}
                                    isAnalysis
                                />
                            )}

                             {modalTab === 'usp' && (
                                <PromptView 
                                    title="USP Generator" 
                                    description="Auto-synthesized Unique Selling Proposition." 
                                    content={uspStatement} 
                                    onCopy={() => copyToClipboard(uspStatement)}
                                />
                            )}
                        </div>

                         {/* Modal Footer */}
                         <div className="p-4 border-t border-white/10 bg-[#0E1217] flex justify-end gap-3">
                             <button onClick={() => setSelectedClient(null)} className="px-6 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-bold transition-colors">
                                Close
                             </button>
                             <button 
                                onClick={handleSaveChanges}
                                className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 transition-all"
                             >
                                Save Changes
                             </button>
                         </div>
                    </div>
                </div>
            )}
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
                .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
                .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
}

// --- Sub Components ---

function SidebarItem({ icon, label, active, onClick, badge }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                active 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`${active ? 'text-blue-400' : 'text-gray-500 group-hover:text-white'}`}>
                    {icon}
                </div>
                <span className="text-sm font-medium">{label}</span>
            </div>
            {badge && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold">
                    {badge}
                </span>
            )}
        </button>
    );
}

function StatCard({ title, value, change, icon, gradient }: any) {
    return (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                {icon}
            </div>
            <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-gray-300">
                    {icon}
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
                <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg bg-white/5 border border-white/5 ${change.includes('+') ? 'text-green-400' : 'text-orange-400'}`}>
                        {change}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Badge({ status }: any) {
    const styles = {
        'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'completed': 'bg-green-500/10 text-green-400 border-green-500/20',
    };
    const labels = {
        'pending': 'Pending',
        'in-progress': 'Processing',
        'completed': 'Ready',
    };
    const s = status as keyof typeof styles || 'pending';
    
    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${styles[s] || styles['pending']}`}>
            {labels[s] || 'Unknown'}
        </span>
    );
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 py-4 border-b-2 transition-all whitespace-nowrap px-1 ${
                active 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

function DataSection({ title, data, fields }: any) {
    if (!data) return (
        <div className="bg-white/5 border border-white/5 rounded-xl p-6">
            <h4 className="font-semibold text-gray-300 mb-4 pb-2 border-b border-white/5">{title}</h4>
            <p className="text-gray-500 text-sm italic">No data provided.</p>
        </div>
    );

    return (
        <div className="bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
            <h4 className="font-semibold text-gray-300 mb-5 pb-3 border-b border-white/5 flex items-center justify-between">
                {title}
            </h4>
            <div className="space-y-4">
                {fields.map((field: string) => (
                    <div key={field} className="grid grid-cols-1 gap-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm text-gray-200">
                             {Array.isArray(data[field]) 
                                ? data[field].join(', ') || <em className="text-gray-600">None</em>
                                : (data[field] || <em className="text-gray-600">Not provided</em>)
                             }
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PromptView({ title, description, content, onCopy, isAnalysis }: any) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-8 animate-fadeIn h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={onCopy}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Copy className="w-4 h-4" />
                        Copy text
                    </button>
                </div>
            </div>
            
            <div className={`flex-1 rounded-xl p-6 overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed border ${
                isAnalysis ? 'bg-black/40 border-yellow-500/20 text-gray-300' : 'bg-black/40 border-white/5 text-gray-300'
            }`}>
                <pre className="whitespace-pre-wrap">{content}</pre>
            </div>
        </div>
    );
}
