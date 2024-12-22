export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.user',
        menus: [
            { name: 'menu.admin.manage.doctor', link: '/system/manage-doctor' },
            { name: 'menu.doctor.schedule', link: '/doctor/manage-schedule' },
            { name: 'menu.admin.manage.crud', link: '/system/user-crud' },
            { name: 'menu.admin.manage.crud-redux', link: '/system/user-redux' },

        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage.clinic', link: '/system/manage-clinic' },
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

export const doctorMenu = [
    { //quản lý kế hoạch khám bệnh của bác sĩ
        name: 'menu.admin.user',
        menus: [
            { name: 'menu.doctor.schedule', link: '/doctor/manage-schedule' },
        ]
    },
];