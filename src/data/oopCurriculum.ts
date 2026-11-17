import { ClassTemplate, ClassTemplateId, CodePartKey, QuizQuestion } from '../types/oop';

export const CODE_PART_META: Record<
  CodePartKey,
  { title: string; summary: string; badgeText: string }
> = {
  class_def: {
    title: 'class 類別定義與類別屬性',
    summary:
      'class 關鍵字用來宣告一份「設計藍圖」。類別名稱依照 PEP 8 規範採用大駝峰命名 (PascalCase)，寫在 __init__ 之外的變數則是所有物件共享的類別屬性。',
    badgeText: '藍圖外框',
  },
  init: {
    title: '__init__ 建構子方法',
    summary:
      '當我們呼叫 ClassName(...) 建立新物件時，Python 會自動執行 __init__，將傳入的初始資料寫入該物件專屬的記憶體空間。',
    badgeText: '初始化起點',
  },
  self: {
    title: 'self 指向實體本身',
    summary:
      'self 代表「正在被建立或被呼叫的那一個物件」。透過 self，Python 才能分辨目前要修改的是 pet_1 還是 pet_2 的資料。',
    badgeText: '實體指標',
  },
  attribute: {
    title: 'self.屬性（實體屬性）',
    summary:
      '綁定在 self 上的變數稱為實體屬性 (Instance Attribute)。每個物件都擁有一份獨立拷貝，彼此修改互不干擾。',
    badgeText: '物件狀態',
  },
  method: {
    title: '方法 (Method)',
    summary:
      '定義在類別內的函式稱為方法，描述物件能執行的「行為」。第一個參數固定為 self，讓方法能讀取並更新該物件的屬性。',
    badgeText: '物件行為',
  },
};

export const CLASS_TEMPLATES: Record<ClassTemplateId, ClassTemplate> = {
  pet: {
    id: 'pet',
    className: 'Pet',
    title: 'Pet 虛擬寵物類別',
    subtitle: '適合初學者理解屬性隔離與狀態變化',
    classAttributeName: 'kingdom',
    classAttributeValue: '"動物界"',
    defaultPrimaryLabel: '寵物名稱 (name)',
    defaultPrimaryPlaceholder: '例如：麻糬',
    defaultSecondaryLabel: '物種 (species)',
    defaultSecondaryOptions: ['柴犬', '三花貓', '文鳥', '垂耳兔'],
    sliderLabel: '初始體力 (energy)',
    sliderUnit: '/ 100',
    sliderMin: 20,
    sliderMax: 100,
    sliderDefault: 75,
    blueprintLines: [
      {
        lineNumber: 1,
        code: 'class Pet:',
        part: 'class_def',
        annotation: '定義名為 Pet 的類別藍圖（PascalCase 命名）。',
      },
      {
        lineNumber: 2,
        code: '    kingdom = "動物界"',
        part: 'class_def',
        annotation: '類別屬性：所有透過 Pet 建立的物件共享這項資料。',
      },
      {
        lineNumber: 3,
        code: '    def __init__(self, name, species, energy=75):',
        part: 'init',
        annotation: '建構子：建立物件時自動執行，接收 name、species 與 energy。',
      },
      {
        lineNumber: 4,
        code: '        self.name = name',
        part: 'attribute',
        annotation: '將傳入的 name 存入當前物件 (self) 的專屬屬性中。',
      },
      {
        lineNumber: 5,
        code: '        self.species = species',
        part: 'attribute',
        annotation: '記錄這個物件專屬的物種，不影響其他 Pet 物件。',
      },
      {
        lineNumber: 6,
        code: '        self.energy = energy',
        part: 'self',
        annotation: '透過 self 綁定各自獨立的體力數值。',
      },
      {
        lineNumber: 7,
        code: '    def play(self):',
        part: 'method',
        annotation: '實體方法：呼叫時 Python 會自動把該物件傳入 self。',
      },
      {
        lineNumber: 8,
        code: '        self.energy = max(0, self.energy - 15)',
        part: 'method',
        annotation: '玩耍會消耗該物件 15 點體力，最低維持在 0。',
      },
      {
        lineNumber: 9,
        code: '    def feed(self):',
        part: 'method',
        annotation: '實體方法：補充該物件的體力狀態。',
      },
      {
        lineNumber: 10,
        code: '        self.energy = min(100, self.energy + 20)',
        part: 'method',
        annotation: '餵食會增加 20 點體力，上限為 100。',
      },
    ],
    methods: [
      {
        id: 'play',
        name: 'play()',
        signature: '.play()',
        description: '消耗 15 點體力進行互動遊戲',
        effectLabel: '體力 -15',
      },
      {
        id: 'feed',
        name: 'feed()',
        signature: '.feed()',
        description: '補充 20 點體力並恢復精神',
        effectLabel: '體力 +20',
      },
      {
        id: 'speak',
        name: 'speak()',
        signature: '.speak()',
        description: '印出該寵物的自我介紹訊息',
        effectLabel: '印出狀態',
      },
    ],
  },
  account: {
    id: 'account',
    className: 'BankAccount',
    title: 'BankAccount 銀行帳戶',
    subtitle: '體驗資料封裝與餘額邊界保護邏輯',
    classAttributeName: 'bank_name',
    classAttributeValue: '"PyBank"',
    defaultPrimaryLabel: '開戶人姓名 (owner)',
    defaultPrimaryPlaceholder: '例如：王小明',
    defaultSecondaryLabel: '帳戶類型 (tier)',
    defaultSecondaryOptions: ['活期儲蓄', '薪資轉帳', '數位帳戶', '外幣帳戶'],
    sliderLabel: '初始存款 (balance)',
    sliderUnit: '元',
    sliderMin: 500,
    sliderMax: 5000,
    sliderDefault: 2000,
    blueprintLines: [
      {
        lineNumber: 1,
        code: 'class BankAccount:',
        part: 'class_def',
        annotation: '建立銀行帳戶設計圖，用來產生多個獨立的個人帳戶。',
      },
      {
        lineNumber: 2,
        code: '    bank_name = "PyBank"',
        part: 'class_def',
        annotation: '類別屬性：所有帳戶皆屬於同一間銀行 PyBank。',
      },
      {
        lineNumber: 3,
        code: '    def __init__(self, owner, tier, balance=2000):',
        part: 'init',
        annotation: '開戶時初始化戶名、帳戶等級與起始存款。',
      },
      {
        lineNumber: 4,
        code: '        self.owner = owner',
        part: 'attribute',
        annotation: '儲存這張帳戶實例的專屬開戶人名稱。',
      },
      {
        lineNumber: 5,
        code: '        self.tier = tier',
        part: 'attribute',
        annotation: '儲存帳戶類型，各實例可自由設定不同類型。',
      },
      {
        lineNumber: 6,
        code: '        self.balance = balance',
        part: 'self',
        annotation: '透過 self.balance 獨立保存此帳戶的餘額。',
      },
      {
        lineNumber: 7,
        code: '    def deposit(self, amount):',
        part: 'method',
        annotation: '存款方法：接收金額並更新該帳戶的 balance。',
      },
      {
        lineNumber: 8,
        code: '        self.balance += amount',
        part: 'method',
        annotation: '累加當前物件的餘額，不會動到別人的帳戶。',
      },
      {
        lineNumber: 9,
        code: '    def withdraw(self, amount):',
        part: 'method',
        annotation: '提款方法：先檢查餘額是否足夠再進行扣款。',
      },
      {
        lineNumber: 10,
        code: '        if self.balance >= amount: self.balance -= amount',
        part: 'method',
        annotation: '保護機制：避免餘額變成負數，展現方法邏輯價值。',
      },
    ],
    methods: [
      {
        id: 'deposit',
        name: 'deposit(500)',
        signature: '.deposit(500)',
        description: '存入 500 元到目前帳戶',
        effectLabel: '餘額 +500',
      },
      {
        id: 'withdraw',
        name: 'withdraw(800)',
        signature: '.withdraw(800)',
        description: '嘗試提領 800 元（餘額不足會攔截）',
        effectLabel: '餘額 -800',
      },
      {
        id: 'summary',
        name: 'summary()',
        signature: '.summary()',
        description: '查詢目前帳戶餘額明細',
        effectLabel: '印出餘額',
      },
    ],
  },
  hero: {
    id: 'hero',
    className: 'Hero',
    title: 'Hero 冒險角色',
    subtitle: '以遊戲角色理解屬性數值與方法互動',
    classAttributeName: 'world',
    classAttributeValue: '"艾爾登領域"',
    defaultPrimaryLabel: '角色名稱 (name)',
    defaultPrimaryPlaceholder: '例如：亞瑟',
    defaultSecondaryLabel: '職業 (role)',
    defaultSecondaryOptions: ['劍士', '法師', '遊俠', '鍊金術師'],
    sliderLabel: '初始生命值 (hp)',
    sliderUnit: '/ 120',
    sliderMin: 40,
    sliderMax: 120,
    sliderDefault: 100,
    blueprintLines: [
      {
        lineNumber: 1,
        code: 'class Hero:',
        part: 'class_def',
        annotation: '定義冒險者角色的通用藍圖。',
      },
      {
        lineNumber: 2,
        code: '    world = "艾爾登領域"',
        part: 'class_def',
        annotation: '類別屬性：所有英雄都處於同一個世界觀設定。',
      },
      {
        lineNumber: 3,
        code: '    def __init__(self, name, role, hp=100):',
        part: 'init',
        annotation: '建立角色時設定名稱、職業與初始生命值。',
      },
      {
        lineNumber: 4,
        code: '        self.name = name',
        part: 'attribute',
        annotation: '每個 Hero 物件都有自己獨立的名稱。',
      },
      {
        lineNumber: 5,
        code: '        self.role = role',
        part: 'attribute',
        annotation: '設定該角色的專屬職業屬性。',
      },
      {
        lineNumber: 6,
        code: '        self.hp = hp',
        part: 'self',
        annotation: '使用 self.hp 讓受傷與治療只作用於特定角色。',
      },
      {
        lineNumber: 7,
        code: '    def train(self):',
        part: 'method',
        annotation: '訓練方法：消耗些許體力但累積動作次數。',
      },
      {
        lineNumber: 8,
        code: '        self.hp = max(0, self.hp - 20)',
        part: 'method',
        annotation: '模擬戰鬥損耗 20 點生命值。',
      },
      {
        lineNumber: 9,
        code: '    def heal(self):',
        part: 'method',
        annotation: '治癒方法：恢復該物件的生命值。',
      },
      {
        lineNumber: 10,
        code: '        self.hp = min(120, self.hp + 25)',
        part: 'method',
        annotation: '回復 25 點生命值，上限為 120。',
      },
    ],
    methods: [
      {
        id: 'train',
        name: 'train()',
        signature: '.train()',
        description: '進行實戰訓練，生命值減少 20',
        effectLabel: 'HP -20',
      },
      {
        id: 'heal',
        name: 'heal()',
        signature: '.heal()',
        description: '使用回復藥水，生命值增加 25',
        effectLabel: 'HP +25',
      },
      {
        id: 'status',
        name: 'status()',
        signature: '.status()',
        description: '輸出角色完整屬性狀態',
        effectLabel: '印出狀態',
      },
    ],
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: '類別與物件的本質',
    prompt: '在 Python 物件導向設計中，下列哪一項敘述最正確地說明了「類別 (Class)」與「物件 (Object)」的關係？',
    codeSnippet: `class Student:\n    def __init__(self, name):\n        self.name = name\n\ns1 = Student("小華")\ns2 = Student("阿明")`,
    options: [
      { id: 'a', label: 'Student 是物件，而 s1 與 s2 是不同的類別' },
      { id: 'b', label: 'Student 是設計藍圖（類別），s1 與 s2 是依照該藍圖建立的兩個獨立物件' },
      { id: 'c', label: '修改 s1.name 時，s2.name 也會同時被覆蓋成相同的值' },
      { id: 'd', label: '建立 s2 時會自動覆寫並刪除原本的 s1 記憶體空間' },
    ],
    correctOptionId: 'b',
    hint: '回想沙盒實驗：我們先定義 class Pet，再建立 pet_1 與 pet_2 兩個獨立實例。',
    explanation:
      'Class（類別）是藍圖或模板；Object（物件/實例）是透過呼叫類別所產生的實體。s1 與 s2 各自擁有獨立的記憶體位址與 self.name 資料。',
  },
  {
    id: 'q2',
    topic: '__init__ 與 self 參數',
    prompt: '觀察下方程式碼，為何呼叫 dog.bark() 時不需要手動傳入參數，但定義方法時卻要寫 def bark(self):？',
    codeSnippet: `class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f"{self.name} 汪汪叫！"\n\ndog = Dog("黑輪")\nprint(dog.bark())`,
    options: [
      { id: 'a', label: 'Python 在呼叫 dog.bark() 時，會自動將 dog 作為第一個參數傳入 self' },
      { id: 'b', label: 'self 只是裝飾用的註解文字，完全刪掉也不會出錯' },
      { id: 'c', label: 'self 代表整個 Dog 類別本身，而不是 dog 這個物件' },
      { id: 'd', label: '因為 Dog 裡面只有一個屬性，所以可以省略傳參' },
    ],
    correctOptionId: 'a',
    hint: 'dog.bark() 在底層等價於 Dog.bark(dog)。',
    explanation:
      '當你寫 dog.bark() 時，Python 會自動把呼叫者 dog 綁定到方法的第一個參數 self，讓函式內部知道要讀取哪一個物件的 self.name。若省略 self 會引發 TypeError。',
  },
  {
    id: 'q3',
    topic: '類別屬性 vs 實體屬性',
    prompt: '執行下方程式後，最後兩行 print() 會輸出什麼結果？',
    codeSnippet: `class Book:\n    library = "市立圖書館"\n    def __init__(self, title):\n        self.title = title\n\nb1 = Book("Python 入門")\nb2 = Book("資料結構")\nBook.library = "國家圖書館"\nb1.title = "演算法圖鑑"\n\nprint(b2.library)\nprint(b2.title)`,
    options: [
      { id: 'a', label: '市立圖書館 / 演算法圖鑑' },
      { id: 'b', label: '國家圖書館 / 演算法圖鑑' },
      { id: 'c', label: '國家圖書館 / 資料結構' },
      { id: 'd', label: '市立圖書館 / 資料結構' },
    ],
    correctOptionId: 'c',
    hint: 'library 屬於類別屬性（共享），title 則是綁定在 self 上的實體屬性（獨立）。',
    explanation:
      'Book.library 是類別屬性，修改它會讓未覆寫該屬性的所有實例（包含 b2）看到新值「國家圖書館」；而 b1.title 是實體屬性，修改它只影響 b1，因此 b2.title 仍為「資料結構」。',
  },
  {
    id: 'q4',
    topic: '繼承與 super()',
    prompt: '在子類別 ElectricCar 繼承 Car 時，若想保留父類別的 brand 初始化邏輯並新增 battery 屬性，缺漏的程式碼應該填什麼？',
    codeSnippet: `class Car:\n    def __init__(self, brand):\n        self.brand = brand\n\nclass ElectricCar(Car):\n    def __init__(self, brand, battery):\n        # _____(1)_____\n        self.battery = battery`,
    options: [
      { id: 'a', label: 'Car.battery = battery' },
      { id: 'b', label: 'super().__init__(brand)' },
      { id: 'c', label: 'self.__init__(Car, brand)' },
      { id: 'd', label: 'return Car(brand)' },
    ],
    correctOptionId: 'b',
    hint: 'Python 使用內建函式 super() 取得父類別的代理物件來呼叫父類別方法。',
    explanation:
      'super().__init__(brand) 會呼叫父類別 Car 的建構子，完成 self.brand = brand 的初始化，避免重複撰寫相同邏輯。',
  },
  {
    id: 'q5',
    topic: '方法實戰與回傳值',
    prompt: '執行下方程式碼後，最終輸出的數字是多少？',
    codeSnippet: `class Counter:\n    def __init__(self, start=0):\n        self.value = start\n\n    def add(self, step):\n        self.value += step\n        return self.value\n\nc1 = Counter(10)\nc2 = Counter(5)\nc1.add(3)\nresult = c2.add(c1.value)\nprint(result)`,
    options: [
      { id: 'a', label: '13' },
      { id: 'b', label: '15' },
      { id: 'c', label: '18' },
      { id: 'd', label: '8' },
    ],
    correctOptionId: 'c',
    hint: '先算出 c1.add(3) 之後 c1.value 的值，再代入 c2.add(...)。',
    explanation:
      'c1 初始 value 為 10，執行 c1.add(3) 後 c1.value 變成 13。接著執行 c2.add(13)，c2 的 value 從 5 加上 13，回傳並印出 18。',
  },
];
