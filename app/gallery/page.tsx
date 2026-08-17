import { getGallery } from '@/lib/data'
import { GalleryClient } from '@/components/gallery/GalleryClient'

export default async function GalleryPage() {
  const items = await getGallery()
  return <GalleryClient items={items} />
}
