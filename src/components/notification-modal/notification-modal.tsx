import { FC, memo, useEffect, useState } from 'react';
import { Button, Modal, notification } from 'antd';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

import './notification-modal.css';

type ModalNotificationProps = {
    textButton: string;
    title: string;
    isCloseIcon: boolean;
    open: boolean;
    onClose?: () => void;
    onClickButton: () => void;
    subtitle?: string;
    dataTestId?: string;
};

export const NotificationModal: FC<ModalNotificationProps> = memo(
    ({ open, onClickButton, onClose, title, isCloseIcon, subtitle, textButton, dataTestId }) => {
        const [openModal, setOpenModal] = useState(true);

        const openNotification = () => {
            const key = 'open';
            const btn = (
                <Button
                    className='notification__button'
                    type='primary'
                    onClick={onClickButton}
                    data-test-id={dataTestId}
                >
                    {textButton}
                </Button>
            );

            notification.open({
                message: (
                    <div
                        data-test-id='modal-error-user-training-title'
                        className='notification__title'
                    >
                        {title}
                    </div>
                ),
                description: (
                    <div
                        data-test-id='modal-error-user-training-subtitle'
                        className='notification__description'
                    >
                        {subtitle}
                    </div>
                ),
                btn,
                key,
                icon: (
                    <CloseCircleOutlined
                        style={
                            textButton === 'Повторить'
                                ? { color: 'var(--primary-light-blue)' }
                                : { color: 'var(--character-light-error)' }
                        }
                    />
                ),
                duration: 0,
                closeIcon: isCloseIcon ? (
                    <CloseOutlined data-test-id={'modal-error-user-training-button-close'} />
                ) : (
                    ''
                ),
                onClose,
                className: 'notification',
                placement: 'top',
            });
        };

        useEffect(() => {
            if (open && !openModal) {
                openNotification();

                return;
            }
            notification.close('open');
            setOpenModal(false);
        }, [open, openModal]);

        return (
            <Modal
                style={{ padding: 0 }}
                className='modal'
                open={open}
                maskClosable={true}
                centered={true}
                onCancel={onClose}
                footer={null}
                closable={false}
                maskStyle={{ backdropFilter: 'blur(6px)', background: ' rgba(121, 156, 212, 0.1)' }}
            ></Modal>
        );
    },
);
