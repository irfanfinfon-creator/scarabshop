export default function handler(req, res) {
  // Verify request is authorized (optional but recommended for production)
  // For Vercel Cron, you can check:
  // if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  console.log('Cron job triggered at:', new Date().toISOString());
  
  return res.status(200).json({
    success: true,
    message: 'Cron job executed successfully',
    timestamp: new Date().toISOString()
  });
}
