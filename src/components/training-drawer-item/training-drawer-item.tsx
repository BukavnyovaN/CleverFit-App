import { Checkbox, Input, InputNumber } from 'antd';

import './training-drawer-item.css';
import { ChangeEvent } from 'react';
import { Exercise } from '@utils/helpers/generate-trainings-data.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsDrawerSelector } from '@utils/helpers/selectors.ts';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type TrainingDrawerItemProps = {
    onInputChange: (
        exerciseIndex: number,
        field: keyof Exercise,
        value: string | number | boolean,
    ) => void;
    id: number;
    nameValue: string;
    replaysValue: number;
    weightValue: number;
    approachesValue: number;
    isImplementationValue: boolean;
};

export const TrainingDrawerItem = ({
    onInputChange,
    id,
    nameValue = '',
    replaysValue = 1,
    weightValue = 0,
    approachesValue = 1,
    isImplementationValue = false,
}: TrainingDrawerItemProps) => {
    const drawerState = useAppSelector(trainingsDrawerSelector);

    const handleApproachesChange = (value: number | null) => {
        onInputChange(id, 'approaches', value || 0);
    };
    const handleWeightChange = (value: number | null) => {
        onInputChange(id, 'weight', value || 0);
    };
    const handleReplaysChange = (value: number | null) => {
        onInputChange(id, 'replays', value || 1);
    };
    const handleNameChange = (event: ChangeEvent<HTMLInputElement> | null) => {
        onInputChange(id, 'name', event?.target.value || '');
    };

    const handleCheckboxChange = (event: CheckboxChangeEvent) => {
        onInputChange(id, 'isImplementation', event?.target.checked);
    };

    return (
        <div className='trainings-item__wrapper'>
            {drawerState.isEditDrawer ? (
                <Input
                    data-test-id={`modal-drawer-right-input-exercise${id}`}
                    value={nameValue || undefined}
                    onChange={(event) => handleNameChange(event)}
                    addonAfter={
                        <Checkbox
                            data-test-id={`modal-drawer-right-checkbox-exercise${id}`}
                            checked={isImplementationValue}
                            onChange={handleCheckboxChange}
                        />
                    }
                />
            ) : (
                <Input
                    data-test-id={`modal-drawer-right-input-exercise${id}`}
                    onChange={(event) => handleNameChange(event)}
                    className='drawer-item__exercises-input'
                    placeholder='Упражнение'
                    value={nameValue || ''}
                />
            )}
            <div className='drawer-item__exercises'>
                <div>
                    <div className='drawer-item__exercises-title'>Подходы</div>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-approach${id}`}
                        onChange={(value: number | null) => {
                            handleReplaysChange(value);
                        }}
                        className='drawer-item__exercises-input'
                        addonBefore='+'
                        placeholder={'1'}
                        min={1}
                        type='number'
                        value={replaysValue || undefined}
                    />
                </div>
                <div className='drawer-item__count'>
                    <div>
                        <div className='drawer-item__exercises-title'>Вес, кг</div>
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-weight${id}`}
                            onChange={(value: number | null) => {
                                handleWeightChange(value);
                            }}
                            className='drawer-item__exercises-input'
                            placeholder={'0'}
                            min={0}
                            type='number'
                            value={weightValue || undefined}
                        />
                    </div>
                    <div className='drawer-item__multiple'>x</div>
                    <div>
                        <div className='drawer-item__exercises-title'>Количество</div>
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-quantity${id}`}
                            onChange={(value: number | null) => handleApproachesChange(value)}
                            className='drawer-item__exercises-input'
                            placeholder={'3'}
                            min={1}
                            value={approachesValue || undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
