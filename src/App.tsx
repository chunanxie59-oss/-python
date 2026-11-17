import { useState } from 'react';
import { ChallengeQuiz } from './components/ChallengeQuiz';
import { ConceptExplorer } from './components/ConceptExplorer';
import { CourseRoadmapSection } from './components/CourseRoadmapSection';
import { DeployGuideDrawer } from './components/DeployGuideDrawer';
import { Header } from './components/Header';
import { HeroSection, StageKey } from './components/HeroSection';
import { OopSandbox } from './components/OopSandbox';

export default function App() {
  const [activeStage, setActiveStage] = useState<StageKey>('blueprint');
  const [deployGuideOpen, setDeployGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Header onOpenDeployGuide={() => setDeployGuideOpen(true)} />

      <main className="flex-1">
        <HeroSection
          activeStage={activeStage}
          onSelectStage={setActiveStage}
          onOpenDeployGuide={() => setDeployGuideOpen(true)}
        />
        <OopSandbox />
        <ConceptExplorer />
        <ChallengeQuiz />
        <CourseRoadmapSection onOpenDeployGuide={() => setDeployGuideOpen(true)} />
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Python 物件導向實驗室 · AI 融入課程教學網頁
          </div>
          <div className="flex items-center gap-6">
            <a href="#sandbox" className="hover:text-slate-900 transition-colors">
              互動沙盒
            </a>
            <a href="#concepts" className="hover:text-slate-900 transition-colors">
              核心機制
            </a>
            <a href="#quiz" className="hover:text-slate-900 transition-colors">
              實戰測驗
            </a>
            <button
              type="button"
              onClick={() => setDeployGuideOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              GitHub 與 Netlify 部署指南
            </button>
          </div>
        </div>
      </footer>

      <DeployGuideDrawer
        open={deployGuideOpen}
        onClose={() => setDeployGuideOpen(false)}
      />
    </div>
  );
}
