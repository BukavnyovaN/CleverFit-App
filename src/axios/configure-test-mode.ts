import { cypressIsRunning } from '@utils/test/cypress.ts';
import { setRequestDelay } from './set-request-delay.ts';

export const configureTestMode = (): void => {
    if (cypressIsRunning()) {
        // helps cypress to detect a spinner is running
        setRequestDelay(900);
    }
    return;
};
