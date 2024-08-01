import { Modal } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { logout } from '@redux/slice/user/user-slice.ts';
import { personalInfoSelector } from '@utils/helpers/selectors.ts';
import { PATHS } from '@constants/paths.ts';
import { useNavigate } from 'react-router-dom';
import './tariffs-payment-modal.css';

type TariffsPaymentModal = {
    open: boolean;
};

export const TariffsPaymentModal = ({ open }: TariffsPaymentModal) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const personalInfo = useAppSelector(personalInfoSelector);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        dispatch(logout());
        navigate(PATHS.AUTH);
    };

    return (
        <Modal
            className='tariffs-payment-modal'
            open={open}
            closable={true}
            footer={false}
            onCancel={handleLogout}
            centered={true}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(255,255,255,0.05)' }}
            data-test-id='tariff-modal-success'
        >
            <div className='tariffs-payment-modal__content'>
                <CheckCircleFilled className='tariffs-payment-modal__icon' />
                <div>
                    <div>Чек для оплаты у вас на почте</div>
                    Мы отправили инструкцию для оплаты вам на e-mail{' '}
                    <span>{personalInfo.email}</span>. После подтверждения оплаты войдите в
                    приложение заново.
                </div>
                <div>Не пришло письмо? Проверьте папку Спам.</div>
            </div>
        </Modal>
    );
};
