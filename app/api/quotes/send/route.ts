import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, customerName, quoteData, companyInfo } = body;

    if (!to || !customerName || !quoteData) {
      return NextResponse.json(
        { error: 'Missing required fields: to, customerName, quoteData' },
        { status: 400 }
      );
    }

    // Format the quote data for email
    const quoteHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 10px 10px; }
          .quote-section { background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .line-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .line-item:last-child { border-bottom: none; }
          .total { font-size: 24px; font-weight: bold; color: #667eea; margin-top: 20px; padding-top: 20px; border-top: 2px solid #667eea; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #888; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${companyInfo?.name || 'PaintQuote Pro'}</h1>
            <p>Professional Painting Quote</p>
          </div>
          
          <div class="content">
            <h2>Hello ${customerName},</h2>
            <p>Thank you for considering us for your painting project. We're excited to provide you with a detailed quote for your ${quoteData.projectType || 'painting'} project.</p>
            
            <div class="quote-section">
              <h3>Project Details</h3>
              ${quoteData.squareFootage ? `<div class="line-item"><span>Square Footage:</span><strong>${quoteData.squareFootage} sq ft</strong></div>` : ''}
              ${quoteData.rooms ? `<div class="line-item"><span>Number of Rooms:</span><strong>${quoteData.rooms}</strong></div>` : ''}
              ${quoteData.timeline ? `<div class="line-item"><span>Estimated Timeline:</span><strong>${quoteData.timeline}</strong></div>` : ''}
            </div>
            
            ${quoteData.materials ? `
            <div class="quote-section">
              <h3>Materials Breakdown</h3>
              ${quoteData.materials.primer ? `<div class="line-item"><span>Primer:</span><strong>$${quoteData.materials.primer}</strong></div>` : ''}
              ${quoteData.materials.paint ? `<div class="line-item"><span>Paint:</span><strong>$${quoteData.materials.paint}</strong></div>` : ''}
              ${quoteData.materials.supplies ? `<div class="line-item"><span>Supplies:</span><strong>$${quoteData.materials.supplies}</strong></div>` : ''}
              <div class="line-item"><span><strong>Materials Total:</strong></span><strong>$${quoteData.materials.total || 0}</strong></div>
            </div>
            ` : ''}
            
            ${quoteData.labor ? `
            <div class="quote-section">
              <h3>Labor Breakdown</h3>
              <div class="line-item"><span>Estimated Hours:</span><strong>${quoteData.labor.hours} hours</strong></div>
              <div class="line-item"><span>Hourly Rate:</span><strong>$${quoteData.labor.rate}/hour</strong></div>
              <div class="line-item"><span><strong>Labor Total:</strong></span><strong>$${quoteData.labor.total}</strong></div>
            </div>
            ` : ''}
            
            <div class="total">
              Total Quote: $${quoteData.total || 0}
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'}/quote/accept?id=${quoteData.id || 'demo'}" class="cta-button">Accept Quote</a>
            </div>
            
            <div class="quote-section">
              <h3>What's Included</h3>
              <ul>
                <li>Professional preparation of all surfaces</li>
                <li>High-quality paint and materials</li>
                <li>Clean-up and disposal</li>
                <li>2-year warranty on workmanship</li>
                <li>100% satisfaction guarantee</li>
              </ul>
            </div>
            
            <div class="quote-section">
              <h3>Next Steps</h3>
              <ol>
                <li>Review this quote at your convenience</li>
                <li>Click "Accept Quote" to proceed</li>
                <li>We'll contact you within 24 hours to schedule</li>
                <li>50% deposit required to secure your date</li>
              </ol>
            </div>
            
            <p><strong>Quote Valid For:</strong> 30 days from ${new Date().toLocaleDateString()}</p>
            
            <p>If you have any questions, please don't hesitate to reach out:</p>
            <ul>
              <li>Phone: ${companyInfo?.phone || '1-800-PAINT-PRO'}</li>
              <li>Email: ${companyInfo?.email || 'quotes@paintquotepro.com'}</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>This quote was generated by PaintQuote Pro</p>
            <p>${companyInfo?.name || 'Professional Painting Services'} | ${companyInfo?.address || 'Serving Your Area'}</p>
            <p>© ${new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'PaintQuote Pro <noreply@paintquotepro.com>',
      to: [to],
      subject: `Your Painting Quote - ${customerName}`,
      html: quoteHtml,
    });

    if (error) {
      console.error('Email send error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Quote sent successfully',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('Quote send error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}