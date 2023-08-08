import { Payload } from "./types";

export const fetchData = async (): Promise<Payload> => {
    try {
        const res = await fetch(`/text-quiz-28f12/europe-west2/proxy/data`);
        // fetching relative route; requesting to proxy server in /functions
        const data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        return { status: false };
    }
};