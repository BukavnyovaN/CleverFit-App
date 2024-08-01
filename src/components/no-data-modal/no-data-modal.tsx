import { Button, Modal, Result } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';

import './no-data-modal.css';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setError } from '@redux/slice/app/app-slice.ts';

export const NoDataModal = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(true);
    const handleBack = () => {
        setOpenModal(false);
        dispatch(setError(false));
        navigate(PATHS.MAIN);
    };

    return (
        <Modal
            data-test-id='modal-no-review'
            className='modal-no-feedbacks'
            open={openModal}
            centered={true}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.5)' }}
        >
            <Result
                className='modal-no-feedbacks__result'
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={[
                    <Button type='primary' onClick={handleBack} key='feedback'>
                        Назад
                    </Button>,
                ]}
            />
        </Modal>
    );
};
