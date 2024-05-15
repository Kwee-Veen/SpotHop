import { writable } from "svelte/store";
import type { Spot, Session } from "$lib/types/spot-types";

export const subTitle = writable<string>();
export const currentSession = writable<Session>();
export const latestSpot = writable<Spot>();