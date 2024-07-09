import prisma from '@/db'
import { NextResponse } from 'next/server'

export const GET = async () => {
    const data = [
        { "title": "newVisits", "description": "102,400" },
        { "title": "messages", "description": "81,212" },
        { "title": "purchases", "description": "9,280" },
        { "title": "shoppings", "description": "13,600" }
      ]
    return NextResponse.json({
        success: true,
        errorMessage: '',
        data
    })
}
