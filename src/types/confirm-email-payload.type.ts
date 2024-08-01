import { EmailPayload } from './check-email-payload.type.ts';

export interface ConfirmEmailPayload extends EmailPayload {
    code: string;
}
