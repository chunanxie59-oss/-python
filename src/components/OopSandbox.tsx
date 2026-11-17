import { useMemo, useState } from 'react';
import {
  Check,
  Copy,
  Play,
  Plus,
  RotateCcw,
  Terminal,
  Trash2,
} from 'lucide-react';
import { CLASS_TEMPLATES, CODE_PART_META } from '../data/oopCurriculum';
import {
  ClassTemplateId,
  CodePartKey,
  ConsoleEntry,
  ObjectInstance,
} from '../types/oop';

function createInitialInstances(templateId: ClassTemplateId): ObjectInstance[] {
  if (templateId === 'pet') {
    return [
      {
        id: 'inst-1',
        varName: 'pet_1',
        memoryAddress: '0x104a8f',
        templateId: 'pet',
        primaryValue: '麻糬',
        secondaryValue: '柴犬',
        numericValue: 80,
        maxNumericValue: 100,
        actionCount: 0,
        statusText: '已透過 Pet.__init__ 初始化',
        createdAtIndex: 1,
      },
      {
        id: 'inst-2',
        varName: 'pet_2',
        memoryAddress: '0x208c1b',
        templateId: 'pet',
        primaryValue: '可樂',
        secondaryValue: '三花貓',
        numericValue: 55,
        maxNumericValue: 100,
        actionCount: 0,
        statusText: '已透過 Pet.__init__ 初始化',
        createdAtIndex: 2,
      },
    ];
  }
  if (templateId === 'account') {
    return [
      {
        id: 'inst-1',
        varName: 'acc_1',
        memoryAddress: '0x312f04',
        templateId: 'account',
        primaryValue: '王小明',
        secondaryValue: '活期儲蓄',
        numericValue: 2500,
        maxNumericValue: 5000,
        actionCount: 0,
        statusText: '已透過 BankAccount.__init__ 開戶',
        createdAtIndex: 1,
      },
      {
        id: 'inst-2',
        varName: 'acc_2',
        memoryAddress: '0x498e72',
        templateId: 'account',
        primaryValue: '林美玲',
        secondaryValue: '數位帳戶',
        numericValue: 1200,
        maxNumericValue: 5000,
        actionCount: 0,
        statusText: '已透過 BankAccount.__init__ 開戶',
        createdAtIndex: 2,
      },
    ];
  }
  return [
    {
      id: 'inst-1',
      varName: 'hero_1',
      memoryAddress: '0x5a0d12',
      templateId: 'hero',
      primaryValue: '亞瑟',
      secondaryValue: '劍士',
      numericValue: 100,
      maxNumericValue: 120,
      actionCount: 0,
      statusText: '已透過 Hero.__init__ 建立角色',
      createdAtIndex: 1,
    },
    {
      id: 'inst-2',
      varName: 'hero_2',
      memoryAddress: '0x6b3c90',
      templateId: 'hero',
      primaryValue: '莉亞',
      secondaryValue: '法師',
      numericValue: 85,
      maxNumericValue: 120,
      actionCount: 0,
      statusText: '已透過 Hero.__init__ 建立角色',
      createdAtIndex: 2,
    },
  ];
}

function createInitialLogs(templateId: ClassTemplateId): ConsoleEntry[] {
  if (templateId === 'pet') {
    return [
      {
        id: 'log-1',
        code: 'pet_1 = Pet("麻糬", "柴犬", 80)',
        output: '建立實例 pet_1 @ 0x104a8f (name="麻糬", energy=80)',
        kind: 'instantiate',
      },
      {
        id: 'log-2',
        code: 'pet_2 = Pet("可樂", "三花貓", 55)',
        output: '建立實例 pet_2 @ 0x208c1b (name="可樂", energy=55)',
        kind: 'instantiate',
      },
    ];
  }
  if (templateId === 'account') {
    return [
      {
        id: 'log-1',
        code: 'acc_1 = BankAccount("王小明", "活期儲蓄", 2500)',
        output: '建立實例 acc_1 @ 0x312f04 (owner="王小明", balance=2500)',
        kind: 'instantiate',
      },
      {
        id: 'log-2',
        code: 'acc_2 = BankAccount("林美玲", "數位帳戶", 1200)',
        output: '建立實例 acc_2 @ 0x498e72 (owner="林美玲", balance=1200)',
        kind: 'instantiate',
      },
    ];
  }
  return [
    {
      id: 'log-1',
      code: 'hero_1 = Hero("亞瑟", "劍士", 100)',
      output: '建立實例 hero_1 @ 0x5a0d12 (name="亞瑟", hp=100)',
      kind: 'instantiate',
    },
    {
      id: 'log-2',
      code: 'hero_2 = Hero("莉亞", "法師", 85)',
      output: '建立實例 hero_2 @ 0x6b3c90 (name="莉亞", hp=85)',
      kind: 'instantiate',
    },
  ];
}

function generateMemoryHex(seed: number): string {
  const num = (0x100000 + seed * 114731) % 0xffffff;
  return `0x${num.toString(16).padStart(6, '0')}`;
}

export function OopSandbox() {
  const [templateId, setTemplateId] = useState<ClassTemplateId>('pet');
  const template = CLASS_TEMPLATES[templateId];

  const [selectedPart, setSelectedPart] = useState<CodePartKey>('init');
  const [instances, setInstances] = useState<ObjectInstance[]>(() =>
    createInitialInstances('pet')
  );
  const [logs, setLogs] = useState<ConsoleEntry[]>(() => createInitialLogs('pet'));
  const [lastActiveInstanceId, setLastActiveInstanceId] = useState<string | null>(null);
  const [sharedAttrOverride, setSharedAttrOverride] = useState<string | null>(null);

  // Factory form state
  const [nextIndex, setNextIndex] = useState(3);
  const [primaryInput, setPrimaryInput] = useState('');
  const [secondaryInput, setSecondaryInput] = useState(
    CLASS_TEMPLATES.pet.defaultSecondaryOptions[0]
  );
  const [numericInput, setNumericInput] = useState(CLASS_TEMPLATES.pet.sliderDefault);
  const [copiedScript, setCopiedScript] = useState(false);

  const varPrefix =
    templateId === 'pet' ? 'pet' : templateId === 'account' ? 'acc' : 'hero';
  const suggestedVarName = `${varPrefix}_${nextIndex}`;
  const activeClassAttrValue = sharedAttrOverride ?? template.classAttributeValue;

  const handleTemplateSwitch = (nextId: ClassTemplateId) => {
    const nextTpl = CLASS_TEMPLATES[nextId];
    setTemplateId(nextId);
    setInstances(createInitialInstances(nextId));
    setLogs(createInitialLogs(nextId));
    setNextIndex(3);
    setPrimaryInput('');
    setSecondaryInput(nextTpl.defaultSecondaryOptions[0]);
    setNumericInput(nextTpl.sliderDefault);
    setSelectedPart('init');
    setLastActiveInstanceId(null);
    setSharedAttrOverride(null);
  };

  const handleResetSandbox = () => {
    handleTemplateSwitch(templateId);
  };

  const handleInstantiate = (e: React.FormEvent) => {
    e.preventDefault();
    if (instances.length >= 6) {
      setLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          code: `# 實例池上限檢查`,
          output: '記憶體實例池最多同時顯示 6 個物件，請先移除部分物件再建立新實例。',
          kind: 'error',
        },
        ...prev.slice(0, 9),
      ]);
      return;
    }

    const cleanPrimary =
      primaryInput.trim() ||
      (templateId === 'pet'
        ? `夥伴${nextIndex}`
        : templateId === 'account'
          ? `用戶${nextIndex}`
          : `勇者${nextIndex}`);
    const memAddr = generateMemoryHex(nextIndex + instances.length * 7);
    const newId = `inst-${Date.now()}`;
    const varName = suggestedVarName;

    const newInstance: ObjectInstance = {
      id: newId,
      varName,
      memoryAddress: memAddr,
      templateId,
      primaryValue: cleanPrimary,
      secondaryValue: secondaryInput,
      numericValue: numericInput,
      maxNumericValue: template.sliderMax,
      actionCount: 0,
      statusText: `由 ${template.className}.__init__ 新建`,
      createdAtIndex: nextIndex,
    };

    const callCode = `${varName} = ${template.className}("${cleanPrimary}", "${secondaryInput}", ${numericInput})`;
    setInstances((prev) => [...prev, newInstance]);
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        code: callCode,
        output: `建立實例 ${varName} @ ${memAddr}（獨立記憶體配置完成）`,
        kind: 'instantiate',
      },
      ...prev.slice(0, 9),
    ]);
    setLastActiveInstanceId(newId);
    setSelectedPart('init');
    setPrimaryInput('');
    setNextIndex((n) => n + 1);
  };

  const handleCallMethod = (instanceId: string, methodId: string) => {
    const target = instances.find((item) => item.id === instanceId);
    if (!target) return;

    let nextNumeric = target.numericValue;
    let outputMsg = '';
    let codeStr = `${target.varName}.${methodId}()`;
    let kind: ConsoleEntry['kind'] = 'method';

    if (templateId === 'pet') {
      if (methodId === 'play') {
        nextNumeric = Math.max(0, target.numericValue - 15);
        outputMsg = `self 綁定至 ${target.varName} → 體力更新為 ${nextNumeric}/100`;
      } else if (methodId === 'feed') {
        nextNumeric = Math.min(100, target.numericValue + 20);
        outputMsg = `self 綁定至 ${target.varName} → 體力補充為 ${nextNumeric}/100`;
      } else {
        outputMsg = `輸出：「我是 ${target.secondaryValue} ${target.primaryValue}，目前體力 ${target.numericValue}！」`;
      }
    } else if (templateId === 'account') {
      if (methodId === 'deposit') {
        codeStr = `${target.varName}.deposit(500)`;
        nextNumeric = Math.min(target.maxNumericValue, target.numericValue + 500);
        outputMsg = `self 綁定至 ${target.varName} → 存入 500 元，餘額 ${nextNumeric} 元`;
      } else if (methodId === 'withdraw') {
        codeStr = `${target.varName}.withdraw(800)`;
        if (target.numericValue >= 800) {
          nextNumeric = target.numericValue - 800;
          outputMsg = `self 綁定至 ${target.varName} → 提領 800 元成功，餘額 ${nextNumeric} 元`;
        } else {
          kind = 'error';
          outputMsg = `攔截提示：${target.varName}.balance (${target.numericValue}元) 不足 800 元，餘額維持不變`;
        }
      } else {
        outputMsg = `帳戶明細：戶名 ${target.primaryValue} (${target.secondaryValue})，餘額 ${target.numericValue} 元`;
      }
    } else {
      if (methodId === 'train') {
        nextNumeric = Math.max(0, target.numericValue - 20);
        outputMsg = `self 綁定至 ${target.varName} → 訓練完成，HP 變為 ${nextNumeric}/120`;
      } else if (methodId === 'heal') {
        nextNumeric = Math.min(120, target.numericValue + 25);
        outputMsg = `self 綁定至 ${target.varName} → 回復完成，HP 升至 ${nextNumeric}/120`;
      } else {
        outputMsg = `角色狀態：${target.primaryValue} [${target.secondaryValue}] · HP ${target.numericValue}/120`;
      }
    }

    setInstances((prev) =>
      prev.map((item) =>
        item.id === instanceId
          ? {
              ...item,
              numericValue: nextNumeric,
              actionCount: item.actionCount + 1,
              statusText:
                kind === 'error' ? '餘額不足攔截（狀態未變動）' : `最近執行 ${codeStr}`,
            }
          : item
      )
    );
    setLastActiveInstanceId(instanceId);
    setSelectedPart('self');
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        code: codeStr,
        output: outputMsg,
        kind,
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleDeleteInstance = (instanceId: string) => {
    const target = instances.find((item) => item.id === instanceId);
    if (!target) return;
    setInstances((prev) => prev.filter((item) => item.id !== instanceId));
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        code: `del ${target.varName}`,
        output: `已釋放 ${target.varName} (${target.memoryAddress}) 的參考`,
        kind: 'info',
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleToggleClassAttr = () => {
    const nextVal =
      sharedAttrOverride === null
        ? templateId === 'pet'
          ? '"奇幻動物界"'
          : templateId === 'account'
            ? '"PyBank 國際版"'
            : '"星界領域"'
        : null;
    setSharedAttrOverride(nextVal);
    const displayVal = nextVal ?? template.classAttributeValue;
    setSelectedPart('class_def');
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        code: `${template.className}.${template.classAttributeName} = ${displayVal}`,
        output: `類別屬性已更新！所有現存 ${instances.length} 個實例立即同步看見 ${displayVal}`,
        kind: 'info',
      },
      ...prev.slice(0, 9),
    ]);
  };

  const fullPythonScript = useMemo(() => {
    const classCode = template.blueprintLines.map((l) => l.code).join('\n');
    const instanceLines = instances
      .map(
        (inst) =>
          `${inst.varName} = ${template.className}("${inst.primaryValue}", "${inst.secondaryValue}", ${inst.numericValue})`
      )
      .join('\n');
    return `${classCode}\n\n# 建立獨立實例\n${instanceLines}`;
  }, [template, instances]);

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(fullPythonScript);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const activePartMeta = CODE_PART_META[selectedPart];

  return (
    <section id="sandbox" className="py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header + Class Template Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-medium text-slate-500">
              互動沙盒 · 藍圖與記憶體即時連動
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              01. 類別藍圖與物件工廠實驗室
            </h2>
          </div>

          {/* Interactive Class Switcher (Segmented Control) */}
          <div
            role="tablist"
            aria-label="選擇 Python 類別範例"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 self-start lg:self-auto"
          >
            {(Object.keys(CLASS_TEMPLATES) as ClassTemplateId[]).map((id) => {
              const tpl = CLASS_TEMPLATES[id];
              const isSelected = templateId === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleTemplateSwitch(id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tpl.className}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Sandbox Grid: Left Stage (7 cols) / Right Control Deck (5 cols) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT STAGE: Blueprint + Live Memory Pool */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Interactive Class Blueprint */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold text-slate-900">
                    {template.title}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">
                    點擊任意程式碼行查看語法角色
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleClassAttr}
                  className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  修改類別屬性 {template.classAttributeName}
                </button>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto">
                {template.blueprintLines.map((line) => {
                  const isHighlighted = selectedPart === line.part;
                  const displayCode =
                    line.lineNumber === 2
                      ? `    ${template.classAttributeName} = ${activeClassAttrValue}`
                      : line.code;

                  return (
                    <button
                      key={line.lineNumber}
                      type="button"
                      onClick={() => setSelectedPart(line.part)}
                      className={`w-full text-left flex items-start gap-4 px-3 py-1 rounded transition-colors cursor-pointer ${
                        isHighlighted
                          ? 'bg-blue-500/20 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-5 text-right text-slate-500 select-none shrink-0 tabular-nums">
                        {line.lineNumber}
                      </span>
                      <span className="whitespace-pre">{displayCode}</span>
                    </button>
                  );
                })}
              </div>

              {/* Contextual Syntax Explanation Bar */}
              <div className="px-5 py-4 bg-blue-50/60 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-blue-900">
                    {activePartMeta.title}
                  </span>
                  <span className="text-xs font-mono text-blue-700">
                    {activePartMeta.badgeText}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                  {activePartMeta.summary}
                </p>
              </div>
            </div>

            {/* 2. Live Object Memory Pool */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    記憶體實例池（Live Objects）
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    點擊下方物件的方法按鈕，觀察只有該物件自身的狀態會改變
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-600 tabular-nums">
                  目前實例數：{instances.length} / 6
                </div>
              </div>

              {instances.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-600">
                    目前記憶體池中沒有任何 {template.className} 物件。
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    請使用右側「物件工廠」建立第一個實例。
                  </p>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {instances.map((inst) => {
                    const isFocused = lastActiveInstanceId === inst.id;
                    const percent = Math.round(
                      (inst.numericValue / inst.maxNumericValue) * 100
                    );
                    const numericAttrName =
                      templateId === 'pet'
                        ? 'energy'
                        : templateId === 'account'
                          ? 'balance'
                          : 'hp';
                    const primaryAttrName =
                      templateId === 'account' ? 'owner' : 'name';
                    const secondaryAttrName =
                      templateId === 'pet'
                        ? 'species'
                        : templateId === 'account'
                          ? 'tier'
                          : 'role';

                    return (
                      <div
                        key={inst.id}
                        className={`rounded-xl border p-4 transition-all ${
                          isFocused
                            ? 'border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-600/20'
                            : 'border-slate-200 bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-slate-900">
                                {inst.varName}
                              </span>
                              <span className="text-xs font-mono text-slate-500 tabular-nums">
                                {inst.memoryAddress}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 truncate mt-0.5">
                              {inst.statusText}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteInstance(inst.id)}
                            aria-label={`移除物件 ${inst.varName}`}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Instance Attributes */}
                        <div className="mt-3 space-y-2 text-xs font-mono">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>類別屬性 {template.classAttributeName}</span>
                            <span className="text-blue-700 font-medium">
                              {activeClassAttrValue}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-700">
                            <span>self.{primaryAttrName}</span>
                            <span className="font-semibold text-slate-900">
                              "{inst.primaryValue}"
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-700">
                            <span>self.{secondaryAttrName}</span>
                            <span className="text-slate-800">
                              "{inst.secondaryValue}"
                            </span>
                          </div>

                          {/* Numeric attribute bar */}
                          <div className="pt-1">
                            <div className="flex items-center justify-between text-slate-700 mb-1">
                              <span>self.{numericAttrName}</span>
                              <span className="font-semibold text-emerald-700 tabular-nums">
                                {inst.numericValue} {template.sliderUnit}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-600 transition-all duration-200"
                                style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Method Call Buttons */}
                        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
                          {template.methods.map((method) => (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => handleCallMethod(inst.id, method.id)}
                              title={method.description}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <Play className="w-3 h-3" aria-hidden="true" />
                              {method.signature}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT DECK: Object Factory + Live Python Console */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Object Factory Form */}
            <form
              onSubmit={handleInstantiate}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    物件工廠（實例化）
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    呼叫{' '}
                    <code className="font-mono text-slate-700">
                      {template.className}(...)
                    </code>{' '}
                    產生新物件
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetSandbox}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  重設實驗室
                </button>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label
                    htmlFor="primary-attr-input"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    {template.defaultPrimaryLabel}
                  </label>
                  <input
                    id="primary-attr-input"
                    type="text"
                    value={primaryInput}
                    onChange={(e) => setPrimaryInput(e.target.value)}
                    placeholder={template.defaultPrimaryPlaceholder}
                    className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="secondary-attr-select"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    {template.defaultSecondaryLabel}
                  </label>
                  <select
                    id="secondary-attr-select"
                    value={secondaryInput}
                    onChange={(e) => setSecondaryInput(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  >
                    {template.defaultSecondaryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label
                      htmlFor="numeric-attr-slider"
                      className="font-medium text-slate-700"
                    >
                      {template.sliderLabel}
                    </label>
                    <span className="font-mono font-semibold text-blue-700 tabular-nums">
                      {numericInput} {template.sliderUnit}
                    </span>
                  </div>
                  <input
                    id="numeric-attr-slider"
                    type="range"
                    min={template.sliderMin}
                    max={template.sliderMax}
                    step={templateId === 'account' ? 100 : 5}
                    value={numericInput}
                    onChange={(e) => setNumericInput(Number(e.target.value))}
                    className="w-full accent-blue-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 tabular-nums mt-1">
                    <span>{template.sliderMin}</span>
                    <span>
                      {Math.round((template.sliderMin + template.sliderMax) / 2)}
                    </span>
                    <span>{template.sliderMax}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="mb-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto whitespace-nowrap">
                  {suggestedVarName} = {template.className}("
                  {primaryInput.trim() || '預設名稱'}", "{secondaryInput}",{' '}
                  {numericInput})
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  建立實例 ({suggestedVarName})
                </button>
              </div>
            </form>

            {/* 2. Live Execution Console */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Terminal className="w-4 h-4 text-slate-600" aria-hidden="true" />
                  <span>Python 即時執行紀錄</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                      已複製程式
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      複製完整程式
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 max-h-72 overflow-y-auto space-y-2.5 font-mono text-xs">
                {logs.map((entry) => (
                  <div
                    key={entry.id}
                    className="pb-2.5 border-b border-slate-800 last:border-b-0 last:pb-0"
                  >
                    <div className="text-blue-300">&gt;&gt;&gt; {entry.code}</div>
                    <div
                      className={`mt-1 ${
                        entry.kind === 'error'
                          ? 'text-amber-300'
                          : entry.kind === 'instantiate'
                            ? 'text-emerald-300'
                            : 'text-slate-300'
                      }`}
                    >
                      {entry.output}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
