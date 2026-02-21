export interface ParsedSections {
  summary?: string;
  diagnosis?: string;
  recommendations?: string[];
  nextSteps?: string[];
}

const SECTION_PATTERNS: Record<string, keyof ParsedSections> = {
  "kurzfazit": "summary",
  "fazit": "summary",
  "zusammenfassung": "summary",
  "diagnose": "diagnosis",
  "analyse": "diagnosis",
  "empfehlungen": "recommendations",
  "empfehlung": "recommendations",
  "massnahmen": "recommendations",
  "nächste schritte": "nextSteps",
  "next steps": "nextSteps",
  "nächste massnahmen": "nextSteps",
};

/**
 * Parse markdown text with ## section headers into structured data.
 * Returns null if no recognized sections are found (fallback to plain markdown).
 */
export function parseMessageSections(text: string): ParsedSections | null {
  // Split by ## headers
  const headerRegex = /^##\s+(.+)$/gm;
  const matches = [...text.matchAll(headerRegex)];

  if (matches.length === 0) return null;

  const sections: ParsedSections = {};
  let foundAny = false;

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const headerText = match[1].trim().toLowerCase();
    const startIndex = match.index! + match[0].length;
    const endIndex = i + 1 < matches.length ? matches[i + 1].index! : text.length;
    const content = text.slice(startIndex, endIndex).trim();

    // Find matching section key
    const sectionKey = Object.entries(SECTION_PATTERNS).find(
      ([pattern]) => headerText.includes(pattern)
    )?.[1];

    if (!sectionKey) continue;
    foundAny = true;

    if (sectionKey === "recommendations" || sectionKey === "nextSteps") {
      // Parse as list items
      const items = content
        .split("\n")
        .map((line) => line.replace(/^[-*\d.]+\s*/, "").trim())
        .filter((line) => line.length > 0);
      sections[sectionKey] = items;
    } else {
      sections[sectionKey] = content;
    }
  }

  return foundAny ? sections : null;
}
