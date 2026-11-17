import { useState } from 'react';
import { BookOpen, CheckCircle2, CloudUpload, GitBranch } from 'lucide-react';

interface CourseRoadmapSectionProps {
  onOpenDeployGuide: () => void;
}

export function CourseRoadmapSection({ onOpenDeployGuide }: CourseRoadmapSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="roadmap" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Course Poster Image Card */}
          <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 flex flex-col">
            <div className="text-xs font-medium text-slate-500 mb-3">
              AI 融入課程 · 任務原圖參照
            </div>
            <div className="flex-1 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center min-h-[280px]">
              {!imageError ? (
                <img
                  src="/assets/aistudio/image_d3d34925.png"
                  alt="AI 融入課程：1. 建立 Python 類別與物件學習網頁、2. 上傳到 GitHub、3. 佈署到 Netlify"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-6 text-center space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
                  <div className="text-sm font-semibold text-slate-700">
                    AI 融入課程任務清單
                  </div>
                  <div className="text-xs text-slate-500">
                    Python OOP 學習網頁 · GitHub · Netlify
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3-Step Course Checklist */}
          <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-medium text-slate-500">
                課程實作總覽 · 三階段交付流程
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                從 Python 物件導向網頁到 GitHub 與 Netlify 正式上線
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                本專案已內建 Vite 編譯設定與{' '}
                <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">
                  netlify.toml
                </code>{' '}
                路由組態，完成網頁學習後可直接依照以下三步驟將作品推上雲端。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-emerald-800">
                    步驟 01
                  </span>
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-700"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  建立 Python 類別與物件學習網頁
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  完成互動式藍圖沙盒、四大機制圖解與 5 道隨堂實戰測驗。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-700">
                    步驟 02
                  </span>
                  <GitBranch className="w-4 h-4 text-slate-600" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">上傳到 GitHub</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  建立 GitHub 儲存庫並使用 Git 指令將完整程式碼推送至 main 分支。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-700">
                    步驟 03
                  </span>
                  <CloudUpload
                    className="w-4 h-4 text-slate-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-900">佈署到 Netlify</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  連接 GitHub Repository，設定建置指令 npm run build 與輸出目錄 dist。
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
              <span className="text-xs text-slate-500">
                需要完整 Git 與 Netlify 部署指令？點擊右側開啟操作手冊
              </span>
              <button
                type="button"
                onClick={onOpenDeployGuide}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                開啟 GitHub 與 Netlify 部署指南
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
