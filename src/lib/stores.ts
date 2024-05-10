import { writable } from "svelte/store";
import type { Session } from "$lib/types/spot-types";

export const subTitle = writable<string>();
export const currentSession = writable<Session>();