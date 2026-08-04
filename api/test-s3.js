import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export default async function handler(req, res) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'test/hello.txt',
      Body: 'Hello from Vercel',
      ContentType: 'text/plain',
    })

    await s3.send(command)
    return res.status(200).json({ success: true, message: 'Upload worked!' })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      code: err.Code || err.name,
    })
  }
}
