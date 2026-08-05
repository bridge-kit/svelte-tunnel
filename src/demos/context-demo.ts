import { createContext } from 'svelte';

export interface DemoProfile {
	name: string;
	theme: string;
}

export const [getDemoProfile, setDemoProfile] = createContext<DemoProfile>();
