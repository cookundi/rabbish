import { Handler } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  
  const { wallet, x_username, referred_by } = JSON.parse(event.body || '{}');
  
  // The username acts as the referral code (without @)
  const my_referral_code = x_username.replace('@', '');

  try {
    await sql`
      INSERT INTO users (wallet, x_username, referral_code, referred_by)
      VALUES (${wallet}, ${x_username}, ${my_referral_code}, ${referred_by})
      ON CONFLICT (wallet) DO NOTHING
    `;
    
    // If they came with a ref, give that user a point
    if (referred_by) {
      await sql`UPDATE users SET referral_points = referral_points + 1 WHERE referral_code = ${referred_by}`;
    }

    return { 
      statusCode: 200, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, ref: my_referral_code }) 
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }
};