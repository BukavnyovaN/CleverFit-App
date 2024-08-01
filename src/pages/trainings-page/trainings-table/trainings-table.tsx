import { Badge, Button, Table } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsData, updatedTrainingSelector } from '@utils/helpers/selectors.ts';
import { Training } from '@redux/actions/get-trainings.ts';
import { formatDate } from '@utils/helpers/format-date-to-iso-string.ts';
import { getPeriodName } from '@utils/helpers/get-period-name.ts';
import './trainings-table.css';
import { getTrainingsBadgeColor } from '@utils/helpers/get-training-bage-color.ts';
import {
    openEditTrainingsDrawer,
    saveTrainingId,
    saveUpdatedTraining,
} from '@redux/slice/app/app-slice.ts';
import { useEffect, useState } from 'react';
import { TrainingModal } from '@pages/trainings-page/training-modal/training-modal.tsx';
import { isFutureDate } from '@utils/helpers/check-is-future-date.ts';
import { useWindowWidth } from '@hooks/use-window-width.ts';

export const TrainingsTable = () => {
    const { width } = useWindowWidth();
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useAppDispatch();
    const trainings = useAppSelector(trainingsData);
    const updatedTraining = useAppSelector(updatedTrainingSelector);
    const [openTrainingModal, setOpenTrainingModal] = useState(false);

    const handleEditExercise = (record: Training) => {
        dispatch(saveTrainingId(record._id));
        dispatch(saveUpdatedTraining(record));
        dispatch(openEditTrainingsDrawer(true));
    };

    const openCardExercisesHandler = (record: Training) => {
        dispatch(saveUpdatedTraining(record));
        setOpenTrainingModal(true);
    };

    useEffect(() => {
        if (width < 400) {
            setPageSize(8);
        } else {
            setPageSize(10);
        }
    }, [width]);

    const columns: ColumnsType<Training> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingType',
            key: 'trainingType',
            className: 'first-column',
            render: (_text, record) => (
                <div
                    title={formatDate(record.date)}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div className='table__badge'>
                        <Badge color={getTrainingsBadgeColor(record?.name)} text={record?.name} />
                    </div>
                    <Button
                        type='link'
                        onClick={() => openCardExercisesHandler(record)}
                        disabled={!isFutureDate(formatDate(record.date))}
                    >
                        <DownOutlined style={{ color: '#000000' }} />
                    </Button>
                    {openTrainingModal && record._id === updatedTraining?._id && (
                        <TrainingModal setOpenTrainingModal={setOpenTrainingModal} />
                    )}
                </div>
            ),
        },
        {
            key: 'frequency',
            title: 'Периодичность',
            dataIndex: 'frequency',
            render: (_text, record) => <div>{getPeriodName(record.parameters?.period)}</div>,
            sorter: (a, b) => {
                const per1 = a.parameters?.period ?? 0;
                const per2 = b.parameters?.period ?? 0;

                return per1 - per2;
            },
        },
        {
            key: 'action',
            title: '',
            dataIndex: 'action',
            width: 30,
            className: 'table-edit-action',
            render: (_text, record, index: number) => (
                <Button
                    type='link'
                    disabled={record.isImplementation}
                    onClick={() => handleEditExercise(record)}
                    data-test-id={`update-my-training-table-icon${index}`}
                >
                    {record.isImplementation ? (
                        <EditOutlined
                            style={{
                                color: 'var( --character-light-secondary)',
                                fontSize: 'var(--font-size-lg)',
                            }}
                        />
                    ) : (
                        <EditOutlined style={{ fontSize: 'var(--font-size-lg)' }} />
                    )}
                </Button>
            ),
        },
    ];

    return (
        <Table
            data-test-id='my-trainings-table'
            columns={columns}
            pagination={{
                position: ['bottomLeft', 'bottomLeft'],
                pageSize: pageSize,
                size: 'small',
            }}
            dataSource={trainings}
            rowKey={Math.random}
        />
    );
};
