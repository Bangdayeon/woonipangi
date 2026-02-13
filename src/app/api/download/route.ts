import { NextRequest, NextResponse } from 'next/server';

// 보안을 위해 허용된 호스트 화이트리스트
const ALLOWED_R2_HOST = process.env.NEXT_PUBLIC_R2_DOMAIN;

export async function GET(request: NextRequest) {
  if (!ALLOWED_R2_HOST) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const filename = searchParams.get('filename') || 'download';

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // SSRF 방지: 허용된 호스트인지 확인
    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
      if (targetUrl.host !== ALLOWED_R2_HOST) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Cloudflare에서 파일 스트리밍
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) }); // 15초 타임아웃
    if (!response.ok) throw new Error('Failed to fetch file');

    // 스트리밍 처리를 위해 body가 없을 경우 예외 처리
    if (!response.body) {
      throw new Error('No content body found');
    }

    // body 스트림을 직접 사용하여 메모리 절약
    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';

    const safeFilename = filename.replace(/[\r\n"]/g, '').trim();
    // ASCII fallback: 비 ASCII 문자를 제거
    const asciiFilename = safeFilename.replace(/[^\x20-\x7E]/g, '_');
    const encodedFilename = encodeURIComponent(safeFilename)
      .replace(/['()]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
      .replace(/\*/g, '%2A');

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
        // attachment 설정으로 브라우저에서 파일을 열지 않고 바로 다운로드
        'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
