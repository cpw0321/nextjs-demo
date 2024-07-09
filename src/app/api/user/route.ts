import { NextRequest, NextResponse } from 'next/server'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const { username, password } = await request.json()
    if (username !== 'admin' || password !== '123456') {
        return NextResponse.json({code: 201, msg: 'Unauthorized'})
    }
    const token = jsonwebtoken.sign({ username }, 'secret', { expiresIn: '1h' })
    cookies().set('token', token)
    return NextResponse.json({code: 0, msg: '登录成功'})
}
