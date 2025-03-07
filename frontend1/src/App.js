 import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import DashPeople from './People/DashPeople';

import DashSocial from '../src/SocialMedia/DashSocial';
import Post from './SocialMedia/dashpost';

import DashEmailMarketing from '../src/EmailMarketing/DashEmailMarketing';
import DashPremiumEmails from '../src/Premium Emails/DashPremiumEmails';
import DashEditor from '../src/Premium Emails/DashEditor';
import DashMail from './Email/Inbox2/DashMail';
import DashText from './Email/Inbox2/DashText';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/people" element={<DashPeople />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/email" element={<DashMail />} />
        <Route path="/text" element={<DashText />} />

        
        <Route path="/social media-marketing" element={<DashSocial />} />
        <Route path="/dj" element={<Post />} />
        
        <Route path="/emailmarketing" element={<DashEmailMarketing />} />
        <Route path="/premium-emails" element={<DashPremiumEmails />} />
        <Route path="/blank-template" element={<DashEditor />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;





