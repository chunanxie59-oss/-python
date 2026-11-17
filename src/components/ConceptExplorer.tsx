import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Play, RotateCcw } from 'lucide-react';

type ConceptTab = 'self_trace' | 'attr_scope' | 'inheritance' | 'encapsulation';

interface InheritanceNode {
  id: 'animal' | 'dog' | 'cat' | 'owl';
  className: string;
  parent: string | null;
  sound: string;
  extraMethod: string;
  code: string;
}

const INHERITANCE_NODES: Record<InheritanceNode['id'], InheritanceNode> = {
  animal: {
    id: 'animal',
    className: 'Animal（父類別）',
    parent: null,
    sound: '"（發出動物聲音）"',
    extraMethod: 'sleep(self) → 進入休息狀態',
    code: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f"{self.name} 發出聲音"`,
  },
  dog: {
    id: 'dog',
    className: 'Dog(Animal)',
    parent: 'Animal',
    sound: '"汪汪！"',
    extraMethod: 'fetch(self) → 撿回飛盤',
    code: `class Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\n    def speak(self):\n        return f"{self.name}：汪汪！"`,
  },
  cat: {
    id: 'cat',
    className: 'Cat(Animal)',
    parent: 'Animal',
    sound: '"喵嗚～"',
    extraMethod: 'purr(self) → 呼嚕撒嬌',
    code: `class Cat(Animal):\n    def __init__(self, name, color):\n        super().__init__(name)\n        self.color = color\n\n    def speak(self):\n        return f"{self.name}：喵嗚～"`,
  },
  owl: {
    id: 'owl',
    className: 'Owl(Animal)',
    parent: 'Animal',
    sound: '"咕咕！"',
    extraMethod: 'night_watch(self) → 夜間巡邏',
    code: `class Owl(Animal):\n    def speak(self):\n        return f"{self.name}：咕咕！"`,
  },
};

export function ConceptExplorer() {
  const [activeTab, setActiveTab] = useState<ConceptTab>('self_trace');

  // Tab 1: self trace
  const [traceTarget, setTraceTarget] = useState<'pet_1' | 'pet_2'>('pet_1');
  const [pet1Score, setPet1Score] = useState(10);
  const [pet2Score, setPet2Score] = useState(20);

  // Tab 2: class vs instance attribute
  const [classSchool, setClassSchool] = useState('北一資優班');
  const [s1OverrideSchool, setS1OverrideSchool] = useState<string | null>(null);

  // Tab 3: inheritance & polymorphism
  const [selectedNode, setSelectedNode] = useState<InheritanceNode['id']>('dog');
  const [polyOutputs, setPolyOutputs] = useState<string[]>([]);

  // Tab 4: encapsulation @property
  const [walletBalance, setWalletBalance] = useState(1000);
  const [walletFeedback, setWalletFeedback] = useState<{
    ok: boolean;
    title: string;
    detail: string;
  }>({
    ok: true,
    title: '初始狀態正常',
    detail: '目前 _balance 透過 @property 安全讀寫，數值為 1000。',
  });

  const handleRunSelfTrace = (target: 'pet_1' | 'pet_2') => {
    setTraceTarget(target);
    if (target === 'pet_1') {
      setPet1Score((v) => v + 5);
    } else {
      setPet2Score((v) => v + 5);
    }
  };

  const handleRunPolymorphism = () => {
    setPolyOutputs([
      'dog.speak() → "黑輪：汪汪！"',
      'cat.speak() → "橘子：喵嗚～"',
      'owl.speak() → "小智：咕咕！"',
    ]);
  };

  const handleTestBalanceSetter = (nextValue: number) => {
    if (nextValue < 0) {
      setWalletFeedback({
        ok: false,
        title: 'ValueError 已攔截不合法寫入',
        detail: `嘗試設定 account.balance = ${nextValue} 被 @balance.setter 阻擋，原餘額安全維持在 ${walletBalance} 元。`,
      });
      return;
    }
    setWalletBalance(nextValue);
    setWalletFeedback({
      ok: true,
      title: '合法更新完成',
      detail: `通過 @balance.setter 驗證條件 (value >= 0)，_balance 已更新為 ${nextValue} 元。`,
    });
  };

  return (
    <section id="concepts" className="py-12 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-medium text-slate-500">
              進階核心機制 · 漸進式互動解析
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              02. 深入理解四大物件導向機制
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="物件導向核心概念切換"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200"
          >
            {[
              { id: 'self_trace', label: 'self 綁定追蹤' },
              { id: 'attr_scope', label: '類別與實體屬性' },
              { id: 'inheritance', label: '繼承與多型' },
              { id: 'encapsulation', label: '封裝與 @property' },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ConceptTab)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: self Binding Trace */}
        {activeTab === 'self_trace' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                為什麼每個方法都要寫第一個參數 self？
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                在記憶體中，所有物件共用同一份類別方法程式碼。當你寫{' '}
                <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">
                  pet_1.add_score()
                </code>{' '}
                時，Python 會在底層自動改寫成{' '}
                <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">
                  Pet.add_score(pet_1)
                </code>
                ，把物件位址傳給 <code className="font-mono">self</code>。
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleRunSelfTrace('pet_1')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  執行 pet_1.add_score()
                </button>
                <button
                  type="button"
                  onClick={() => handleRunSelfTrace('pet_2')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  執行 pet_2.add_score()
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-4">
              <div className="rounded-lg bg-slate-900 text-slate-100 p-4 font-mono text-xs sm:text-sm">
                <div className="text-slate-400">
                  # Python 直譯器實際呼叫轉換：
                </div>
                <div className="mt-1 text-emerald-300">
                  {traceTarget}.add_score() &nbsp;≡&nbsp; Pet.add_score(self={traceTarget})
                </div>
                <div className="mt-2 text-slate-300">
                  → 執行 self.score += 5（寫入 {traceTarget} 的記憶體）
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`rounded-xl border p-4 bg-white transition-all ${
                    traceTarget === 'pet_1'
                      ? 'border-blue-600 ring-2 ring-blue-600/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900">pet_1</span>
                    <span className="text-slate-500">
                      {traceTarget === 'pet_1' ? '目前 self 指向此處' : '待命中'}
                    </span>
                  </div>
                  <div className="mt-3 text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    score = {pet1Score}
                  </div>
                </div>

                <div
                  className={`rounded-xl border p-4 bg-white transition-all ${
                    traceTarget === 'pet_2'
                      ? 'border-blue-600 ring-2 ring-blue-600/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900">pet_2</span>
                    <span className="text-slate-500">
                      {traceTarget === 'pet_2' ? '目前 self 指向此處' : '待命中'}
                    </span>
                  </div>
                  <div className="mt-3 text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    score = {pet2Score}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Class vs Instance Attributes */}
        {activeTab === 'attr_scope' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                屬性查找順序：先找物件自己，找不到才找類別
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                在 Python 中讀取 <code className="font-mono">s1.school</code> 時，直譯器會先檢查{' '}
                <code className="font-mono">s1.__dict__</code>；若找不到，才會往上尋找{' '}
                <code className="font-mono">Student.school</code>。一旦直接對實例賦值，就會在該物件產生「遮蔽 (Shadowing)」效果。
              </p>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setClassSchool((prev) =>
                      prev === '北一資優班' ? '科學實驗班' : '北一資優班'
                    )
                  }
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                >
                  1. 切換類別屬性 Student.school（目前：{classSchool}）
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setS1OverrideSchool((prev) => (prev ? null : '跨校交換生'))
                  }
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  2.{' '}
                  {s1OverrideSchool
                    ? '移除 s1.school 實體覆寫（恢復繼承類別值）'
                    : '只為 s1 設定實體屬性 s1.school = "跨校交換生"'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-4">
                <div className="text-xs font-mono text-blue-800 font-semibold">
                  class Student · 類別層級命名空間
                </div>
                <div className="mt-1 font-mono text-sm text-slate-900">
                  Student.school = "{classSchool}"
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-mono font-bold text-slate-900">
                    實例 s1
                  </div>
                  <div className="mt-2 text-xs font-mono text-slate-600">
                    s1.__dict__：{' '}
                    {s1OverrideSchool
                      ? `{ "name": "小華", "school": "${s1OverrideSchool}" }`
                      : `{ "name": "小華" }`}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 font-mono text-sm">
                    s1.school →{' '}
                    <span className="font-bold text-emerald-700">
                      "{s1OverrideSchool ?? classSchool}"
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    來源：{s1OverrideSchool ? 's1 自身實體屬性（遮蔽類別）' : '往上查找 Student 類別'}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-mono font-bold text-slate-900">
                    實例 s2
                  </div>
                  <div className="mt-2 text-xs font-mono text-slate-600">
                    s2.__dict__：{'{ "name": "阿明" }'}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 font-mono text-sm">
                    s2.school →{' '}
                    <span className="font-bold text-blue-700">"{classSchool}"</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    來源：未覆寫，直接共用 Student.school
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Inheritance & Polymorphism */}
        {activeTab === 'inheritance' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {(['animal', 'dog', 'cat', 'owl'] as InheritanceNode['id'][]).map(
                  (id) => {
                    const node = INHERITANCE_NODES[id];
                    const active = selectedNode === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelectedNode(id)}
                        className={`px-3.5 py-2 text-xs font-mono font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {node.className}
                      </button>
                    );
                  }
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="leading-relaxed">{INHERITANCE_NODES[selectedNode].code}</pre>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm space-y-1.5">
                <div className="font-semibold text-slate-900">
                  {INHERITANCE_NODES[selectedNode].className} 繼承結構摘要
                </div>
                <div className="text-xs text-slate-600">
                  繼承來源：{INHERITANCE_NODES[selectedNode].parent ?? '無（基底父類別）'}
                </div>
                <div className="text-xs font-mono text-slate-700">
                  speak() 回傳：{INHERITANCE_NODES[selectedNode].sound}
                </div>
                <div className="text-xs font-mono text-slate-700">
                  專屬擴充：{INHERITANCE_NODES[selectedNode].extraMethod}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    多型 (Polymorphism) 實戰示範
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    不同子類別物件呼叫相同的 .speak() 接口，會自動執行各自覆寫的版本
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRunPolymorphism}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  執行多型迴圈
                </button>
              </div>

              <div className="rounded-lg bg-slate-900 text-slate-200 p-4 font-mono text-xs leading-relaxed">
                <div>pets = [Dog("黑輪", "柴犬"), Cat("橘子", "橘色"), Owl("小智")]</div>
                <div className="text-blue-300 mt-1">
                  for animal in pets:
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;print(animal.speak())
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 min-h-[112px]">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  輸出結果：
                </div>
                {polyOutputs.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    點擊右上角「執行多型迴圈」查看三個子類別的執行輸出。
                  </p>
                ) : (
                  <ul className="space-y-1.5 font-mono text-xs text-emerald-700">
                    {polyOutputs.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Encapsulation & @property */}
        {activeTab === 'encapsulation' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-5 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="leading-relaxed">{`class SafeWallet:
    def __init__(self, balance=1000):
        self._balance = balance  # 受保護的內部屬性

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("餘額不可為負數")
        self._balance = value`}</pre>
            </div>

            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    測試 @balance.setter 防護閘門
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    直接賦值 wallet.balance = ... 會觸發驗證規則
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTestBalanceSetter(1000)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                  重設
                </button>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-600">
                  wallet._balance 目前數值
                </span>
                <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {walletBalance} 元
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleTestBalanceSetter(walletBalance + 500)}
                  className="px-3 py-2 text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  wallet.balance += 500
                </button>
                <button
                  type="button"
                  onClick={() => handleTestBalanceSetter(0)}
                  className="px-3 py-2 text-xs font-mono font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  wallet.balance = 0
                </button>
                <button
                  type="button"
                  onClick={() => handleTestBalanceSetter(-300)}
                  className="px-3 py-2 text-xs font-mono font-semibold text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
                >
                  wallet.balance = -300
                </button>
              </div>

              {/* Dual-coded status card (icon + explicit text label) */}
              <div
                className={`rounded-lg border p-4 flex items-start gap-3 ${
                  walletFeedback.ok
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                    : 'border-red-200 bg-red-50/70 text-red-900'
                }`}
              >
                {walletFeedback.ok ? (
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertTriangle
                    className="w-5 h-5 text-red-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <div className="text-sm font-semibold">{walletFeedback.title}</div>
                  <div className="text-xs mt-1 leading-relaxed">
                    {walletFeedback.detail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
