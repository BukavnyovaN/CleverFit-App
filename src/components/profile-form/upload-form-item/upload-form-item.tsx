import { Button, Upload, UploadFile } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ENDPOINTS } from '@constants/endpoints.ts';
import './upload-form-item.css';
import { AccessToken } from '../../../enums/access-token.enum.ts';

type AvatarUploadProps = {
    accessToken: string | null;
    fileList: UploadFile[];
    isDesktop: boolean;
    showPreview: boolean;
    onChange: (info: { fileList: UploadFile[] }) => void;
};

export const UploadFormItem = ({
    accessToken,
    fileList,
    isDesktop,
    showPreview,
    onChange,
}: AvatarUploadProps) => {
    const listType = isDesktop ? 'picture-card' : 'picture';

    return (
        <Upload
            maxCount={1}
            action={`${ENDPOINTS.BASE_URL + ENDPOINTS.UPLOAD_PROFILE_IMAGE}`}
            headers={{ authorization: AccessToken.bearer + accessToken }}
            listType={listType}
            fileList={fileList}
            accept='image/*'
            onChange={onChange}
            progress={{
                strokeWidth: 4,
                showInfo: false,
                size: 'default',
                strokeColor: '#2F54EB',
            }}
        >
            {!showPreview &&
                (isDesktop ? (
                    <button
                        className='upload__button-desktop'
                        type='button'
                        data-test-id='profile-avatar'
                    >
                        <PlusOutlined />
                        <div className='profile-form__button-text'>Загрузить фото профиля</div>
                    </button>
                ) : (
                    <div className='upload__button-mobile' data-test-id='profile-avatar'>
                        <span>Загрузить фото профиля:</span>
                        <Button icon={<UploadOutlined />}>Загрузить</Button>
                    </div>
                ))}
        </Upload>
    );
};
