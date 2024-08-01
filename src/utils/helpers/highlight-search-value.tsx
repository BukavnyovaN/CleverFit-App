type highlightSearchValueParams = {
    name: string;
    searchValue?: string;
};
export const HighlightSearchValue = ({ name, searchValue }: highlightSearchValueParams) => {
    if (!searchValue) return name;

    const regex = new RegExp(searchValue, 'ig');
    const matches = name.match(regex);

    if (matches) {
        return name.split(regex).map((start, index, array) => {
            if (index < array.length - 1) {
                const end = matches.shift();

                return (
                    <>
                        {start}
                        <span style={{ color: '#FF0000' }}>{end}</span>
                    </>
                );
            }

            return start;
        });
    }

    return name;
};
