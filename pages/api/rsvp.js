import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, contact } = req.body;
    
    if (!name?.trim() || !contact?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Both name and contact are required'
      });
    }

    const { data, error } = await supabase
      .from('rsvp_entries')
      .insert([{ 
        name: name.trim(),
        contact: contact.trim()
      }])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Database operation failed');
    }

    return res.status(200).json({
      success: true,
      message: 'RSVP recorded successfully',
      data
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
} 