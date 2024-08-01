import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import './settings-page.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { useEffect, useState } from 'react';
import { ModalFeedback } from '@components/modal-feedback/modal-feedback.tsx';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { getTariffsList } from '@redux/actions/get-tariffs-list.ts';
import { TariffCards } from '@components/tariff-cards/tariff-cards.tsx';
import { TariffSwitchers } from '@components/tariff-switchers/tariff-switchers.tsx';

//TODO Исправить баг со свитчерами (перезатираются данные)
export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const accessToken = useGetAccessToken();

    const [writeReview, setWriteReview] = useState(false);

    const handleClick = () => {
        setWriteReview(true);
    };

    useEffect(() => {
        dispatch(getTariffsList({ accessToken }));
    }, []);

    return (
        <div className='settings__wrapper'>
            <TariffCards />
            <TariffSwitchers />
            <div className='settings__buttons'>
                <Button className='settings__button' type='primary' onClick={handleClick}>
                    Написать отзыв
                </Button>
                <Link className='settings__button' to={PATHS.FEEDBACKS}>
                    <Button type='link'>Смотреть все отзывы</Button>
                </Link>
                <ModalFeedback
                    openModal={writeReview}
                    setOpenModal={setWriteReview}
                    accessToken={accessToken}
                />
            </div>
        </div>
    );
};
