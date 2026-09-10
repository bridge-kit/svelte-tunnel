import type { Component } from 'svelte';
import In from './components/In.svelte';
import Out from './components/Out.svelte';
import type ChildrenRenderer from './components/ChildrenRenderer.svelte';

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
