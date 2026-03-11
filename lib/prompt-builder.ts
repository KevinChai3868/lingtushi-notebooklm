import { defaultFormState, labelMap } from "@/lib/data";
import { GeneratedPrompts, PromptFormState } from "@/lib/types";
import { dedupe, joinSentence } from "@/lib/utils";

const structureSupportsComic = (structure: string) => structure.startsWith("comic");

function resolveLabel(value: string, fallback: string) {
  return labelMap[value] ?? fallback;
}

function buildSupplementalIdeas(form: PromptFormState) {
  const ideas: string[] = [];

  if (!form.coreConcept) {
    ideas.push("請先用 3 到 5 個關鍵點拆解主題核心，再安排資訊層次。");
  }

  if (!form.requiredElements) {
    ideas.push("補入必要的名詞定義、關係線索與代表案例。");
  }

  if (form.teachingMode) {
    ideas.push("加入方便教師口頭講解與學生自學複習的提示。");
  }

  if (form.adminMode) {
    ideas.push("維持簡報式摘要節奏，突出決策資訊與可執行建議。");
  }

  if (form.creativityLevel >= 75) {
    ideas.push("保留創意轉譯，但不可犧牲內容正確性與閱讀性。");
  }

  if (form.professionalismLevel >= 75) {
    ideas.push("使用較高密度的標題結構、分類命名與視覺一致性。");
  }

  return ideas;
}

function buildCreativeDirection(form: PromptFormState) {
  const selected = dedupe(
    form.creativeEnhancers.map((item) => resolveLabel(item, item)).concat(form.customCreative)
  );
  const ideas = [...selected];

  if (form.creativityLevel >= 80) {
    ideas.push("以鮮明比喻或具有記憶點的轉場設計提升吸引力");
  } else if (form.creativityLevel >= 60) {
    ideas.push("適度加入容易理解的生活情境與視覺亮點");
  } else {
    ideas.push("創意點到為止，以穩定清晰為優先");
  }

  return joinSentence(ideas);
}

function buildDesignDirection(form: PromptFormState) {
  const selected = form.designRequirements.map((item) => resolveLabel(item, item));
  const base = [...selected];

  if (form.professionalismLevel >= 80) {
    base.push("版面對齊精準");
    base.push("色彩節制且具階層");
  }

  if (form.teachingMode) {
    base.push("每區塊保留可被教學講解的視覺停頓");
  }

  return joinSentence(base);
}

function buildReadingRequirements(form: PromptFormState) {
  const items = [
    "標題與小標要明確分層",
    "每個區塊文字短而精準",
    "避免過度裝飾與難辨識字體"
  ];

  if (form.targetAudience) {
    items.push(`用字須符合${form.targetAudience}的理解程度`);
  }

  if (form.teachingMode) {
    items.push("重要概念需可直接拿來口頭講解或作為課堂提問");
  }

  return joinSentence(items);
}

function buildRestrictionLine(form: PromptFormState) {
  const restrictions = [];

  if (form.forbiddenElements) {
    restrictions.push(`避免出現：${form.forbiddenElements}`);
  }

  restrictions.push("不得犧牲可讀性來換取華麗視覺");
  restrictions.push("避免資訊堆疊、混亂裝飾與不必要英文縮寫");

  return joinSentence(restrictions);
}

function buildComicFrames(form: PromptFormState) {
  const topic = form.topic || "指定主題";
  const audience = form.targetAudience || defaultFormState.targetAudience;

  return [
    `第一格情境引入：以貼近${audience}的場景開場。畫面描述聚焦「${topic}」的日常情境，角色動作自然，表情帶出好奇或困惑，對話簡短明確，教育目的在於建立動機。`,
    "第二格問題或衝突：讓角色遇到錯誤理解、資訊落差或決策難題。畫面要清楚呈現衝突來源，角色表情可放大緊張或疑惑，對話推進問題核心，教育目的在於凸顯需要學習的關鍵。",
    "第三格思考或轉折：角色開始分析、查證、比較或請教。畫面要顯示思考過程與線索整理，角色動作轉向積極解題，對話提供概念轉譯，教育目的在於示範正確思路。",
    "第四格結論或笑點：收束為可記住的結論、原則或帶有幽默感的反差。畫面要有明確收尾，角色表情展現理解或釋然，對話形成記憶點，教育目的在於強化學習遷移。"
  ].join("\n");
}

function buildBasePrompt(form: PromptFormState) {
  const useCase = form.useCase === "custom" ? form.customUseCase : resolveLabel(form.useCase, form.useCase);
  const visualStyle =
    form.visualStyle === "custom" ? form.customVisualStyle : resolveLabel(form.visualStyle, form.visualStyle);
  const structure =
    form.structure === "custom" ? form.customStructure : resolveLabel(form.structure, form.structure);
  const tone = form.tone === "custom" ? form.customTone : resolveLabel(form.tone, form.tone);
  const depth = resolveLabel(form.depth, form.depth);

  const topic = form.topic || "請依使用者提供主題生成";
  const audience = form.targetAudience || defaultFormState.targetAudience;
  const scenario = form.scenario || defaultFormState.scenario;
  const coreConcept = form.coreConcept || "請先歸納核心概念、重點脈絡與關係層次";

  const lines = [
    `主題：${topic}`,
    `用途：${useCase}`,
    `目標受眾：${audience}`,
    `使用情境：${scenario}`,
    `圖表形式：${structure}`,
    `視覺風格：${visualStyle}`,
    `內容深度：${depth}`,
    `語氣風格：${tone}`,
    `核心概念：${coreConcept}`,
    `必須出現元素：${form.requiredElements || "請補入最重要的概念、例子與關係標籤"}`,
    `視覺設計要求：${buildDesignDirection(form)}`,
    `創意元素：${buildCreativeDirection(form)}`,
    `閱讀性要求：${buildReadingRequirements(form)}`,
    `限制條件：${buildRestrictionLine(form)}`
  ];

  if (form.customStyleDescription) {
    lines.push(`使用者自訂風格描述：${form.customStyleDescription}`);
  }

  if (form.customImageDescription) {
    lines.push(`使用者自訂圖像描述：${form.customImageDescription}`);
  }

  if (form.notes) {
    lines.push(`補充說明：${form.notes}`);
  }

  const supplemental = buildSupplementalIdeas(form);
  if (supplemental.length > 0) {
    lines.push(`系統補充建議：${joinSentence(supplemental)}`);
  }

  if (structureSupportsComic(form.structure)) {
    lines.push("四格漫畫結構要求：");
    lines.push(buildComicFrames(form));
  }

  return lines.join("\n");
}

export function generatePrompts(form: PromptFormState): GeneratedPrompts {
  const basePrompt = buildBasePrompt(form);
  const creativityHint =
    form.creativityLevel >= 75
      ? "請讓成品具有一眼記住的創意鈎子與清楚的視覺主軸。"
      : "請維持清楚穩定，以少量創意點綴。";
  const professionalHint =
    form.professionalismLevel >= 75
      ? "請以高品質資訊設計標準整理層級、配色與版面節奏。"
      : "請以易懂、簡潔、可立即使用為優先。";

  return {
    concise: [
      "請為 NotebookLM 生成一份高品質圖表資訊提示詞。",
      basePrompt,
      creativityHint,
      professionalHint
    ].join("\n\n"),
    detailed: [
      "你是一位擅長教育內容轉譯、資訊設計與視覺敘事的提示詞設計師。",
      "請根據以下條件，生成可直接用於 NotebookLM 圖表資訊輸出的提示詞。保留使用者自訂內容，僅在資訊不足時補充，不可覆蓋使用者原意。",
      basePrompt,
      "輸出時請讓內容自然流暢，具備教學價值、視覺邏輯、結構感與實際可讀性，避免只是清單式拼接。",
      creativityHint,
      professionalHint
    ].join("\n\n"),
    expert: [
      "你是一位資深提示詞工程師、教育科技設計師與資訊視覺總監。",
      "請生成一份 NotebookLM 專家級圖表資訊提示詞，要求兼具結構清晰、創意表現、視覺規劃與教學可用性。使用者輸入優先，系統補充只能補強，不可改寫原意。",
      basePrompt,
      `創意度參考：${form.creativityLevel}/100。請決定創意轉譯強度，但內容必須準確。`,
      `專業度參考：${form.professionalismLevel}/100。請決定資訊設計精緻度、條理與簡報完成度。`,
      form.teachingMode ? "請額外強化教學流程、提問點、學習遷移與學生理解門檻。" : "",
      form.adminMode ? "請額外強化摘要效率、決策觀點、執行建議與簡報式語言。" : "",
      "最終提示詞應明確要求 NotebookLM 在圖表中呈現：主題焦點、受眾導向、結構安排、視覺語言、創意記憶點、閱讀性規則與禁止事項。"
    ]
      .filter(Boolean)
      .join("\n\n")
  };
}
