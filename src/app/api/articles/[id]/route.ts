import prisma  from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const data = await req.json()
    await prisma.article.update({
        where: {
            id: params.id
        },
        data
    })
    return NextResponse.json({
        success: true,
        errorMessage: '修改成功',
        data: {}
    })
}  


export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await prisma.article.delete({
        where: {
            id: params.id
        },
    
    })
    return NextResponse.json({
        success: true,
        errorMessage: '删除成功',
        data: {}
    })
}  