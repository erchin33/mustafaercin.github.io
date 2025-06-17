import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // data.json dosyasının yolu
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    
    // Veriyi JSON dosyasına kaydet
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Veri kaydetme hatası:', error);
    return NextResponse.json(
      { error: 'Veri kaydedilemedi' },
      { status: 500 }
    );
  }
} 