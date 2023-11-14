import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`🦖 ${siteConfig.title}`} description="Interactive codelab using Docusaurus and Firebase."></Layout>
  );
}
