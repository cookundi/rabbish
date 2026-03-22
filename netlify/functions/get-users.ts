import { Handler } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export const handler: Handler = async () => {
  try {
    const data = await sql`
      SELECT x_username, wallet, referral_points, is_whitelisted 
      FROM users 
      ORDER BY referral_points DESC 
      LIMIT 100
    `;
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch junk" }) };
  }
};