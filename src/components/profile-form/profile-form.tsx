import './profile-form.css';
import { Alert, Button, Form, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { personalInfoSelector } from '@utils/helpers/selectors.ts';
import { UploadFileStatus } from 'antd/es/upload/interface';
import { NotificationModal } from '@components/notification-modal/notification-modal.tsx';
import { useForm } from 'antd/lib/form/Form';
import {
    generateUpdateUserBody,
    ProfileFormValues,
} from '@utils/helpers/generate-update-user-body.ts';
import { updateUserInfo } from '@redux/actions/update-user-info.ts';
import { getUserInfo } from '@redux/actions/get-user-info.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { UploadFormItem } from '@components/profile-form/upload-form-item/upload-form-item.tsx';
import { PersonalInfoFormItem } from '@components/profile-form/personal-info-form-item/personal-info-form-item.tsx';
import { CredentialsFormItem } from '@components/profile-form/credentials-form-item/credentials-form-item.tsx';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { useWindowWidth } from '@hooks/use-window-width.ts';

type FormState = Partial<{
    touched: boolean;
    validating: boolean;
    errors: string[];
    warnings: string[];
    name: string[];
    validated: boolean;
}>;

const initialFile = {
    uid: '1',
    name: 'image.png',
    url: '',
};

export const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const accessToken = useGetAccessToken();
    const personalInfo = useAppSelector(personalInfoSelector);
    const { width } = useWindowWidth();
    const [url, setUrl] = useState(personalInfo.imgSrc);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isLargeFile, setIsLargeFile] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>(url ? [initialFile] : []);
    const [showPreview, setShowPreview] = useState(!!fileList[0]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isUpdateError, setIsUpdateError] = useState(false);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const handleImageChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
        setShowPreview(true);
        setIsButtonDisabled(false);
        const newFile = newFileList[0];

        if (newFile) {
            if (newFile.status === 'error') {
                const errorFile = {
                    ...initialFile,
                    url: '',
                    name: newFile.name,
                    status: 'error' as UploadFileStatus,
                };
                setIsButtonDisabled(true);
                setFileList([errorFile]);
            }

            if (newFile.error?.status === 409) {
                setIsButtonDisabled(true);
                setIsLargeFile(true);
            }
        }
    };

    const handleFormChange = (allFields: FormState[]) => {
        const fieldsToCheck = ['firstName', 'lastName', 'birthday', 'password', 'confirmPassword'];
        const hasChanges = allFields.some((field) => {
            const fieldName =
                Array.isArray(field.name) && field.name.length > 0 ? field.name[0] : '';
            return (
                fieldsToCheck.includes(fieldName) && field.touched !== undefined && field.touched
            );
        });

        const hasErrors = allFields.some((field) => {
            return Array.isArray(field.errors) && field.errors.length > 0;
        });

        setIsButtonDisabled(!(hasChanges && !hasErrors));
    };

    const onFinish = async (values: ProfileFormValues) => {
        const updateUserBody = generateUpdateUserBody(values);
        const response = await dispatch(
            updateUserInfo({ accessToken, userInfo: updateUserBody }),
        ).unwrap();

        if (response === RequestResult.success) {
            setIsUpdateSuccess(true);
        } else {
            setIsUpdateError(true);
        }
        dispatch(getUserInfo({ accessToken }));
        setIsButtonDisabled(true);
        form.resetFields(['password', 'confirmPassword']);
    };

    useEffect(() => {
        if (personalInfo.imgSrc) {
            const updatedFileList = fileList.length > 0 ? fileList : [initialFile];
            updatedFileList[0].url = personalInfo.imgSrc;
            setFileList(updatedFileList);
            setUrl(personalInfo.imgSrc);
            setShowPreview(true);
        } else {
            setFileList([]);
            setUrl('');
            setShowPreview(false);
        }
    }, [personalInfo.imgSrc]);

    useEffect(() => {
        fileList[0]?.response?.url ? setUrl(fileList[0].response.url) : setUrl(personalInfo.imgSrc);
        setShowPreview(!!fileList[0]);
    }, [fileList]);

    useEffect(() => {
        if (Number(width) && Number(width) < 700) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }, [width]);

    return (
        <div className='profile-form__wrapper'>
            <NotificationModal
                textButton={'Закрыть'}
                title={'Файл слишком большой'}
                subtitle={'Выберите файл размером до 5 МБ.'}
                isCloseIcon={false}
                open={isLargeFile}
                onClickButton={() => setIsLargeFile(false)}
                dataTestId={'big-file-error-close'}
            />
            <Form
                form={form}
                onFinish={onFinish}
                onFieldsChange={(_, allFields) => handleFormChange(allFields)}
            >
                <div className='profile-form__subtitle'>Личная информация</div>
                <Form.Item className='profile-form__personal-info'>
                    <Form.Item
                        className='profile-form__avatar'
                        name='avatar'
                        data-test-id='profile-avatar'
                    >
                        <UploadFormItem
                            accessToken={accessToken}
                            fileList={fileList}
                            isDesktop={isDesktop}
                            showPreview={showPreview}
                            onChange={handleImageChange}
                        />
                    </Form.Item>
                    <PersonalInfoFormItem personalInfo={personalInfo} />
                </Form.Item>
                <div className='profile-form__subtitle'>Приватность и авторизация</div>
                <CredentialsFormItem setIsButtonDisabled={setIsButtonDisabled} />
                <Form.Item>
                    <Button
                        className='profile-form__submit-button'
                        type='primary'
                        htmlType='submit'
                        data-test-id='profile-submit'
                        disabled={isButtonDisabled}
                    >
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
            <NotificationModal
                textButton={'Закрыть'}
                title={'При сохранении данных произошла ошибка'}
                subtitle={'Придётся попробовать ещё раз'}
                isCloseIcon={false}
                open={isUpdateError}
                onClickButton={() => setIsUpdateError(false)}
            />
            {isUpdateSuccess && (
                <Alert
                    className='profile-form__alert'
                    message='Данные профиля успешно обновлены'
                    data-test-id='alert'
                    type='success'
                    onClose={() => setIsUpdateSuccess(false)}
                    showIcon
                    closable
                />
            )}
        </div>
    );
};
