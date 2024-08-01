import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';

import { CardItem } from '@components/card/Card-item.tsx';

import './main-page.css';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { isErrorSelector, loadingSelector } from '@utils/helpers/selectors.ts';
import { Loader } from '@components/loader';
import { NoDataModal } from '@components/no-data-modal';

export const MainPage = () => {
    const navigate = useNavigate();
    const loading = useAppSelector(loadingSelector);
    const isError = useAppSelector(isErrorSelector);

    const navigateToFeedback = () => {
        navigate(PATHS.FEEDBACKS);
    };

    return (
        <div>
            {loading && <Loader />}
            {isError && <NoDataModal />}
            <div className={'layout-content'}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card className='content__card' style={{ borderRadius: '2px' }}>
                            <ul className='card__content'>
                                С CleverFit ты сможешь:
                                <li className='card__item'>
                                    — планировать свои тренировки на календаре, выбирая тип и
                                    уровень нагрузки;
                                </li>
                                <li className='card__item'>
                                    — отслеживать свои достижения в разделе статистики, сравнивая
                                    свои результаты с нормами и рекордами;
                                </li>
                                <li className='card__item'>
                                    — создавать свой профиль, где ты можешь загружать свои фото,
                                    видео и отзывы о тренировках;
                                </li>
                                <li className='card__item'>
                                    — выполнять расписанные тренировки для разных частей тела,
                                    следуя подробным инструкциям и советам профессиональных
                                    тренеров.
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card className='content__card' style={{ borderRadius: '2px' }}>
                            <h2 className='content__subheading'>
                                CleverFit — это не просто приложение, а твой личный помощник в мире
                                фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                            </h2>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <CardItem
                            title='Расписать тренировки'
                            icon='HeartFilled'
                            iconColor='var(--primary-light-blue)'
                            buttonText='Тренировки'
                            buttonLink={PATHS.TRAININGS}
                            dataTestId={'menu-button-training'}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CardItem
                            title='Назначить календарь'
                            icon='CalendarTwoTone'
                            iconColor='var(--primary-light-blue)'
                            buttonText='Календарь'
                            buttonLink={PATHS.CALENDAR}
                            dataTestId='menu-button-calendar'
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CardItem
                            title='Заполнить профиль'
                            icon='IdcardOutlined'
                            iconColor='var(--primary-light-blue)'
                            buttonText='Профиль'
                            buttonLink={PATHS.PROFILE}
                            dataTestId='menu-button-profile'
                        />
                    </Col>
                </Row>
            </div>
            <div className={'layout-footer'}>
                <div
                    data-test-id='see-reviews'
                    className={'card-footer__link'}
                    onClick={navigateToFeedback}
                >
                    <a>Смотреть отзывы</a>
                </div>
                <Card
                    className={'layout-footer__card'}
                    style={{ borderRadius: '2px', textAlign: 'center', maxWidth: '240px' }}
                >
                    <Card.Grid style={{ width: '100%', padding: '12px 24px' }}>
                        <div className={'card-footer__link'}>
                            <a>Скачать на телефон</a>
                        </div>
                        <div className={'card-footer__helper-text'}>Доступно в PRO-тарифе</div>
                    </Card.Grid>
                    <Card.Grid
                        style={{
                            width: '100%',
                            padding: '12px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <div className={'card-footer__os'}>
                            <AndroidFilled />
                            Android OS
                        </div>
                        <div className={'card-footer__os'}>
                            <AppleFilled />
                            Apple iOS
                        </div>
                    </Card.Grid>
                </Card>
            </div>
        </div>
    );
};
