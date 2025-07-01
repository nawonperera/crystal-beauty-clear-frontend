import { useState } from "react";

const ImageSlider = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70%] aspect-square relative">
                <img src={activeImage} className="w-full h-full object-cover" />
                <div className="h-[100px] w-full backdrop-blur-3xl absolute bottom-0 left-0 flex justify-center items-center">
                    {images.map((image, index) => {
                        return (
                            <img
                                key={index}
                                src={image}
                                className="h-full aspect-square mx-[5px] cursor-pointer"
                                onClick={() => setActiveImage(image)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
