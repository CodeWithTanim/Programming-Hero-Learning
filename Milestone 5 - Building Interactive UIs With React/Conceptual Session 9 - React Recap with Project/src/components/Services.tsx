
const Services = () => {
    return (
        <div>
            <div className="max-w-5xl mx-auto my-20">
                <h2 className="font-bold text-3xl text-green-500">Services</h2>

                <div className="text-center grid grid-cols-3 gap-5 mx-auto py-8">
                    <div className="rounded-xl bg-[#F0EDE5] p-6">
                        <div className="w-29 h-29 bg-white rounded-full mx-auto flex items-center justify-center">
                            <img
                                src="../assets/service.png"
                                className="w-24 h-24 object-contain"
                                alt=""
                            />
                        </div>

                        <h2 className="font-bold text-xl mt-4">24/7 Services</h2>

                        <p className="text-gray-500 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt
                        </p>
                    </div>

                    <div className="rounded-xl bg-[#F0EDE5] p-6">
                        <div className="w-29 h-29 bg-white rounded-full mx-auto flex items-center justify-center">
                            <img
                                src="../assets/delivery.png"
                                className="w-24 h-24 object-contain"
                                alt=""
                            />
                        </div>

                        <h2 className="font-bold text-xl mt-4">Fast Delivery</h2>

                        <p className="text-gray-500 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt
                        </p>
                    </div>

                    <div className="rounded-xl bg-[#F0EDE5] p-6">
                        <div className="w-29 h-29 bg-white rounded-full mx-auto flex items-center justify-center">
                            <img
                                src="../assets/products.png"
                                className="w-24 h-24 object-contain"
                                alt=""
                            />
                        </div>

                        <h2 className="font-bold text-xl mt-4">Healthy Products</h2>

                        <p className="text-gray-500 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
