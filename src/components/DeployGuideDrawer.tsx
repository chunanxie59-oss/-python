import { useState } from 'react';
import { Check, Copy, X } from 'lucide-react';

interface DeployGuideDrawerProps {
  open: boolean;
  onClose: () => void;
}

const GIT_COMMANDS = `git init
git add .
git commit -m "feat: 建立 Python 類別與物件學習網頁"
git branch -M main
git remote add origin https://github.com/你的帳號/python-oop-learning.git
git push -u origin main`;

export function DeployGuideDrawer({ open, onClose }: DeployGuideDrawerProps) {
  const [copiedGit, setCopiedGit] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  if (!open) return null;

  const handleCopyGit = async () => {
    try {
      await navigator.clipboard.writeText(GIT_COMMANDS);
      setCopiedGit(true);
      setTimeout(() => setCopiedGit(false), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deploy-drawer-title"
    >
      <div className="w-full max-w-xl bg-white h-full overflow-y-auto border-l border-slate-200 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 sticky top-0 bg-white z-10">
          <div>
            <div className="text-xs font-medium text-slate-500">
              AI 融入課程 · 交付步驟 2 & 3
            </div>
            <h2 id="deploy-drawer-title" className="text-lg font-bold text-slate-900">
              GitHub 上傳與 Netlify 佈署指南
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉部署指南"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {/* Step 1 Summary */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <div className="text-xs font-mono font-semibold text-emerald-800">
              步驟 1 · 已完成
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">
              建立 Python 類別與物件學習網頁
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              已包含互動學習沙盒、四大核心觀念追蹤、實戰測驗題組，並已預先建立{' '}
              <code className="font-mono">netlify.toml</code> 與乾淨的{' '}
              <code className="font-mono">.gitignore</code>。
            </p>
          </div>

          {/* Step 2: Upload to GitHub */}
          <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-slate-900">
                步驟 2 · 上傳到 GitHub
              </span>
              <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={step2Done}
                  onChange={(e) => setStep2Done(e.target.checked)}
                  className="rounded accent-blue-700"
                />
                標記已完成
              </label>
            </div>
            <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>登入 GitHub 並點擊右上角「+」→ New repository，建立空儲存庫。</li>
              <li>下載或開啟本專案資料夾終端機，依序執行下方指令：</li>
            </ol>

            <div className="rounded-lg bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto relative">
              <button
                type="button"
                onClick={handleCopyGit}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 float-right cursor-pointer"
              >
                {copiedGit ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                    已複製
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" aria-hidden="true" />
                    複製指令
                  </>
                )}
              </button>
              <pre className="leading-relaxed whitespace-pre">{GIT_COMMANDS}</pre>
            </div>
          </div>

          {/* Step 3: Deploy to Netlify */}
          <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-slate-900">
                步驟 3 · 佈署到 Netlify
              </span>
              <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={step3Done}
                  onChange={(e) => setStep3Done(e.target.checked)}
                  className="rounded accent-blue-700"
                />
                標記已完成
              </label>
            </div>

            <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>登入 Netlify → Add new site → Import an existing project。</li>
              <li>選擇 GitHub 並授權存取剛建立的 repository。</li>
              <li>確認建置參數（專案內的 netlify.toml 亦會自動套用）：</li>
            </ol>

            <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-200 text-xs font-mono">
              <div className="px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Build command</span>
                <span className="font-semibold text-slate-900">npm run build</span>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Publish directory</span>
                <span className="font-semibold text-slate-900">dist</span>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Node version</span>
                <span className="font-semibold text-slate-900">20 或以上</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              點擊 <strong>Deploy site</strong> 後等待約 30 秒，即可獲得專屬的{' '}
              <code className="font-mono">*.netlify.app</code> 公開學習網站連結。
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-600 tabular-nums">
            目前進度：{1 + (step2Done ? 1 : 0) + (step3Done ? 1 : 0)} / 3 項任務
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
          >
            回到學習網頁
          </button>
        </div>
      </div>
    </div>
  );
}
