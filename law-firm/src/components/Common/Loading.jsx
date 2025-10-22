import { MagnifyingGlass, ColorRing } from "react-loader-spinner";

export const Loading = () => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
                background: 'rgba(244, 245, 243, 0.1)',
                backdropFilter: 'blur(8px)'
            }}
        >

            <div className="flex flex-col items-center">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperClass="color-ring-wrapper"
                    colors={[
                        '#001b1e',
                        '#003a42',
                        '#005459',
                        '#007c78',
                        '#7fc3be'
                    ]}
                />
                <p className="text-primary text-3xl">Loading..</p>
            </div>


        </div>
    );
};

export default Loading;