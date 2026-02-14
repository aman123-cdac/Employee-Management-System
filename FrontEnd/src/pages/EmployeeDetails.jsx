import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, User, Building, Calendar, Edit, Trash2, Award, X } from 'lucide-react';

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
                toast.error('Failed to load employee details');
                navigate('/employees');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                toast.success('Employee deleted successfully');
                navigate('/employees');
            } catch (error) {
                console.error('Error deleting employee:', error);
                if (error.response && error.response.status === 403) {
                    toast.error('Permission denied: Only Admins can delete employees');
                } else {
                    toast.error('Failed to delete employee');
                }
            }
        }
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (!employee) return (
        <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header / Navigation */}
            <button
                onClick={() => navigate('/employees')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Team</span>
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
                {/* Banner / Cover */}
                <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start -mt-20 relative z-10">
                        {/* Profile Image */}
                        <div
                            className="w-40 h-40 rounded-3xl border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity group"
                            onClick={() => employee.photo && setIsImageModalOpen(true)}
                        >
                            {employee.photo ? (
                                <img src={employee.photo} alt={employee.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                                    <User size={64} />
                                </div>
                            )}
                            {employee.photo && (
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                    <span className="text-xs font-medium bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">View</span>
                                </div>
                            )}
                        </div>

                        {/* Name & Role */}
                        <div className="flex-1 pt-20 md:pt-24 min-w-0">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white truncate">{employee.name}</h1>
                                    <div className="flex items-center gap-3 mt-2 text-gray-600 dark:text-gray-300">
                                        <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
                                        <span className="font-medium">{employee.companyRole}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                        <span>{employee.department}</span>
                                    </div>
                                </div>

                                {user?.role === 'ADMIN' && (
                                    <div className="flex gap-3 relative z-20">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/edit-employee/${id}`);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors font-medium border border-blue-100 dark:border-blue-800"
                                        >
                                            <Edit size={18} />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete();
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-medium border border-red-100 dark:border-red-800"
                                        >
                                            <Trash2 size={18} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {/* Sidebar Info */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-4">Contact Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm">
                                            <Mail size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Email Address</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={employee.email}>
                                                {employee.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg text-green-600 dark:text-green-400 shadow-sm">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Phone Number</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {employee.phone || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg text-purple-600 dark:text-purple-400 shadow-sm">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Location</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {employee.address || 'No address'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <Award className="text-white/80" />
                                    <h3 className="font-semibold">Performance</h3>
                                </div>
                                <p className="text-white/80 text-sm mb-4">Employee performance metrics and reviews can be added here.</p>
                                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                    <div className="bg-white rounded-full h-2 w-3/4"></div>
                                </div>
                                <div className="flex justify-between text-xs text-white/80">
                                    <span>Progress</span>
                                    <span>75%</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Info */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <User className="text-blue-600 dark:text-blue-400" size={20} />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-200 dark:hover:border-blue-500/50 transition-colors">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{employee.name}</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-200 dark:hover:border-blue-500/50 transition-colors">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Username</p>
                                        <p className="font-medium text-gray-900 dark:text-white">@{employee.username || 'N/A'}</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-200 dark:hover:border-blue-500/50 transition-colors">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Marital Status</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{employee.maritalStatus || 'N/A'}</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-200 dark:hover:border-blue-500/50 transition-colors">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Education</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{employee.education || 'N/A'}</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Briefcase className="text-purple-600 dark:text-purple-400" size={20} />
                                    Job & Compensation
                                </h3>
                                <div className="bg-white dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-gray-700">
                                        <div className="p-6 text-center">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Department</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{employee.department}</p>
                                        </div>
                                        <div className="p-6 text-center">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Role</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{employee.companyRole}</p>
                                        </div>
                                        <div className="p-6 text-center bg-gray-50/50 dark:bg-gray-700/50">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Annual Salary</p>
                                            <p className="font-bold text-green-600 dark:text-green-400">
                                                {employee.salary ? `₹${Number(employee.salary).toLocaleString('en-IN')}` : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Calendar className="text-orange-500" size={20} />
                                    Timeline
                                </h3>
                                <div className="border-l-2 border-gray-100 dark:border-gray-700 ml-3 pl-6 space-y-6 relative">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 bg-blue-500"></div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Joined Company</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {employee.joinedDate ? new Date(employee.joinedDate).toLocaleDateString() : 'Date not recorded'}
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600"></div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Profile Created</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : 'Date not recorded'}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
                    onClick={() => setIsImageModalOpen(false)}
                >
                    <div className="relative max-w-5xl w-full h-full max-h-[90vh] flex items-center justify-center">
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsImageModalOpen(false);
                            }}
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={employee.photo}
                            alt={employee.name}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetails;
