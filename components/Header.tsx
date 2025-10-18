
import React from 'react';
import type { View } from '../types';
import { DashboardIcon, ListIcon, LogoIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItemClasses = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white";
  const inactiveClasses = "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50";

  return (
    <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <LogoIcon className="h-8 w-8 text-indigo-500" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`${navItemClasses} ${currentView === 'dashboard' ? activeClasses : inactiveClasses}`}
                >
                  <DashboardIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setCurrentView('list')}
                  className={`${navItemClasses} ${currentView === 'list' ? activeClasses : inactiveClasses}`}
                >
                  <ListIcon className="h-5 w-5" />
                  <span>Students</span>
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
             <button onClick={() => setCurrentView('dashboard')} className={`${currentView === 'dashboard' ? 'bg-slate-200 dark:bg-slate-700 p-2 rounded-full' : 'p-2'}`}><DashboardIcon className="h-6 w-6 text-slate-500 dark:text-slate-400"/></button>
             <button onClick={() => setCurrentView('list')} className={`${currentView === 'list' ? 'bg-slate-200 dark:bg-slate-700 p-2 rounded-full' : 'p-2'}`}><ListIcon className="h-6 w-6 text-slate-500 dark:text-slate-400"/></button>
          </div>
        </div>
      </div>
    </header>
  );
};
