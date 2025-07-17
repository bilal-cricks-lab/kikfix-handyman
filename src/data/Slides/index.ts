import IMAGES from "../../constants/Images";
import TEXT from "../../constants/Text";
import SlideItem from "../../types/slide";

const Slides: SlideItem[] = [
    {
        id: 1,
        title: TEXT.welcome,
        description: TEXT.welcomeDescription,
        image: IMAGES.boarding1
    },
    {
        id: 2,
        title: TEXT.service,
        description: TEXT.serviceDescription,
        image: IMAGES.boarding2
    },
    {
        id: 3,
        title: TEXT.booking,
        description: TEXT.bookingDescription,
        image: IMAGES.boarding3
    },
    {
        id: 4,
        title: TEXT.payment,
        description: TEXT.paymentDescription,
        image: IMAGES.boarding4
    }
]

export default Slides;