export const TUNNEL_CONTEXT_NAME = 'svelte-tunnel';

export interface TunnelState {
	nodes: Node[];
	inputIds: string[];
}

export const tunnelStore = $state<Partial<Record<symbol | string, TunnelState>>>({});
