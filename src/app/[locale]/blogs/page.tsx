import { getPostsByLanguage } from '@/lib/api';
import BlogListingClient from './BlogListingClient';

export default async function BlogListingPage(props: { 
  params: Promise<{ locale?: string; lang?: string }> 
}) {
  // Await params safely
  const resolvedParams = await props.params;
  const activeLocale = resolvedParams?.locale || resolvedParams?.lang || 'en';
  
  // Fetch posts from Supabase on the server
  const posts = await getPostsByLanguage(activeLocale);

  // Pass the data to the Client Component
  return <BlogListingClient posts={posts} activeLocale={activeLocale} />;
}