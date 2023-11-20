import { faBookAtlas, faBookmark, faBraille, faDashboard, faListCheck, faShoppingCart, faUsers } from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
    {
        title: "Dashboard",
        href: "addashboard",
        icon: faDashboard,
    },
    {
        title: "Manage Users",
        href: "musers",
        icon: faUsers,
    },
    {
        title: "Manage Jobs",
        href: "mjobs",
        icon: faShoppingCart,
    },
    {
        title: "Manage Blogs",
        href: "mblogs",
        icon: faBraille,
    },
    {
        title: "Manage Stafs",
        href: "mstafs",
        icon: faBookAtlas,
    },
    {
        title: "Manage Orders",
        href: "morders",
        icon: faListCheck,
    },
    {
        title: "Manage Bookings",
        href: "mbookings",
        icon: faBookmark,
    },
];
