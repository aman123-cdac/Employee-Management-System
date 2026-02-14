import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Building } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    // In a real app, we might fetch more details using user.id if available
    // For now, we display the info from the token/context

    return (

        <div className="max-w-2xl mx-auto pt-10">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h1>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden text-gray-900 dark:text-white transition-colors">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-center -mt-12 mb-6">
                        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 shadow-md flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-500 text-white">
                            <User size={40} />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.username || 'User'}</h2>
                        <p className="text-blue-600 dark:text-blue-400 font-medium capitalize">{user?.role?.toLowerCase() || 'Guest'}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Username / Email</p>
                                <p className="font-medium text-gray-900 dark:text-white">{user?.username}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <Shield size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Role & Permissions</p>
                                <p className="font-medium text-gray-900 dark:text-white capitalize">{user?.role?.toLowerCase()}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                <Building size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                <p className="font-medium text-green-600 dark:text-green-400">Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
