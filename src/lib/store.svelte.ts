import { getContext, setContext } from 'svelte';

export interface TunnelState {
	nodes: Node[];
	inputIds: string[];
}

export type TunnelStore = Partial<Record<symbol | string, TunnelState>>;

/** Stable across separately bundled copies of this library. */
const CONTEXT_KEY = 'svelte-tunnel';
const GLOBAL_KEY = Symbol.for('svelte-tunnel');

function getSharedStore(): TunnelStore {
	const registry = globalThis as typeof globalThis & {
		[GLOBAL_KEY]?: TunnelStore;
	};

	if (registry[GLOBAL_KEY]) return registry[GLOBAL_KEY];

	const store = $state<TunnelStore>({});
	registry[GLOBAL_KEY] = store;
	return store;
}

export function getTunnelStore(): TunnelStore {
	const existing = getContext<TunnelStore>(CONTEXT_KEY);
	if (existing) return existing;

	const store = getSharedStore();
	setContext(CONTEXT_KEY, store);
	return store;
}
