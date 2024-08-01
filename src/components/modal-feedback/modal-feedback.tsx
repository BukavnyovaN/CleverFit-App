import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import './modal-feedback.css';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { createFeedback } from '@redux/actions/create-feedback.ts';
import { ModalError } from '@components/modal-error/modal-error.tsx';
import { ModalSuccess } from '@components/modal-success/modal-success.tsx';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { getFeedback } from '@redux/actions/get-feedback.ts';
import { StarFilled, StarOutlined } from '@ant-design/icons';

type ModalFeedbackProps = {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    accessToken: Nullable<string>;
};

export const ModalFeedback = ({ openModal, setOpenModal, accessToken }: ModalFeedbackProps) => {
    const dispatch = useAppDispatch();
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const response = await dispatch(createFeedback({ rating, message, accessToken }));
        if (response?.payload === RequestResult.success) {
            dispatch(getFeedback({ accessToken }));
            setOpenSuccessModal(true);
        } else {
            setOpenErrorModal(true);
        }
    };

    const handleOk = () => {
        setOpenModal(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleChangeMessage = (value: string) => {
        setMessage(value);
    };

    const handleChangeRating = (value: number) => {
        setRating(value);
    };

    return (
        <div>
            <Modal
                className='modal-feedback'
                open={openModal}
                title='Ваш отзыв'
                onOk={handleOk}
                centered={true}
                onCancel={handleCancel}
                width={540}
                maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.5)' }}
                footer={null}
            >
                <Form
                    requiredMark={false}
                    scrollToFirstError={true}
                    style={{ width: '100%' }}
                    onFinish={handleSubmit}
                >
                    <Form.Item>
                        <Rate
                            value={rating}
                            onChange={(value) => handleChangeRating(value)}
                            character={({ value, index }) => {
                                return value && index! < value ? (
                                    <StarFilled style={{ color: '#faad14' }} />
                                ) : (
                                    <StarOutlined style={{ color: '#faad14' }} />
                                );
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <TextArea
                            rows={2}
                            value={message}
                            onChange={(e) => handleChangeMessage(e.target.value)}
                        />
                    </Form.Item>
                    <div className='modal-feedback__button'>
                        <Button
                            disabled={!rating && !message}
                            data-test-id='new-review-submit-button'
                            type='primary'
                            htmlType='submit'
                            onClick={handleOk}
                        >
                            Опубликовать
                        </Button>
                    </div>
                </Form>
            </Modal>

            <ModalError
                open={openErrorModal}
                setOpenModal={setOpenErrorModal}
                openFeedbackModal={setOpenModal}
            />
            <ModalSuccess open={openSuccessModal} setOpenModal={setOpenSuccessModal} />
        </div>
    );
};
