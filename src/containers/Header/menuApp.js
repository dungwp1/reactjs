export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.user',
        menus: [
            { name: 'menu.admin.manage.doctor', link: '/system/manage-doctor' },
            { name: 'menu.admin.manage.admin', link: '/system/user-manage' },
            { name: 'menu.admin.manage.crud', link: '/system/user-crud' },
            { name: 'menu.admin.manage.crud-redux', link: '/system/user-redux' },
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage.clicnic', link: '/system/manage-clinic' },
        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage.specialty', link: '/system/manage-specialty' },
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            { name: 'menu.admin.manage.handbook', link: '/system/manage-handbook' },
        ]
    },
];