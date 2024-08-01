import { useCallback, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { personalInfoSelector } from '@utils/helpers/selectors.ts';
import moment from 'moment';
import { Tariffs } from '@constants/tariffs.ts';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './tariff-cards.css';
import { TariffsDrawer } from '@components/tariffs-drawer';

export const TariffCards = () => {
    const [openTariffsDrawer, setOpenTariffsDrawer] = useState(false);
    const profileInfo = useAppSelector(personalInfoSelector);

    const isProUser = profileInfo?.tariff?.tariffId;
    const date = moment(profileInfo.tariff?.expired);
    const month = date.month() + 1;
    const day = date.date();

    const handleOpen = () => {
        setOpenTariffsDrawer(true);
    };

    const handleClose = useCallback(() => {
        setOpenTariffsDrawer(false);
    }, []);

    return (
        <div>
            <div className='tariffs-cards__title'>Мой тариф</div>
            <div className='tariffs-cards__cards'>
                {Tariffs.map(({ title, img, forPro, dataTestId }) => {
                    const hidePro = !isProUser && forPro;
                    return (
                        <Card
                            className='tariffs-cards__card'
                            title={title}
                            extra={
                                <Button type='link' onClick={handleOpen}>
                                    Подробнее
                                </Button>
                            }
                            key={title}
                            hoverable={false}
                            data-test-id={dataTestId}
                            cover={
                                <div className='cover'>
                                    <img
                                        className={hidePro ? 'inactive' : ''}
                                        alt={title}
                                        src={img}
                                    />
                                    {hidePro && (
                                        <div className='tariffs-cards__inactive-background' />
                                    )}
                                </div>
                            }
                        >
                            {!hidePro && (
                                <div className='tariffs-cards__active'>
                                    <div>
                                        активен
                                        {isProUser && title.includes('PRO') && (
                                            <div>
                                                до {String(day).padStart(2, '0')}.
                                                {String(month).padStart(2, '0')}
                                            </div>
                                        )}
                                    </div>
                                    {title.includes('FREE') && <CheckOutlined />}
                                </div>
                            )}
                            {hidePro && (
                                <Button
                                    data-test-id='activate-tariff-btn'
                                    className='tariffs-cards__button'
                                    type='primary'
                                    onClick={handleOpen}
                                >
                                    Активировать
                                </Button>
                            )}
                        </Card>
                    );
                })}
            </div>
            <TariffsDrawer open={openTariffsDrawer} handleClose={handleClose} />
        </div>
    );
};
