import { setContext, type Component } from 'svelte';
import In from './components/In.svelte';
import Out from './components/Out.svelte';
import type ChildrenRenderer from './components/ChildrenRenderer.svelte';
import { TUNNEL_CONTEXT_NAME, type TunnelState } from './store.svelte.ts';

export interface TunnelOptions {
	mode?: 'single' | 'multiple';
	id?: string | symbol;
}

interface Tunnel {
	In: typeof ChildrenRenderer;
	Out: Component<object>;
}

export function tunnel({ mode = 'single', id = Symbol() }: TunnelOptions = {}): Tunnel {
	return {
		In: (internals, props) => In(internals, { id, ...props, options: { mode } }),
		Out: (internals) => Out(internals, { id })
	};
}

export const useManualRegister = () => {
	const innerTunnelStore = $state<Partial<Record<symbol | string, TunnelState>>>({});
	setContext(TUNNEL_CONTEXT_NAME, innerTunnelStore);
};
