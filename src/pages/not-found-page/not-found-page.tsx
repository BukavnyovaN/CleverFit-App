import { NotFoundMessage } from "@components/not-found-message/not-found-message.tsx";

export const NotFoundPage = () => (
    <NotFoundMessage
        status={'404'}
        title='Такой страницы нет'
        subtitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
        extra={'На главную'}
    />
)
