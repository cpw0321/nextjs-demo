import { NextRequest, NextResponse } from "next/server";
import dayjs from 'dayjs'
import path from "path";
import fs from "fs";
import { Upload } from "antd";
import { randomUUID } from "crypto";

const saveFile = async (file: File) => {
    const dirName = '/uploads/' + dayjs().format('YYYY/MM/DD');
    const uploadDir = path.join(process.cwd(), 'public', dirName);
    fs.mkdirSync(uploadDir, { recursive: true });
    const fileName = randomUUID() + '.png';
    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(uploadDir + '/' + fileName, new DataView(arrayBuffer));
    return dirName + '/' + fileName;
}

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const fileName = await saveFile(formData.get('file') as File);
    return NextResponse.json({
        success: true,
        errorMessage: '',
        data: fileName
    })
}   