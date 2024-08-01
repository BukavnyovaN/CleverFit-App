import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Badge } from 'antd';
import { CalendarCellModal } from '@components/calendar-ceil-modal/calendar-cell-modal.tsx';
import { ListData } from '@pages/calendar-page/calendar-page.tsx';
import './calendar-cell.css';

type CalendarCellProps = {
    listData: ListData[];
    date: string;
    handleCloseModal: () => void;
    activeDateModal: string;
    handleSelect: Dispatch<SetStateAction<string>>;
    setIsErrorCreatingTraining: Dispatch<SetStateAction<boolean>>;
    isDesktop: boolean;
    day: number;
};

export const CalendarCell = ({
    listData,
    date,
    handleCloseModal,
    activeDateModal,
    handleSelect,
    setIsErrorCreatingTraining,
    isDesktop,
    day,
}: CalendarCellProps) => {
    const cellRef = useRef<HTMLDivElement>(null);
    const [modalPosition, setModalPosition] = useState<DOMRect>({} as DOMRect);

    useEffect(() => {
        const cellRect = cellRef.current?.getBoundingClientRect();
        if (cellRect && date === activeDateModal) {
            setModalPosition(cellRect);
        }
    }, [activeDateModal, listData]);

    return (
        <div ref={cellRef}>
            {!isDesktop ? (
                listData.length > 0 ? (
                    <div ref={cellRef} className={'has_exercises'}>
                        {date.split('.')[0]}
                    </div>
                ) : (
                    <div ref={cellRef} className={'no_exercises'}></div>
                )
            ) : (
                listData.map((item) =>
                    item.isImplementation ? (
                        <div key={item.name}>
                            <Badge
                                className={'fulfilled-exercise'}
                                color={item.color}
                                text={item.name}
                            />
                        </div>
                    ) : (
                        <div key={item.name}>
                            <Badge color={item.color} text={item.name} />
                        </div>
                    ),
                )
            )}
            {date === activeDateModal && (
                <CalendarCellModal
                    isDesktop={isDesktop}
                    day={day}
                    handleSelect={handleSelect}
                    handleClose={handleCloseModal}
                    date={date}
                    trainingsData={listData}
                    isErrorCreatingTraining={setIsErrorCreatingTraining}
                    modalPosition={modalPosition}
                />
            )}
        </div>
    );
};
