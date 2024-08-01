import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsPalsSelector } from '@utils/helpers/selectors.ts';
import { List, Space } from 'antd';
import './training-pals.css';
import { JoinTrainingUserCard } from '@components/join-training-user-card';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { JoinTrainingUser } from '@redux/slice/trainings/trainings-slice.ts';
import { TrainingPalModal } from '@components/training-pal-modal/training-pal-modal.tsx';
import { ArrowLeftOutlined } from '@ant-design/icons';

type TrainingPalsProps = {
    elem: string;
    showBackButton?: boolean;
    onBack?: Dispatch<SetStateAction<boolean>>;
};

export const TrainingPals = ({ elem, showBackButton, onBack }: TrainingPalsProps) => {
    const trainingPals = useAppSelector(trainingsPalsSelector);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPal, setSelectedPal] = useState({} as JoinTrainingUser);

    const onCloseModal = () => {
        setOpenModal(false);
        setSelectedPal({} as JoinTrainingUser);
        onBack?.(false);
    };

    useEffect(() => {
        if (selectedPal.name) {
            setOpenModal(true);
        }
    }, [selectedPal]);
    return (
        <>
            <div className='training-pals'>
                <div className='training-pals__title'>
                    {showBackButton && (
                        <span onClick={() => onBack?.(false)}>
                            <ArrowLeftOutlined size={5} />
                        </span>
                    )}
                    Мои партнёры по тренировкам
                </div>
                {trainingPals?.length ? (
                    <Space className='training-pals__pals-list'>
                        <List
                            dataSource={trainingPals}
                            renderItem={(pal, index: number) => (
                                <JoinTrainingUserCard
                                    dataTestId={`joint-training-cards${index}`}
                                    user={pal}
                                    elem={elem}
                                    setSelectedPal={setSelectedPal}
                                />
                            )}
                        />
                    </Space>
                ) : (
                    <div className='training-pals__empty'>
                        У вас пока нет партнёров для совместных тренировок
                    </div>
                )}
            </div>
            <TrainingPalModal open={openModal} onClose={onCloseModal} partner={selectedPal} />
        </>
    );
};
