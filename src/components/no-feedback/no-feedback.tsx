import { Button, Card } from 'antd';

import './no-feedback.css';
import { MouseEventHandler } from 'react';

type NoFeedbackProps = {
    handleButtonClick: MouseEventHandler<HTMLElement>;
};

export const NoFeedback = ({ handleButtonClick }: NoFeedbackProps) => (
    <div className='no-feedback__wrapper'>
        <Card className='no-feedback__card'>
            <h3 className='no-feedback__heading'>Оставьте свой отзыв первым</h3>
            <div className='no-feedback__content'>
                <p className='no-feedback__text'>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать
                    правильный выбор.
                </p>
            </div>
        </Card>
        <Button
            className='no-feedback__button'
            type='primary'
            data-test-id='write-review'
            onClick={handleButtonClick}
        >
            Написать отзыв
        </Button>
    </div>
);
