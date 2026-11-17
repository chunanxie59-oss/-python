import { useState } from 'react';
import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/oopCurriculum';

export function ChallengeQuiz() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});
  const [showHintMap, setShowHintMap] = useState<Record<string, boolean>>({});

  const currentQuestion = QUIZ_QUESTIONS[activeIndex];
  const selectedOption = selectedAnswers[currentQuestion.id];
  const isVerified = verifiedMap[currentQuestion.id] === true;
  const isCorrect = selectedOption === currentQuestion.correctOptionId;
  const showHint = showHintMap[currentQuestion.id] === true;

  const solvedCount = QUIZ_QUESTIONS.filter(
    (q) => verifiedMap[q.id] && selectedAnswers[q.id] === q.correctOptionId
  ).length;

  const handleSelectOption = (optionId: string) => {
    if (isVerified) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleVerify = () => {
    if (!selectedOption) return;
    setVerifiedMap((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleRetryQuestion = () => {
    setVerifiedMap((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  return (
    <section id="quiz" className="py-12 border-b border-slate-200 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-medium text-slate-500">
              隨堂實戰測驗 · 即時驗證觀念
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              03. Python 物件導向實戰挑戰
            </h2>
          </div>

          <div className="text-sm font-medium text-slate-700 tabular-nums">
            已通過關卡：<span className="font-bold text-blue-700">{solvedCount}</span> /{' '}
            {QUIZ_QUESTIONS.length}
          </div>
        </div>

        {/* Question Step Selector */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const passed =
              verifiedMap[q.id] && selectedAnswers[q.id] === q.correctOptionId;
            const failed =
              verifiedMap[q.id] && selectedAnswers[q.id] !== q.correctOptionId;
            const isCurrent = idx === activeIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                  isCurrent
                    ? 'bg-blue-700 text-white border-blue-700'
                    : passed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : failed
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                第 {idx + 1} 題 · {q.topic}
              </button>
            );
          })}
        </div>

        {/* Main Quiz Card */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Code Snippet */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-5 overflow-x-auto">
            <div className="text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
              題目程式碼 · {currentQuestion.topic}
            </div>
            <pre className="mt-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-100">
              {currentQuestion.codeSnippet}
            </pre>
          </div>

          {/* Question & Options */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.prompt}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setShowHintMap((prev) => ({
                    ...prev,
                    [currentQuestion.id]: !prev[currentQuestion.id],
                  }))
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                {showHint ? '隱藏提示' : '查看提示'}
              </button>
            </div>

            {showHint && (
              <div className="rounded-lg border border-blue-200 bg-blue-50/70 px-4 py-3 text-xs sm:text-sm text-blue-900">
                提示：{currentQuestion.hint}
              </div>
            )}

            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isRightOption = opt.id === currentQuestion.correctOptionId;

                let optionStyle =
                  'border-slate-200 bg-[#F8FAFC] hover:border-slate-300 text-slate-800';
                if (isVerified) {
                  if (isRightOption) {
                    optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950';
                  } else if (isSelected && !isRightOption) {
                    optionStyle = 'border-red-500 bg-red-50 text-red-950';
                  } else {
                    optionStyle = 'border-slate-200 bg-slate-50 text-slate-500';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-blue-600 bg-blue-50 text-blue-950';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isVerified}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-start gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <span className="font-mono text-xs font-bold uppercase mt-0.5 shrink-0">
                      {opt.id}.
                    </span>
                    <span className="text-sm font-medium leading-relaxed">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {!isVerified ? (
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={handleVerify}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    驗證答案
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRetryQuestion}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    重新作答
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-lg cursor-pointer"
                >
                  上一題
                </button>
                <button
                  type="button"
                  disabled={activeIndex === QUIZ_QUESTIONS.length - 1}
                  onClick={() =>
                    setActiveIndex((i) => Math.min(QUIZ_QUESTIONS.length - 1, i + 1))
                  }
                  className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-lg cursor-pointer"
                >
                  下一題
                </button>
              </div>
            </div>

            {/* Verification Feedback */}
            {isVerified && (
              <div
                className={`rounded-lg border p-4 flex items-start gap-3 ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                    : 'border-red-200 bg-red-50/70 text-red-950'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <XCircle
                    className="w-5 h-5 text-red-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                )}
                <div className="space-y-1">
                  <div className="text-sm font-bold">
                    {isCorrect
                      ? '答對了！觀念非常清晰'
                      : `答案不正確（正確選項為 ${currentQuestion.correctOptionId.toUpperCase()}）`}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
