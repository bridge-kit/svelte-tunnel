import { createHighlighter, type Highlighter } from 'shiki';

export type CodeLanguage = 'shell' | 'svelte' | 'js' | 'ts';

const LANG_MAP: Record<CodeLanguage, string> = {
	shell: 'shellscript',
	svelte: 'svelte',
	js: 'javascript',
	ts: 'typescript'
};

let highlighterPromise: Promise<Highlighter> | undefined;

function loadHighlighter() {
	highlighterPromise ??= createHighlighter({
		themes: ['github-dark-default', 'github-light'],
		langs: ['svelte', 'shellscript', 'javascript', 'typescript']
	});
	return highlighterPromise;
}

export async function highlightCode(
	code: string,
	language: CodeLanguage,
	tone: 'dark' | 'light' = 'dark'
) {
	const highlighter = await loadHighlighter();
	return highlighter.codeToHtml(code, {
		lang: LANG_MAP[language],
		theme: tone === 'dark' ? 'github-dark-default' : 'github-light'
	});
}
