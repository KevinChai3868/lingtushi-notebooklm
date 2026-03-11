"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  creativeEnhancerOptions,
  defaultFormState,
  depthOptions,
  designRequirementOptions,
  examplePresets,
  structureOptions,
  toneOptions,
  useCaseOptions,
  visualStyleOptions
} from "@/lib/data";
import { generatePrompts } from "@/lib/prompt-builder";
import { PromptFormState } from "@/lib/types";
import { downloadText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const inspirationPool = [
  "把抽象概念轉成教室內看得見的情境",
  "用日常物件做比喻，例如交通號誌、背包整理或便利貼分類",
  "在標題中加入動詞，讓結構更有推進感",
  "把每個區塊當成教師口頭講解的停頓點",
  "加入一個容易記住的對比，例如 before / after 或錯誤 / 正解"
];

type SectionProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="space-y-4 rounded-[24px] border border-border/80 bg-white/80 p-5">
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function OutputBlock({
  title,
  content,
  onCopy
}: {
  title: string;
  content: string;
  onCopy: () => void;
}) {
  return (
    <div className="space-y-3 rounded-[24px] border border-border bg-[#fffaf2] p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-base font-bold">{title}</h4>
        <Button variant="outline" onClick={onCopy}>
          複製
        </Button>
      </div>
      <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap rounded-2xl bg-white p-4 text-sm leading-7 text-foreground">
        {content}
      </pre>
    </div>
  );
}

export function PromptBuilder() {
  const [form, setForm] = useState<PromptFormState>(defaultFormState);
  const [copied, setCopied] = useState("");

  const prompts = useMemo(() => generatePrompts(form), [form]);

  const updateField = <K extends keyof PromptFormState>(key: K, value: PromptFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleMulti = (key: "designRequirements" | "creativeEnhancers", value: string) => {
    setForm((current) => {
      const exists = current[key].includes(value);
      return {
        ...current,
        [key]: exists ? current[key].filter((item) => item !== value) : [...current[key], value]
      };
    });
  };

  const handleCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(""), 1200);
  };

  const handleClear = () => {
    setForm(defaultFormState);
  };

  const handleInspiration = () => {
    const idea = inspirationPool[Math.floor(Math.random() * inspirationPool.length)];
    updateField("notes", form.notes ? `${form.notes}\n${idea}` : idea);
  };

  const handleExport = (type: "txt" | "md") => {
    const content =
      type === "txt"
        ? `靈圖師 NotebookLM 提示工坊\n\n[精簡版]\n${prompts.concise}\n\n[完整版]\n${prompts.detailed}\n\n[專家版]\n${prompts.expert}`
        : `# 靈圖師 NotebookLM 提示工坊\n\n## 精簡版\n\n${prompts.concise}\n\n## 完整版\n\n${prompts.detailed}\n\n## 專家版\n\n${prompts.expert}\n`;

    downloadText(
      `notebooklm-prompts.${type}`,
      content,
      type === "txt" ? "text/plain;charset=utf-8" : "text/markdown;charset=utf-8"
    );
  };

  return (
    <div className="min-h-screen">
      <div className="panel-grid mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-[linear-gradient(135deg,rgba(15,93,115,0.95),rgba(25,126,148,0.88))] px-6 py-8 text-white">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl space-y-4">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em]">
                    EDUCATION + VISUAL PROMPT DESIGN
                  </span>
                  <div className="space-y-3">
                    <div className="text-sm font-semibold tracking-[0.28em] text-white/78">靈圖師</div>
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                      NotebookLM 提示工坊
                    </h1>
                    <p className="max-w-2xl text-sm leading-7 text-white/86 sm:text-base">
                      協助教師、學生與知識工作者快速設計具有教學價值、視覺邏輯與創意結構的 NotebookLM 圖表提示詞。
                    </p>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/20 bg-white/10 p-4 text-sm leading-7 text-white/88">
                  <div className="font-bold">平台特色</div>
                  <div>使用者輸入優先保留</div>
                  <div>四格漫畫結構自動展開</div>
                  <div>支援教學與行政雙模式</div>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <Section title="快速開始" subtitle="先載入高品質範例，再依需求微調。">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {examplePresets.map((example) => (
                    <button
                      key={example.id}
                      type="button"
                      onClick={() => setForm(example.form)}
                      className="rounded-[22px] border border-border bg-[#fffaf0] p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-panel"
                    >
                      <div className="text-sm font-bold">{example.title}</div>
                      <div className="mt-2 text-sm leading-6 text-muted">{example.description}</div>
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="設定區" subtitle="以用途、風格、結構與自訂描述共同決定提示詞品質。">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">圖表用途</label>
                    <Select value={form.useCase} onChange={(event) => updateField("useCase", event.target.value)} options={useCaseOptions} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">視覺風格</label>
                    <Select
                      value={form.visualStyle}
                      onChange={(event) => updateField("visualStyle", event.target.value)}
                      options={visualStyleOptions}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">圖像與版面結構</label>
                    <Select
                      value={form.structure}
                      onChange={(event) => updateField("structure", event.target.value)}
                      options={structureOptions}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">內容深度</label>
                    <Select value={form.depth} onChange={(event) => updateField("depth", event.target.value)} options={depthOptions} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">語氣風格</label>
                    <Select value={form.tone} onChange={(event) => updateField("tone", event.target.value)} options={toneOptions} />
                  </div>
                  <div className="grid gap-4 rounded-[20px] border border-border bg-[#f8f2e6] p-4">
                    <label className="inline-flex items-center gap-3 text-sm font-semibold">
                      <input
                        type="checkbox"
                        checked={form.teachingMode}
                        onChange={(event) => updateField("teachingMode", event.target.checked)}
                      />
                      教學模式
                    </label>
                    <label className="inline-flex items-center gap-3 text-sm font-semibold">
                      <input
                        type="checkbox"
                        checked={form.adminMode}
                        onChange={(event) => updateField("adminMode", event.target.checked)}
                      />
                      行政簡報模式
                    </label>
                  </div>
                </div>

                {(form.useCase === "custom" ||
                  form.visualStyle === "custom" ||
                  form.structure === "custom" ||
                  form.tone === "custom") && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {form.useCase === "custom" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">自訂用途</label>
                        <Input value={form.customUseCase} onChange={(event) => updateField("customUseCase", event.target.value)} />
                      </div>
                    ) : null}
                    {form.visualStyle === "custom" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">自訂視覺風格</label>
                        <Input
                          value={form.customVisualStyle}
                          onChange={(event) => updateField("customVisualStyle", event.target.value)}
                        />
                      </div>
                    ) : null}
                    {form.structure === "custom" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">自訂圖像結構</label>
                        <Input value={form.customStructure} onChange={(event) => updateField("customStructure", event.target.value)} />
                      </div>
                    ) : null}
                    {form.tone === "custom" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">自訂語氣</label>
                        <Input value={form.customTone} onChange={(event) => updateField("customTone", event.target.value)} />
                      </div>
                    ) : null}
                  </div>
                )}
              </Section>

              <Section title="使用者自訂輸入" subtitle="系統只會補強，不會覆蓋你輸入的描述。">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">主題</label>
                    <Input value={form.topic} onChange={(event) => updateField("topic", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">核心概念</label>
                    <Input value={form.coreConcept} onChange={(event) => updateField("coreConcept", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">目標對象</label>
                    <Input value={form.targetAudience} onChange={(event) => updateField("targetAudience", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">使用情境</label>
                    <Input value={form.scenario} onChange={(event) => updateField("scenario", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">必須出現元素</label>
                    <Textarea
                      className="min-h-24"
                      value={form.requiredElements}
                      onChange={(event) => updateField("requiredElements", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">禁止元素</label>
                    <Textarea
                      className="min-h-24"
                      value={form.forbiddenElements}
                      onChange={(event) => updateField("forbiddenElements", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">自訂風格描述</label>
                    <Textarea
                      className="min-h-24"
                      value={form.customStyleDescription}
                      onChange={(event) => updateField("customStyleDescription", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">自訂圖像描述</label>
                    <Textarea
                      className="min-h-24"
                      value={form.customImageDescription}
                      onChange={(event) => updateField("customImageDescription", event.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">補充說明</label>
                  <Textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
                </div>
              </Section>

              <div className="grid gap-5 md:grid-cols-2">
                <Section title="視覺設計要求" subtitle="控制資訊圖像的穩定度與後續可編修性。">
                  <CheckboxGroup
                    options={designRequirementOptions}
                    values={form.designRequirements}
                    onToggle={(value) => toggleMulti("designRequirements", value)}
                  />
                </Section>
                <Section title="創意強化" subtitle="不是亂加修飾，而是有記憶點的有效轉譯。">
                  <CheckboxGroup
                    options={creativeEnhancerOptions}
                    values={form.creativeEnhancers}
                    onToggle={(value) => toggleMulti("creativeEnhancers", value)}
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">自訂創意補充</label>
                    <Input value={form.customCreative} onChange={(event) => updateField("customCreative", event.target.value)} />
                  </div>
                </Section>
              </div>

              <Section title="加分控制" subtitle="調整成品的創意張力與專業感。">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>創意度滑桿</span>
                      <span>{form.creativityLevel}</span>
                    </div>
                    <input
                      className="range-slider w-full"
                      type="range"
                      min={0}
                      max={100}
                      value={form.creativityLevel}
                      onChange={(event) => updateField("creativityLevel", Number(event.target.value))}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>專業度滑桿</span>
                      <span>{form.professionalismLevel}</span>
                    </div>
                    <input
                      className="range-slider w-full"
                      type="range"
                      min={0}
                      max={100}
                      value={form.professionalismLevel}
                      onChange={(event) => updateField("professionalismLevel", Number(event.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" onClick={handleInspiration}>
                    隨機靈感按鈕
                  </Button>
                  <Button variant="outline" onClick={handleClear}>
                    清空
                  </Button>
                </div>
              </Section>
            </div>
          </Card>

          <Card className="h-fit lg:sticky lg:top-6">
            <div className="border-b border-border bg-[#fff7ea] px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black">輸出結果</h2>
                  <p className="text-sm text-muted">同時產出精簡版、完整版與專家版提示詞。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => handleExport("txt")}>
                    匯出 txt
                  </Button>
                  <Button variant="outline" onClick={() => handleExport("md")}>
                    匯出 markdown
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="rounded-[24px] border border-primary/20 bg-primary/10 p-4 text-sm leading-7">
                <div className="font-bold">生成邏輯</div>
                <div>1. 讀取使用者自訂欄位</div>
                <div>2. 讀取勾選設定與滑桿強度</div>
                <div>3. 描述不足時只補充，不覆蓋原意</div>
                <div>4. 轉成自然流暢、可直接貼用的提示詞</div>
              </div>

              <OutputBlock
                title={`精簡版提示詞${copied === "concise" ? " 已複製" : ""}`}
                content={prompts.concise}
                onCopy={() => handleCopy(prompts.concise, "concise")}
              />
              <OutputBlock
                title={`完整版提示詞${copied === "detailed" ? " 已複製" : ""}`}
                content={prompts.detailed}
                onCopy={() => handleCopy(prompts.detailed, "detailed")}
              />
              <OutputBlock
                title={`專家版提示詞${copied === "expert" ? " 已複製" : ""}`}
                content={prompts.expert}
                onCopy={() => handleCopy(prompts.expert, "expert")}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
