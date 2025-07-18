import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminToken } from '@/lib/auth/admin';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Verify admin credentials
    const admin = await verifyAdminCredentials(email, password);

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = createAdminToken(admin);

    // Return success with token
    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });

    // Also set HTTP-only cookie for added security
    response.cookies.set('pq_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}