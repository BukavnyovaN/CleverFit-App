import { DatePicker, Form, Input } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons';
import moment from 'moment';
import './personal-info-form-item.css';
import { DATE_FORMAT } from '@constants/date-format.ts';
import { PersonalInfo } from '../../../types/user-state.type.ts';

export const PersonalInfoFormItem = ({ personalInfo }: { personalInfo: PersonalInfo }) => (
    <div className='profile-form__personal-info-inputs'>
        <Form.Item name='firstName' initialValue={personalInfo.firstName || ''}>
            <Input type='text' data-test-id='profile-name' placeholder='Имя' />
        </Form.Item>
        <Form.Item name='lastName' initialValue={personalInfo.lastName || ''}>
            <Input type='text' data-test-id='profile-surname' placeholder='Фамилия' />
        </Form.Item>
        <Form.Item
            name='birthday'
            initialValue={personalInfo.birthday ? moment(personalInfo.birthday) : null}
        >
            <DatePicker
                data-test-id='profile-birthday'
                className='personal-info__datepicker'
                placeholder='Дата рождения'
                suffixIcon={<CalendarTwoTone twoToneColor={['#0000003F', '#0000003F']} />}
                value={personalInfo.birthday ? moment(personalInfo.birthday) : null}
                format={DATE_FORMAT}
            />
        </Form.Item>
    </div>
);
