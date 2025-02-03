import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { ChatAlt2Icon, DocumentTextIcon, BookOpenIcon } from '@heroicons/react/outline';

const LessonPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'Notes', icon: DocumentTextIcon },
    { name: 'Examples', icon: BookOpenIcon },
    { name: 'Resources', icon: ChatAlt2Icon },
  ];

  const tabContent = [
    {
      title: 'Introduction to Machine Learning',
      content: 'Machine Learning is a subset of artificial intelligence...',
    },
    {
      title: 'Example: Linear Regression',
      content: 'Linear regression is a basic predictive analytics technique...',
    },
    {
      title: 'Additional Resources',
      content: 'Check out these books and online courses for more information...',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Current Lesson</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <Tab.Group onChange={setSelectedTab}>
              <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700 dark:text-indigo-200
                      ${
                        selected
                          ? 'bg-white dark:bg-gray-700 shadow'
                          : 'text-indigo-100 hover:bg-white/[0.12] hover:text-indigo-600 dark:hover:text-white'
                      }
                    `
                    }
                  >
                    <div className="flex items-center justify-center">
                      <tab.icon className="w-5 h-5 mr-2" />
                      {tab.name}
                    </div>
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {tabContent.map((item, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={`rounded-xl bg-white dark:bg-gray-800 p-3
                      ${idx === selectedTab ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400' : ''}
                    `}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{item.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">AI Assistant</h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto mb-4">
            {/* Chat messages would go here */}
            <p className="text-gray-600 dark:text-gray-300">How can I help you with today's lesson?</p>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300">
              Send
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;

