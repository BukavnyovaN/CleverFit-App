import './not-found-message.css';
import { ResultMessage } from '@components/result-message/Result-message.tsx';
import { PATHS } from '@constants/paths.ts';
import { ResultStatusType } from 'antd/es/result';

type NotFoundMessageProps = {
    status?: ResultStatusType;
    title: string;
    subtitle: string;
    extra: string;
};

export const NotFoundMessage = ({ status, title, subtitle, extra }: NotFoundMessageProps) => (
    <div className='not-found-message__wrapper'>
        <ResultMessage
            title={title}
            status={status}
            subTitle={subtitle}
            buttonContent={extra}
            navigateTo={PATHS.MAIN}
            location={undefined}
            dataTestId={''}
        />
    </div>
);
