import React from 'react';
import './Components/OpenAILogo';
import './App.scss';
import './scrollbar.css';
import './fonts.js';
import TopPage from './Components/TopPage';
import ExamplesPage from './Components/ExamplesPage';
import AboutPage from './Components/AboutPage';
import Footer from './Components/Footer';

function App() {
    return (
        <>
            <TopPage />
            <ExamplesPage />
            <AboutPage />
            <Footer />
        </>
    );
}

export default App; 