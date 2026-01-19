import { useState } from "react";

export default function ImageSlider(props) {

    const images = props.images;
    const [activeIndex, setActiveIndex] = useState(0);
    return(
        <div className="w-full flex flex-col items-center">
            <img src={images[activeIndex]} className="w-[80%] h-[400px] object-contain shadow-xl"/>
            <div className="w-full h-[120px] flex flex-row justify-center items-center gap-4">
                {
                    images.map(
                        (image, index) => {
                            return(
                                <img src={images[index]} className={"w-[90px] h-[90px] object-cover m-2 shadow-xl rounded-lg hover:scale-105 transition-transform-300 cursor-pointer"+((activeIndex==index) ? "border-2 border-accent": "")}
                                onClick={() => {
                                    setActiveIndex(index)
                                }}
                                />
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}