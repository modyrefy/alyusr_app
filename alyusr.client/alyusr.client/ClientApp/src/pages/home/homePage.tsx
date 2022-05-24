import { FC, useEffect } from "react";
import {AuthenticateUser} from "../../serviceBroker/defaultServiceBroker";
import {json} from "stream/consumers";

export const HomePage: FC<{}> = () => {
    useEffect(() => {
        const fillData = async () => {
            const data = await AuthenticateUser({ userName: "admin", password: "1" });
            console.log('AuthenticateUser', data);
        }
        fillData();
    }, []);
    
    
    return (<>Home Page </>)
}
