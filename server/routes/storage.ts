import { Router } from 'express';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const router = Router();

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? '',
  },
  forcePathStyle: true,
});

router.post('/presign', async (req, res) => {
  const { contentType, folder, filename } = req.body as { contentType: string; folder?: string; filename: string };
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  if (!bucket) return res.status(500).json({ error: 'Bucket not configured' });

  const userPrefix = 'public'; // TODO: replace with authenticated user id
  const key = `${userPrefix}/${folder ?? 'general'}/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType, CacheControl: 'public, max-age=31536000' });
  const url = await getSignedUrl(r2Client, command, { expiresIn: 60 * 5 });

  const publicUrl = `${process.env.CLOUDFLARE_R2_ENDPOINT}/${bucket}/${key}`;
  res.json({ url, key, publicUrl });
});

router.post('/delete', async (req, res) => {
  const { url } = req.body as { url: string };
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  if (!bucket) return res.status(500).json({ error: 'Bucket not configured' });
  const parts = url.split('/');
  const idx = parts.findIndex((p) => p === bucket);
  if (idx < 0) return res.status(400).json({ error: 'Invalid URL' });
  const key = parts.slice(idx + 1).join('/');
  await r2Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  res.json({ ok: true });
});

export default router;

