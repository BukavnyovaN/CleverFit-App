import { useEffect, useState } from 'react';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Drawer, Form, Radio, Typography } from 'antd';
import moment from 'moment';
import { personalInfoSelector, subscriptionSelector } from '@utils/helpers/selectors.ts';
import { TariffsInfo } from '@constants/tariffs-data.ts';
import './tariffs-drawer.css';
import { generateTariffByDays } from '@utils/helpers/generate-tariff-body.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { postProTariff } from '@redux/actions/post-pro-tariff.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { TariffsPaymentModal } from '@components/tariffs-payment-modal/tariffs-payment-modal.tsx';
import { useWindowWidth } from '@hooks/use-window-width.ts';

type TariffsDrawer = {
    open: boolean;
    handleClose: () => void;
};

export const TariffsDrawer = ({ open, handleClose }: TariffsDrawer) => {
    const tariffs = useAppSelector(subscriptionSelector);
    const profileInfo = useAppSelector(personalInfoSelector);
    const dispatch = useAppDispatch();
    const { width } = useWindowWidth();
    const accessToken = useGetAccessToken();
    const [isFormTouched, setIsFormTouched] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isProTariff = profileInfo?.tariff?.tariffId;
    const date = moment(profileInfo.tariff?.expired);
    const month = date.month() + 1;
    const day = date.date();
    const onFieldsChange = () => {
        setIsFormTouched(true);
    };

    const onFinish = async ({ days }: { days: number }) => {
        const body = generateTariffByDays(tariffs[0], days);
        const response = await dispatch(postProTariff({ accessToken, tariffBody: body })).unwrap();
        if (response === RequestResult.success) {
            setIsModalOpen(true);
        }
        handleClose();
    };

    useEffect(() => {
        if (Number(width) && Number(width) < 500) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }, [width]);

    return (
        <>
            <Drawer
                className={isDesktop ? 'tariffs-drawer' : 'tariffs-drawer-mobile'}
                title='Сравнить тарифы'
                data-test-id='tariff-sider'
                open={open}
                onClose={handleClose}
                key={'tariffs_drawer'}
                mask={false}
                placement={isDesktop ? 'right' : 'bottom'}
                height={isDesktop ? '100%' : '85%'}
                closable={true}
                destroyOnClose={true}
                maskClosable={true}
                footer={
                    !isProTariff && (
                        <Button
                            className='tariffs-drawer__submit'
                            form='form'
                            type='primary'
                            htmlType='submit'
                            disabled={!isFormTouched}
                            data-test-id='tariff-submit'
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                {isProTariff && (
                    <div className='tariffs-drawer__pro-info'>
                        Ваш PRO tarif активен до {String(day).padStart(2, '0')}.
                        {String(month).padStart(2, '0')}
                    </div>
                )}
                <div className='tariffs-drawer__tariffs'>
                    <div className='tariffs-drawer__tariffs-free'>FREE</div>
                    <div className='tariffs-drawer__tariffs-pro'>
                        PRO {isProTariff && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    </div>
                </div>
                <div className='tariffs-drawer__tariffs-info'>
                    {TariffsInfo.map(({ title, free }, index) => (
                        <div key={index} className='tariffs-drawer__tariffs-infoitem'>
                            <div className='tariffs-drawer__tariffs-title'>{title}</div>
                            {free ? (
                                <CheckCircleFilled />
                            ) : (
                                <CloseCircleOutlined style={{ color: '#bfbfbf' }} />
                            )}
                            <CheckCircleFilled className='tariffs-drawer__tariffs-checked' />
                        </div>
                    ))}
                </div>
                {!isProTariff && tariffs && (
                    <Form
                        id='form'
                        className='tariffs-drawer__form'
                        onFieldsChange={onFieldsChange}
                        onFinish={onFinish}
                        data-test-id='tariff-cost'
                    >
                        <div className='tariffs-drawer__form-title'>Стоимость тарифа</div>
                        <Form.Item name='days'>
                            <Radio.Group className='tariffs-drawer__form-prices'>
                                {tariffs[0]?.periods.map(({ text, cost, days }) => (
                                    <Radio value={days} key={text} data-test-id={`tariff-${cost}`}>
                                        <div className='tariffs-drawer__form-label'>
                                            {text}
                                            <Typography.Title
                                                level={5}
                                                className='tariffs-drawer__form-price'
                                            >
                                                {String(cost).replace('.', ',')} $
                                            </Typography.Title>
                                        </div>
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                )}
            </Drawer>
            <TariffsPaymentModal open={isModalOpen} />
        </>
    );
};
