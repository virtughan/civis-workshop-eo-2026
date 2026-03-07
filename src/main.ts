import "./style.css";
import AOS from "aos";
import { createIcons, CalendarDays, Clock, MapPin, ChevronDown, Globe, Navigation, Mail } from "lucide";

AOS.init({ duration: 800, once: true });
createIcons({ icons: { CalendarDays, Clock, MapPin, ChevronDown, Globe, Navigation, Mail } });
