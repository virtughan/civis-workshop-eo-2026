import "./style.css";
import AOS from "aos";
import {
    createIcons,
    CalendarDays,
    Check,
    ChevronDown,
    Clock,
    Coffee,
    Github,
    Globe,
    Mail,
    MapPin,
    Navigation,
    Satellite,
    Users,
    Utensils,
} from "lucide";

AOS.init({ duration: 800, once: true });
createIcons({
    icons: {
        CalendarDays,
        Check,
        ChevronDown,
        Clock,
        Coffee,
        Github,
        Globe,
        Mail,
        MapPin,
        Navigation,
        Satellite,
        Users,
        Utensils,
    },
});

const heroBackgroundImage = document.querySelector<HTMLImageElement>("#hero-bg-image");

if (heroBackgroundImage) {
    const totalHeroImages = 7;
    let currentHeroImage = 1;

    window.setInterval(() => {
        currentHeroImage = currentHeroImage >= totalHeroImages ? 1 : currentHeroImage + 1;
        heroBackgroundImage.src = `./imgs/${currentHeroImage}.jpg`;
    }, 3000);
}
