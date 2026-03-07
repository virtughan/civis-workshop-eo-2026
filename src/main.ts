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
