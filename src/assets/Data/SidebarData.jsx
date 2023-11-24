import { faBookAtlas, faBookmark, faBraille, faDashboard, faHourglass, faListCheck, faShoppingCart, faUsers } from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
    {
        title: "Dashboard",
        href: "addashboard",
        icon: faDashboard,
    },
    // {
    //     title: "Manage Users",
    //     href: "musers",
    //     icon: faUsers,
    // },
    {
        title: "Manage Jobs",
        href: "mjobs",
        icon: faHourglass,
    },
    {
        title: "Manage Blogs",
        href: "mblogs",
        icon: faBraille,
    },
    {
        title: "Manage Socializations",
        href: "msocializations",
        icon: faBookmark,
    },
    {
        title: "Manage Job Applications",
        href: "mjobapplications",
        icon: faBookAtlas,
    },
];
