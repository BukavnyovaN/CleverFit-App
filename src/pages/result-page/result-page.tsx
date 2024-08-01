import { Navigate, Outlet, useLocation } from "react-router-dom";
import { prevLocationsSelector } from "@utils/helpers/selectors.ts";
import { useAppSelector } from "@hooks/typed-react-redux-hooks.ts";

export const ResultPage = () => {
    const location = useLocation();
    const prevLocations = useAppSelector(prevLocationsSelector);

    return (
        (!!location.state?.pathname && !!prevLocations) ?
                <>
                    <Outlet/>
                </> :
                <Navigate to={'/main'}/>

    );
};
