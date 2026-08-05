interface TunnelState {
    nodes: Node[]
    inputIds: string[]
}
export const tunnelStore = $state<Partial<Record<symbol, TunnelState>>>({})