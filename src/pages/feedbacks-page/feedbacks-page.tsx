import { NoFeedback } from '@components/no-feedback/no-feedback.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getFeedback } from '@redux/actions/get-feedback.ts';
import { feedbacksData, loadingSelector } from '@utils/helpers/selectors.ts';
import { useEffect, useState } from 'react';
import { FeedbackItem } from '@components/feedback-item';

import './feedbacks-page.css';
import { Button } from 'antd';
import { Loader } from '@components/loader';
import { ModalFeedback } from '@components/modal-feedback/modal-feedback.tsx';
import { NoDataModal } from '@components/no-data-modal';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { logout } from '@redux/slice/user/user-slice.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(loadingSelector);
    const accessToken = useGetAccessToken();
    const data = useAppSelector(feedbacksData);

    const [error, setError] = useState<boolean>(false);
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAllFeedbacksClick = () => {
        setIsAllFeedbacks(!isAllFeedbacks);
    };
    const handleCreateFeedbacksClick = () => {
        setIsModalOpen(true);
    };

    const getData = async () => {
        const response = await dispatch(getFeedback({ accessToken })).unwrap();
        if (response === RequestResult.user_unauthorized) {
            localStorage.clear();
            dispatch(logout());
        } else if (response === RequestResult.error) {
            setError(true);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='feedbacks__wrapper'>
            {loading && <Loader />}
            {error && <NoDataModal />}
            {data.length > 0 ? (
                <div className='feedbacks__content'>
                    <div className='feedbacks__items'>
                        {isAllFeedbacks
                            ? data?.map((item) => <FeedbackItem key={item?.id} {...item} />)
                            : data
                                  ?.slice(0, 4)
                                  .map((item) => <FeedbackItem key={item?.id} {...item} />)}
                    </div>
                    <div className='feedbacks__buttons'>
                        <Button
                            className='no-feedback__button'
                            onClick={handleCreateFeedbacksClick}
                            data-test-id='write-review'
                            type='primary'
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            className='view-all__button'
                            type='link'
                            data-test-id='all-reviews-button'
                            onClick={handleAllFeedbacksClick}
                        >
                            <span>
                                {isAllFeedbacks ? 'Свернуть отзывы' : 'Развернуть все отзывы'}
                            </span>
                        </Button>
                    </div>
                </div>
            ) : (
                <NoFeedback handleButtonClick={handleCreateFeedbacksClick} />
            )}
            <ModalFeedback
                openModal={isModalOpen}
                setOpenModal={setIsModalOpen}
                accessToken={accessToken}
            />
        </div>
    );
};
