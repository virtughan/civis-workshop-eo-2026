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

type ScheduleSession = {
    type: "session" | "break";
    kind?: "coffee" | "lunch";
    time: string;
    title: string;
    description?: string;
    presenter?: string;
};

type ScheduleDay = {
    id: string;
    label: string;
    title: string;
    sessions: ScheduleSession[];
};

type Schedule = {
    intro?: string;
    days: ScheduleDay[];
};

const lucideIcons = {
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
};

const escapeHtml = (value: string): string =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const renderSession = (session: ScheduleSession): string => {
    if (session.type === "break") {
        const iconName = session.kind === "lunch" ? "utensils" : "coffee";
        return `
          <div class="rounded-lg border-l-2 border-amber/30 py-3 pr-5 pl-5">
            <p class="flex items-center gap-1.5 text-sm text-slate/70">
              <i data-lucide="${iconName}" class="h-3.5 w-3.5 text-amber/40"></i>
              ${escapeHtml(session.time)} &middot; ${escapeHtml(session.title)}
            </p>
          </div>`;
    }

    const description = session.description
        ? `<p class="mt-1 text-sm text-slate">${escapeHtml(session.description)}</p>`
        : "";
    const presenter = session.presenter
        ? `<p class="mt-1 text-xs font-medium text-amber-light/80">${escapeHtml(session.presenter)}</p>`
        : "";

    return `
      <div class="rounded-lg border-l-2 border-amber bg-navy/40 py-4 pr-5 pl-5">
        <p class="mb-1 text-xs font-medium text-amber">${escapeHtml(session.time)}</p>
        <p class="font-heading text-[15px] font-semibold">${escapeHtml(session.title)}</p>
        ${description}
        ${presenter}
      </div>`;
};

const renderDay = (day: ScheduleDay): string => {
    const sessions = day.sessions.map(renderSession).join("");
    return `
      <div data-day-panel="${escapeHtml(day.id)}" data-aos="fade-up">
        <div class="mb-8 border-b border-amber/30 pb-4">
          <p class="text-xs font-semibold uppercase tracking-widest text-amber/60">${escapeHtml(day.label)}</p>
          <h3 class="font-heading text-xl font-bold">${escapeHtml(day.title)}</h3>
        </div>
        <div class="space-y-3">${sessions}</div>
      </div>`;
};

const renderTabButton = (day: ScheduleDay, isActive: boolean): string => {
    const activeClasses = "bg-amber text-navy-dark";
    const inactiveClasses = "border border-amber/40 text-slate hover:text-amber";
    return `
      <button
        type="button"
        data-day-tab="${escapeHtml(day.id)}"
        class="rounded-full px-5 py-2 text-sm font-semibold transition ${isActive ? activeClasses : inactiveClasses}"
        aria-pressed="${isActive ? "true" : "false"}"
      >${escapeHtml(day.title)}</button>`;
};

const setActiveDay = (dayId: string): void => {
    document.querySelectorAll<HTMLButtonElement>("[data-day-tab]").forEach((button) => {
        const isActive = button.dataset.dayTab === dayId;
        button.classList.toggle("bg-amber", isActive);
        button.classList.toggle("text-navy-dark", isActive);
        button.classList.toggle("border", !isActive);
        button.classList.toggle("border-amber/40", !isActive);
        button.classList.toggle("text-slate", !isActive);
        button.classList.toggle("hover:text-amber", !isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    document.querySelectorAll<HTMLDivElement>("[data-day-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.dayPanel !== dayId;
    });
};

const renderSchedule = async (): Promise<void> => {
    const grid = document.querySelector<HTMLDivElement>("#schedule-grid");
    const tabs = document.querySelector<HTMLDivElement>("#schedule-tabs");
    if (!grid || !tabs) return;

    const response = await fetch("./schedule.json");
    if (!response.ok) {
        throw new Error(`Failed to load schedule.json: ${response.status} ${response.statusText}`);
    }
    const schedule = (await response.json()) as Schedule;

    const intro = document.querySelector<HTMLParagraphElement>("#schedule-intro");
    if (intro && schedule.intro) {
        intro.textContent = schedule.intro;
    }

    tabs.innerHTML = schedule.days.map((day, index) => renderTabButton(day, index === 0)).join("");
    grid.innerHTML = schedule.days.map(renderDay).join("");

    const firstDay = schedule.days[0];
    if (firstDay) {
        setActiveDay(firstDay.id);
    }

    tabs.querySelectorAll<HTMLButtonElement>("[data-day-tab]").forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.dayTab;
            if (target) setActiveDay(target);
        });
    });
};

AOS.init({ duration: 800, once: true });
createIcons({ icons: lucideIcons });

void renderSchedule().then(() => {
    createIcons({ icons: lucideIcons });
    AOS.refresh();
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
