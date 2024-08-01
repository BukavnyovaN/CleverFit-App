import { Button, Modal, Result } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import './modal-success.css';

type ModalErrorProps = {
    open: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalSuccess = ({ open, setOpenModal }: ModalErrorProps) => {
    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal
            className='modal-success'
            open={open}
            centered={true}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.5)' }}
        >
            <Result
                className='modal-success__result'
                status='success'
                title='Отзыв успешно опубликован'
                extra={[
                    <Button type='primary' onClick={handleClose} key='feedback'>
                        Отлично
                    </Button>,
                ]}
            />
        </Modal>
    );
};
