import { useContext, ReactNode } from "react";
import { NextPage } from "next";
import { Spinner } from "flowbite-react";

import Header from "common/components/Header";
import Popups from 'common/components/Popups';

import { LoaderContext } from 'common/context';

interface Props {
    children: ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
    const { isLoading, setIsLoading } = useContext(LoaderContext);

    return (
        <>
            {
                isLoading &&
                <div className="flex justify-center items-center absolute w-full h-full bg-black/50" style={{ zIndex: 1050 }}>
                    <Spinner size="xl" color="warning" />
                </div>
            }
            <Popups />
            <Header />
            {children}
        </>

    );
};

export default Layout;