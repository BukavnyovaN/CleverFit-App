import { Tag } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsListSelector } from '@utils/helpers/selectors.ts';
import './achievements-tags.css';
import { AllFilter } from '../../enums/all-filter.enum.ts';

type AchievementsTagsProps = {
    selectedTag: string;
    handleChange: (tag: string) => void;
};

export const AchievementsTags = ({ selectedTag, handleChange }: AchievementsTagsProps) => {
    const trainingNames = useAppSelector(trainingsListSelector);

    return (
        <div className='achievements__tags'>
            <Tag.CheckableTag
                key={'all'}
                checked={selectedTag === AllFilter.allFilter}
                onChange={() => handleChange(AllFilter.allFilter)}
            >
                {AllFilter.allFilter}
            </Tag.CheckableTag>
            {trainingNames.map((name) => (
                <Tag.CheckableTag
                    key={name.key}
                    checked={selectedTag === name.name}
                    onChange={() => handleChange(name.name)}
                >
                    {name.name}
                </Tag.CheckableTag>
            ))}
        </div>
    );
};
