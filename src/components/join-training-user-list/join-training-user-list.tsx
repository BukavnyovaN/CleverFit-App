import { Button, Input, List } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { joinUsersSelector } from '@utils/helpers/selectors.ts';
import { JoinTrainingUserCard } from '@components/join-training-user-card';
import './join-training-user-list.css';
import { useWindowWidth } from '@hooks/use-window-width.ts';

type JoinTrainingUserListProps = {
    handleBack: Dispatch<SetStateAction<boolean>>;
};

const { Search } = Input;

export const JoinTrainingUserList = ({ handleBack }: JoinTrainingUserListProps) => {
    const joinTrainingUsers = useAppSelector(joinUsersSelector);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(14);
    const { width } = useWindowWidth();

    const filteredTrainingList = joinTrainingUsers.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => {
        if (width < 400) {
            setPageSize(8);
        } else {
            setPageSize(14);
        }
    }, [width]);

    return (
        <div className='join-tarining__user-list'>
            <div className='join-tarining__search'>
                <Button
                    onClick={() => handleBack(false)}
                    icon={<ArrowLeftOutlined />}
                    type='text'
                    className='join-tarining__search-btn'
                >
                    Назад
                </Button>
                <Search
                    data-test-id='search-input'
                    placeholder='Поиск по имени'
                    onSearch={handleSearch}
                    className='join-tarining__search-input'
                />
            </div>
            <List
                dataSource={filteredTrainingList}
                renderItem={(user, index: number) => (
                    <JoinTrainingUserCard
                        dataTestId={`joint-training-cards${index}`}
                        user={user}
                        elem={'join-training-users-list'}
                        searchValue={searchValue}
                        key={user.id}
                    />
                )}
                pagination={
                    filteredTrainingList.length > 12 && {
                        pageSize: pageSize,
                        size: 'small',
                    }
                }
            />
        </div>
    );
};
