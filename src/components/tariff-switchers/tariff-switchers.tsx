import { InfoCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Form, FormProps, Switch, Tooltip } from 'antd';
import { emailSelector, personalInfoSelector } from '@utils/helpers/selectors.ts';
import { SwitchersData } from '@constants/switchers-data.ts';
import './tariff-switchers.css';
import { useWindowWidth } from '@hooks/use-window-width.ts';
import { useEffect, useState } from 'react';
import { generateUpdateSettings } from '@utils/helpers/generate-update-settings.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { updateUserInfo } from '@redux/actions/update-user-info.ts';
import { getUserInfo } from '@redux/actions/get-user-info.ts';

export const TariffSwitchers = () => {
    const profileInfo = useAppSelector(personalInfoSelector);
    const email = useAppSelector(emailSelector);
    const accessToken = useGetAccessToken();
    const dispatch = useAppDispatch();
    const { width } = useWindowWidth();
    const [isDesktop, setIsDesktop] = useState(true);

    const isProUser = profileInfo?.tariff?.tariffId;
    const switchSize = isDesktop ? 'default' : 'small';
    const tooltipPlacement = isDesktop ? 'bottom' : 'top';

    const handleChange: FormProps['onFieldsChange'] = async (fields) => {
        if (fields[0].name === SwitchersData[2].name) {
            return;
        }
        const body = generateUpdateSettings(email, fields);
        await dispatch(updateUserInfo({ accessToken, userInfo: body })).unwrap();
        await dispatch(getUserInfo({ accessToken }));
    };

    useEffect(() => {
        if (Number(width) && Number(width) < 500) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }, [width]);

    return (
        <Form
            className='tariffs-switchers__form'
            initialValues={profileInfo}
            onFieldsChange={handleChange}
        >
            {SwitchersData.map(({ title, tooltip, forPro, name, dataTestId, dataTestIdIcon }) => {
                const hidePro = !isProUser && forPro;

                return (
                    <div className='tariffs-switchers__switcher' key={title}>
                        <div className='tariffs-switchers__content'>
                            <span className='tariffs-switchers__title'>{title}</span>
                            <Tooltip title={tooltip} placement={tooltipPlacement}>
                                <InfoCircleOutlined
                                    data-test-id={dataTestIdIcon}
                                    className='tariffs-switchers__info'
                                />
                            </Tooltip>
                        </div>
                        <Form.Item
                            name={name}
                            key={title}
                            valuePropName='checked'
                            className='tariffs-switchers__switcher'
                        >
                            <Switch
                                checked={profileInfo[name]}
                                disabled={hidePro}
                                size={switchSize}
                                data-test-id={dataTestId}
                            />
                        </Form.Item>
                    </div>
                );
            })}
        </Form>
    );
};
