import axios from "axios";

export const setRequestDelay = (delayMs: number): void => {
    axios.interceptors.request.use(config => {
        return new Promise(resolve => setTimeout(() => resolve(config), delayMs));
    });
}
