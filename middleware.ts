import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const role = req.cookies.get('role');  // Получаем куку 'role' синхронно

    if (!role) {
        return NextResponse.redirect(new URL('/auth', req.url)); // Перенаправляем на страницу логина, если роль не указана
    }

    if (role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url)); // Перенаправляем на главную страницу, если роль не admin
    }

    return NextResponse.next(); // Разрешаем доступ, если роль admin
}

// Настройка middleware для пути /dashboard
export const config = {
    matcher: ['/dashboard'],
};
