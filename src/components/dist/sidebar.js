'use client';
"use strict";
exports.__esModule = true;
exports.NavbarItem = void 0;
var react_1 = require("react");
// ** import icons
var lucide_react_1 = require("lucide-react");
var navigation = [
    {
        title: 'Dashboards',
        icon: lucide_react_1.LayoutDashboard,
        children: [
            { title: 'CRM', path: '/dashboards/crm' },
            { title: 'Analytics', path: '/dashboards/analytics' },
            { title: 'eCommerce', path: '/dashboards/ecommerce' }
        ]
    },
    { sectionTitle: 'Apps & Pages' },
    { title: 'Email', icon: lucide_react_1.Mail, path: '/apps/email' },
];
function NavbarItem(props) {
    var sideBarState = props.sideBarState;
    console.log('tuan', navigation);
    return (react_1["default"].createElement("div", { className: "flex-1 bg-amber-800" }, navigation.map(function (items, index) {
        return (react_1["default"].createElement("div", { className: "" },
            react_1["default"].createElement("div", { className: "" }, 'sectionTitle' in items ?
                react_1["default"].createElement("div", { className: "flex flex-row justify-center items-center gap-1" },
                    react_1["default"].createElement("span", { className: "h-[1px] w-[20px] bg-gray-300" }),
                    react_1["default"].createElement("div", { className: "text-white text-xs font-semibold" }, items.sectionTitle),
                    react_1["default"].createElement("span", { className: "h-[1px] w-[20px] bg-gray-300" })) :
                react_1["default"].createElement("div", null, item.children && item.children.length > 0 && (react_1["default"].createElement("div", null, item.children.map(function (child, index) { return (react_1["default"].createElement(TreeItem, { key: index, item: child })); })))))));
    })));
}
exports.NavbarItem = NavbarItem;
function Sidebar(props) {
    var sideBarState = props.sideBarState;
    return (react_1["default"].createElement("div", { className: "flex-1 p-6" },
        react_1["default"].createElement(NavbarItem, { sideBarState: sideBarState })));
}
exports["default"] = Sidebar;
