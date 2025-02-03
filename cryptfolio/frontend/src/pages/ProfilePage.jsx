import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/outline';

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=68',
    bio: 'Passionate learner | AI enthusiast',
    completedCourses: 5,
    inProgressCourses: 2,
    achievements: [
      { id: 1, name: 'Quick Learner', description: 'Completed 5 courses' },
      { id: 2, name: 'AI Master', description: 'Finished the AI specialization' },
      { id: 3, name: 'Perfect Score', description: 'Got 100% in a quiz' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{user.bio}</p>
              <button className="mt-4 flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                <PencilIcon className="w-5 h-5 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Learning Progress</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center">
                <AcademicCapIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.completedCourses}</p>
                  <p className="text-gray-600 dark:text-gray-400">Completed Courses</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center">
                <ChartBarIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.inProgressCourses}</p>
                  <p className="text-gray-600 dark:text-gray-400">Courses in Progress</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{achievement.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;

