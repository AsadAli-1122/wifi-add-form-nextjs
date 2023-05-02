import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone } = req.body
    
    if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Invalid request body' });
      }

    // Connect to the MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db(process.env.MONGODB_DB)

    // Check if the email already exists in the database
    const existingUser = await db.collection('Users').findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'E-mail already exists' })
      return
    }

    // Insert the registration data into the "Users" collection, including the hashed password
    await db.collection('Users').insertOne({ name, email, phone, createdAt: new Date() })

    res.status(200).json({ message: 'Form Submit success' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
