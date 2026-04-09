import { getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import BlogPostDetailClient from './BlogListingClient';

export default async function BlogDetailPage(props: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await props.params;
  
  // Fetch the specific post from Supabase
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Pass the post data and locale to the Client Component
  return <BlogPostDetailClient post={post} locale={locale} />;
}