import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    const pageSize = req.nextUrl.searchParams.get('pageSize') || 10
    const currentPage = req.nextUrl.searchParams.get('currentPage') || 1
    const title = req.nextUrl.searchParams.get('title') || ''
    const data = await prisma.article.findMany({
        where: {
            title: {
                contains: title
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: Number(pageSize),
        skip: Number(pageSize) * (Number(currentPage) - 1),
    })
    const total = await prisma.article.count({
        where: {
            title: {
                contains: title
            }
        },
    })
    return NextResponse.json({
        success: true,
        errorMessage: '',
        data: {
            list: data,
            total,
            pages: Math.ceil(total / Number(pageSize)),
            page: Number(currentPage),
            pageSize: Number(pageSize),
        }
    })
}

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    await prisma.article.create({ data })
    return NextResponse.json({
        success: true,
        errorMessage: '创建成功',
        data: {}
    })
}