import { ArrowDownRight, BookOpen, GitBranch, Layers, ShieldCheck } from 'lucide-react';

export type StageKey = 'blueprint' | 'factory' | 'inheritance' | 'encapsulation';

interface HeroSectionProps {
  activeStage: StageKey;
  onSelectStage: (stage: StageKey) => void;
  onOpenDeployGuide: () => void;
}

const STAGE_ITEMS: {
  id: StageKey;
  index: string;
  title: string;
  subtitle: string;
  targetHref: string;
  icon: typeof BookOpen;
}[] = [
  {
    id: 'blueprint',
    index: '01',
    title: '類別藍圖與建構子',
    subtitle: '理解 class 與 __init__',
    targetHref: '#sandbox',
    icon: BookOpen,
  },
  {
    id: 'factory',
    index: '02',
    title: '實例化與 self 隔離',
    subtitle: '在記憶體池建立獨立物件',
    targetHref: '#sandbox',
    icon: Layers,
  },
  {
    id: 'inheritance',
    index: '03',
    title: '繼承與方法覆寫',
    subtitle: '父類別與 super() 應用',
    targetHref: '#concepts',
    icon: GitBranch,
  },
  {
    id: 'encapsulation',
    index: '04',
    title: '封裝與實戰驗證',
    subtitle: '@property 保護與隨堂測驗',
    targetHref: '#concepts',
    icon: ShieldCheck,
  },
];

export function HeroSection({
  activeStage,
  onSelectStage,
  onOpenDeployGuide,
}: HeroSectionProps) {
  return (
    <section id="top" className="pt-10 pb-8 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Headline & Intro */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span>AI 融入課程</span>
              <span aria-hidden="true">·</span>
              <span>Python 3 物件導向基礎</span>
              <span aria-hidden="true">·</span>
              <span>互動模擬教學</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.2] text-balance">
              看懂 Python 類別與物件：從設計藍圖到記憶體實例
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              類別（Class）就像建築藍圖，物件（Object）則是依照藍圖建造出來的實體建築。在下方實驗室中親手建立實例、呼叫方法並觀察{' '}
              <code className="px-1.5 py-0.5 text-sm bg-slate-100 text-slate-800 rounded font-mono">
                self
              </code>{' '}
              如何精準控制個別物件的狀態。
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#sandbox"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                開始互動實驗
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={onOpenDeployGuide}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                查看 GitHub 與 Netlify 步驟
              </button>
            </div>
          </div>

          {/* Right Analogy Visual Card (Single-elevation, clean SVG diagram) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200">
                <span className="font-medium text-slate-700">核心心智模型</span>
                <span className="font-mono">1 份藍圖 → N 個獨立實例</span>
              </div>

              <div className="mt-4 space-y-4">
                {/* Blueprint Box */}
                <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-800">
                      設計藍圖 · class Pet
                    </span>
                    <span className="text-xs font-mono text-blue-700">定義結構與行為</span>
                  </div>
                  <div className="mt-2 font-mono text-xs text-slate-700 leading-relaxed">
                    屬性：name, species, energy
                    <br />
                    方法：play(), feed(), speak()
                  </div>
                </div>

                {/* Directional arrows */}
                <div className="flex items-center justify-around text-xs text-slate-500 font-mono">
                  <span>↓ Pet("麻糬")</span>
                  <span>↓ Pet("可樂")</span>
                </div>

                {/* Two Independent Instance Boxes */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="text-xs font-mono font-semibold text-emerald-700">
                      pet_1 (0x104a)
                    </div>
                    <div className="mt-1.5 text-xs font-mono text-slate-700 space-y-0.5 tabular-nums">
                      <div>name = "麻糬"</div>
                      <div>energy = 75</div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="text-xs font-mono font-semibold text-emerald-700">
                      pet_2 (0x208f)
                    </div>
                    <div className="mt-1.5 text-xs font-mono text-slate-700 space-y-0.5 tabular-nums">
                      <div>name = "可樂"</div>
                      <div>energy = 90</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column interactive stage strip */}
        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STAGE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeStage === item.id;
            return (
              <a
                key={item.id}
                href={item.targetHref}
                onClick={() => onSelectStage(item.id)}
                className={`group flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/50 text-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div
                  className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-slate-500 tabular-nums">
                    步驟 {item.index}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.subtitle}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
