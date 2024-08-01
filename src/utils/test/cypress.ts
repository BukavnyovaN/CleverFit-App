export function cypressIsRunning(): boolean {
    return !!(window as unknown as {Cypress: unknown}).Cypress;
}
