import { Button, Modal, Result } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import './modal-error.css';

type ModalErrorProps = {
    open: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    openFeedbackModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalError = ({ open, setOpenModal, openFeedbackModal }: ModalErrorProps) => {
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleFeedback = () => {
        setOpenModal(false);
        openFeedbackModal(true);
    };

    return (
        <Modal
            className='modal-error'
            open={open}
            centered={true}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.5)' }}
        >
            <Result
                className='modal-error__result'
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте еще раз.'
                extra={[
                    <Button
                        type='primary'
                        data-test-id='write-review-not-saved-modal'
                        onClick={handleFeedback}
                        key='feedback'
                    >
                        Написать отзыв
                    </Button>,
                    <Button onClick={handleClose} key='close'>
                        Закрыть
                    </Button>,
                ]}
            />
        </Modal>
    );
};
