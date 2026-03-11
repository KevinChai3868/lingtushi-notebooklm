import { ExamplePreset, Option, PromptFormState } from "@/lib/types";

export const useCaseOptions: Option[] = [
  { value: "teaching-summary", label: "教學重點整理" },
  { value: "concept-comparison", label: "概念比較" },
  { value: "process-explanation", label: "流程說明" },
  { value: "causal-analysis", label: "因果分析" },
  { value: "timeline", label: "時間軸" },
  { value: "data-summary", label: "數據統整" },
  { value: "trend-analysis", label: "趨勢分析" },
  { value: "problem-solving", label: "問題解決" },
  { value: "project-research", label: "專題研究" },
  { value: "course-summary", label: "課程摘要" },
  { value: "admin-briefing", label: "行政簡報" },
  { value: "custom", label: "自訂用途" }
];

export const visualStyleOptions: Option[] = [
  { value: "minimal", label: "極簡清晰" },
  { value: "academic", label: "學術研究風" },
  { value: "lesson-plan", label: "教育教案風" },
  { value: "future-tech", label: "科技未來感" },
  { value: "business", label: "商務簡報風" },
  { value: "playful", label: "活潑創意風" },
  { value: "storytelling", label: "故事敘事風" },
  { value: "infographic", label: "資訊圖表風" },
  { value: "whiteboard", label: "手繪白板風" },
  { value: "poster", label: "海報視覺風" },
  { value: "custom", label: "自訂風格" }
];

export const structureOptions: Option[] = [
  { value: "flowchart", label: "流程圖" },
  { value: "comparison-table", label: "比較表" },
  { value: "tree", label: "樹狀圖" },
  { value: "mind-map", label: "心智圖" },
  { value: "timeline", label: "時間軸" },
  { value: "hierarchy", label: "階層結構" },
  { value: "steps", label: "步驟拆解" },
  { value: "cause-effect", label: "因果圖" },
  { value: "quadrant", label: "象限分析" },
  { value: "stats", label: "統計圖表" },
  { value: "cards", label: "卡片式重點整理" },
  { value: "comic-basic", label: "四格漫畫" },
  { value: "comic-scenario", label: "情境式四格漫畫" },
  { value: "comic-humor", label: "幽默型四格漫畫" },
  { value: "comic-teaching", label: "教學型四格漫畫" },
  { value: "comic-translation", label: "概念轉譯四格漫畫" },
  { value: "custom", label: "自訂形式" }
];

export const depthOptions: Option[] = [
  { value: "intro", label: "入門" },
  { value: "high-school", label: "高中程度" },
  { value: "college", label: "大學程度" },
  { value: "research", label: "專業研究" },
  { value: "admin", label: "行政簡報" },
  { value: "expert", label: "專家分析" }
];

export const toneOptions: Option[] = [
  { value: "objective", label: "客觀條理" },
  { value: "teaching", label: "教學講解" },
  { value: "brief", label: "簡報摘要" },
  { value: "problem-led", label: "問題導向" },
  { value: "story", label: "故事敘事" },
  { value: "heuristic", label: "啟發式引導" },
  { value: "contrast", label: "對比強化" },
  { value: "custom", label: "自訂語氣" }
];

export const designRequirementOptions: Option[] = [
  { value: "solid-background", label: "素色區塊背景" },
  { value: "avoid-noise", label: "避免雜色" },
  { value: "clear-text", label: "文字清晰" },
  { value: "title-hierarchy", label: "強調標題層級" },
  { value: "balanced-layout", label: "圖文平衡" },
  { value: "editable", label: "適合後續修改" },
  { value: "avoid-garbled", label: "避免亂碼" },
  { value: "highlight-focus", label: "重點高亮" }
];

export const creativeEnhancerOptions: Option[] = [
  { value: "metaphor", label: "加入隱喻" },
  { value: "life-example", label: "加入生活例子" },
  { value: "teaching-scene", label: "加入教學情境" },
  { value: "memory-hook", label: "加入記憶點" },
  { value: "cross-disciplinary", label: "加入跨領域連結" },
  { value: "humor", label: "加入幽默" },
  { value: "future-feel", label: "加入未來科技感" },
  { value: "custom", label: "自訂創意" }
];

export const labelMap: Record<string, string> = Object.fromEntries(
  [
    ...useCaseOptions,
    ...visualStyleOptions,
    ...structureOptions,
    ...depthOptions,
    ...toneOptions,
    ...designRequirementOptions,
    ...creativeEnhancerOptions
  ].map((option) => [option.value, option.label])
);

export const defaultFormState: PromptFormState = {
  useCase: "teaching-summary",
  customUseCase: "",
  visualStyle: "lesson-plan",
  customVisualStyle: "",
  structure: "cards",
  customStructure: "",
  depth: "high-school",
  tone: "teaching",
  customTone: "",
  designRequirements: ["clear-text", "title-hierarchy", "balanced-layout", "avoid-garbled"],
  creativeEnhancers: ["teaching-scene", "memory-hook"],
  customCreative: "",
  topic: "",
  coreConcept: "",
  targetAudience: "高中學生",
  scenario: "課堂教學與課後複習",
  requiredElements: "",
  forbiddenElements: "",
  customStyleDescription: "",
  customImageDescription: "",
  notes: "",
  creativityLevel: 62,
  professionalismLevel: 74,
  teachingMode: true,
  adminMode: false
};

export const examplePresets: ExamplePreset[] = [
  {
    id: "industrial-revolution",
    title: "工業革命比較",
    description: "比較第一次到第三次工業革命的動力、技術與社會影響。",
    form: {
      ...defaultFormState,
      useCase: "concept-comparison",
      visualStyle: "academic",
      structure: "comparison-table",
      depth: "college",
      tone: "contrast",
      topic: "工業革命比較",
      coreConcept: "比較第一次、第二次、第三次工業革命在能源、代表技術、產業影響與社會改變上的差異",
      targetAudience: "高中歷史與公民跨科學生",
      scenario: "教師課堂比較講解與段考複習",
      requiredElements: "時間範圍、核心技術、代表產業、社會影響",
      customImageDescription: "表格搭配關鍵圖示，左到右排列不同時期"
    }
  },
  {
    id: "ai-timeline",
    title: "AI 發展時間軸",
    description: "整理人工智慧的重要里程碑與技術演進。",
    form: {
      ...defaultFormState,
      useCase: "timeline",
      visualStyle: "future-tech",
      structure: "timeline",
      depth: "college",
      tone: "objective",
      topic: "AI 發展時間軸",
      coreConcept: "從符號式 AI、機器學習、深度學習到生成式 AI 的里程碑演進",
      targetAudience: "大學通識與教師研習參與者",
      scenario: "講座投影片與 NotebookLM 圖表摘要",
      requiredElements: "年份、代表事件、技術轉折、教育應用啟示",
      customImageDescription: "水平時間軸，節點有年份標籤與簡短摘要"
    }
  },
  {
    id: "democracy-process",
    title: "民主制度流程",
    description: "用流程圖整理民主決策從民意形成到公共政策。",
    form: {
      ...defaultFormState,
      useCase: "process-explanation",
      visualStyle: "lesson-plan",
      structure: "flowchart",
      depth: "high-school",
      tone: "teaching",
      topic: "民主制度流程",
      coreConcept: "從民意形成、選舉、代議、政策制定到公民監督的完整流程",
      targetAudience: "國高中公民課學生",
      scenario: "公民課程概念建立",
      requiredElements: "流程箭頭、每階段一句白話解釋、公民角色",
      customImageDescription: "直式流程圖，節點清楚並附簡短教學註解"
    }
  },
  {
    id: "cell-comparison",
    title: "細胞構造比較",
    description: "比較植物細胞與動物細胞的結構差異。",
    form: {
      ...defaultFormState,
      useCase: "concept-comparison",
      visualStyle: "infographic",
      structure: "comparison-table",
      depth: "high-school",
      tone: "teaching",
      topic: "細胞構造比較",
      coreConcept: "比較植物細胞與動物細胞在細胞壁、葉綠體、液泡等構造上的差異與功能",
      targetAudience: "國中自然科學生",
      scenario: "生物課重點複習",
      requiredElements: "相同構造、相異構造、功能說明",
      customImageDescription: "左右雙欄比較表搭配細胞簡圖"
    }
  },
  {
    id: "ai-teaching-app",
    title: "AI 教學應用分類",
    description: "整理生成式 AI 在教學上的應用類型與風險提醒。",
    form: {
      ...defaultFormState,
      useCase: "data-summary",
      visualStyle: "business",
      structure: "cards",
      depth: "college",
      tone: "brief",
      topic: "AI 教學應用分類",
      coreConcept: "整理備課、評量、學生支持、行政協作四大應用場景",
      targetAudience: "教師社群與教學行政人員",
      scenario: "校內工作坊與教育科技分享",
      requiredElements: "分類標籤、教學實例、風險提醒、可操作建議",
      customImageDescription: "卡片式版面，每張卡片一個應用領域",
      adminMode: true
    }
  },
  {
    id: "fake-news-comic",
    title: "假訊息判讀四格漫畫",
    description: "用四格漫畫呈現學生辨識假訊息的歷程。",
    form: {
      ...defaultFormState,
      useCase: "problem-solving",
      visualStyle: "playful",
      structure: "comic-teaching",
      depth: "high-school",
      tone: "story",
      topic: "假訊息判讀四格漫畫",
      coreConcept: "學生看到聳動訊息後，透過查證、比對來源與反思做出判斷",
      targetAudience: "國高中媒體素養課程學生",
      scenario: "媒體素養教學與課堂討論",
      requiredElements: "查證步驟、情境對話、幽默但不失教育意義",
      customImageDescription: "四格漫畫，校園情境，學生與老師互動",
      creativeEnhancers: ["teaching-scene", "humor", "memory-hook"],
      creativityLevel: 78
    }
  },
  {
    id: "genai-ethics-comic",
    title: "生成式AI倫理四格漫畫",
    description: "用情境漫畫呈現生成式 AI 使用的倫理兩難。",
    form: {
      ...defaultFormState,
      useCase: "problem-solving",
      visualStyle: "storytelling",
      structure: "comic-scenario",
      depth: "college",
      tone: "heuristic",
      topic: "生成式AI倫理四格漫畫",
      coreConcept: "學生使用生成式 AI 協助作業時，面臨抄襲、透明揭露與責任歸屬問題",
      targetAudience: "高中以上學生與教師",
      scenario: "AI 素養與倫理課程討論",
      requiredElements: "倫理衝突、角色思辨、結尾提出負責任使用原則",
      customImageDescription: "四格漫畫，校園與數位裝置並存的現代感場景",
      creativeEnhancers: ["teaching-scene", "cross-disciplinary", "future-feel"],
      creativityLevel: 84
    }
  }
];
