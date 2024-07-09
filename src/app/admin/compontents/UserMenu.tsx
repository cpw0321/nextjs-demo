'use client'
import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import Cookies from 'universal-cookie';

const items: MenuProps["items"] = [
    {
        label: "退出登录",
        key: "logout",
    },
];

const UserMenu = () => {
    const onClick: MenuProps["onClick"] = async ({ key }) => {
        if (key === "logout") {
            console.log('退出登录')
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
            });
            const cookies = new Cookies();

            // 获取所有 Cookie 并转换为数组
            const allCookies = cookies.getAll() as Record<string, string>;
    
            // 清空所有 Cookie
            Object.keys(allCookies).forEach(cookie => {
                cookies.remove(cookie);
            });

            // 重定向到首页, router.push('/');不生效
            // window.location.href = '/'; // 显示windows不存在
            location.reload();
            console.log(document.cookie)
        }
    };

    return (
        <Dropdown menu={{ items, onClick }} arrow placement="bottom">
            <div role="menuitem" tabIndex={-1}>
                <Avatar src={'/avatar.png'} />
            </div>
        </Dropdown>
    );
}

export default UserMenu