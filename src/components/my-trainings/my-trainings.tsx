import React from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button } from 'antd';
import { trainingsData } from '@utils/helpers/selectors.ts';
import { openTrainingsDrawer } from '@redux/slice/app/app-slice.ts';
import './my-trainings.css';
import { TrainingsTable } from '@pages/trainings-page/trainings-table/trainings-table.tsx';

export const MyTrainings = () => {
    const dispatch = useAppDispatch();
    const trainings = useAppSelector(trainingsData);

    const openDrawer = () => {
        dispatch(openTrainingsDrawer(true));
    };

    return (
        <React.Fragment>
            {trainings.length ? (
                <div className='my-trainings__table'>
                    <TrainingsTable />
                    <Button
                        type='primary'
                        size='large'
                        className='my-trainings__empty-button'
                        onClick={openDrawer}
                        data-test-id='create-new-training-button'
                    >
                        + Новая тренировка
                    </Button>
                </div>
            ) : (
                <div className='my-trainings__empty'>
                    <div className='my-trainings__empty-title'>
                        У вас еще нет созданных тренировок
                    </div>
                    <Button
                        type='primary'
                        size='large'
                        className='my-trainings__empty-button'
                        onClick={openDrawer}
                        style={{ marginTop: '75px' }}
                        data-test-id='create-new-training-button'
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
};
