import { NextRequest, NextResponse } from "next/server";
import { getDatabaseAdapter } from "@/lib/database/adapter";


export async function POST(request: NextRequest) {
  try {
    const { accessCode } = await request.json();

    if (!accessCode) {
      return NextResponse.json(
        { error: "Access code is required" },
        { status: 400 },
      );
    }

    // Convert to uppercase for consistency
    const normalizedCode = accessCode.toString().toUpperCase();

    // Check if access code exists in companies table
    const db = getDatabaseAdapter();
    const company = await db.getCompanyByAccessCode(normalizedCode);

    if (company) {
      // Valid company found
      console.log(
        `✅ Valid access code: ${normalizedCode} for ${company.company_name}`,
      );

      return NextResponse.json({
        success: true,
        company: {
          id: company.id,
          accessCode: company.access_code,
          name: company.company_name,
          phone: company.phone,
          email: company.email,
          logoUrl: company.logo_url || null,
        },
      });
    } else {
      // Check if it's a new access code pattern (starts with letter, contains numbers)
      const newCodePattern = /^[A-Z]{3,10}\d{2,4}$/;

      if (newCodePattern.test(normalizedCode)) {
        // Auto-create new company for valid pattern
        const companyName = `Company ${normalizedCode}`;

        const result = await db.createCompany({
          access_code: normalizedCode,
          company_name: companyName,
          phone: "",
          email: `${normalizedCode.toLowerCase()}@example.com`
        });

        console.log(
          `🆕 Auto-created company: ${companyName} with code ${normalizedCode}`,
        );

        return NextResponse.json({
          success: true,
          company: {
            id: result.id,
            accessCode: normalizedCode,
            name: companyName,
            phone: "",
            email: `${normalizedCode.toLowerCase()}@example.com`,
            logoUrl: null,
          },
          isNewCompany: true,
        });
      } else {
        // Invalid access code
        console.log(`❌ Invalid access code: ${normalizedCode}`);
        return NextResponse.json(
          {
            error: "Invalid access code. Please contact support.",
          },
          { status: 401 },
        );
      }
    }
  } catch (error) {
    console.error("Access code verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET endpoint to list available demo companies (for testing)
export async function GET() {
  try {
    // Return demo companies for testing
    const demoCompanies = [
      { access_code: "DEMO2024", company_name: "Demo Painting Company", phone: "(555) 123-4567" },
      { access_code: "PAINTER001", company_name: "Smith Painting LLC", phone: "(555) 987-6543" },
      { access_code: "CONTRACTOR123", company_name: "Elite Contractors", phone: "(555) 456-7890" }
    ];

    return NextResponse.json({
      companies: demoCompanies,
      message: "Available access codes for testing",
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}