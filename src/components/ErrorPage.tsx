import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
