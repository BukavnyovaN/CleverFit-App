import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { updatedTrainingSelector } from '@utils/helpers/selectors.ts';
import './training-modal.css';
import { getTrainingsBadgeColor } from '@utils/helpers/get-training-bage-color.ts';
import { Dispatch, SetStateAction } from 'react';
import { openEditTrainingsDrawer } from '@redux/slice/app/app-slice.ts';

type TrainingModalProps = {
    setOpenTrainingModal: Dispatch<SetStateAction<boolean>>;
};

export const TrainingModal = ({ setOpenTrainingModal }: TrainingModalProps) => {
    const updatedTraining = useAppSelector(updatedTrainingSelector);
    const color = getTrainingsBadgeColor(updatedTraining?.name);
    const dispatch = useAppDispatch();

    const handleCloseAction = () => {
        setOpenTrainingModal(false);
    };

    const handleAddTraining = () => {
        dispatch(openEditTrainingsDrawer(true));
    };

    return (
        <div className='training-modal' data-test-id='modal-create-exercise'>
            <div className='training-modal__wrapper' style={{ borderBottom: `3px solid ${color}` }}>
                <div onClick={handleCloseAction}>
                    <ArrowLeftOutlined
                        data-test-id='modal-exercise-training-button-close'
                        style={{ color: 'var(--character-light-primary)' }}
                    />
                </div>
                <div>{updatedTraining?.name}</div>
            </div>
            <div className={'training-modal__training-items'}>
                {updatedTraining?.exercises.map((exercise) => (
                    <div className='cell-modal__training-item' key={exercise.name}>
                        <div>{exercise.name}</div>
                    </div>
                ))}
            </div>
            <div className='training-modal__buttons'>
                <Button onClick={handleAddTraining}>Добавить упражнения</Button>
            </div>
        </div>
    );
};
