import { Payload } from "./types";

export const fetchData = async (): Promise<Payload> => {
    try {
        const url = `/text-quiz-28f12/europe-west2/proxy/data`;
        const res = await fetch(url);
        console.log(res);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        return { status: false };
    }
};