import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "About Me",
    imageUrl: "img/about-me.svg",
    description: <>Please check my portfolio.</>,
    url: "https://www.google.com",
  },
  {
    title: "Check More",
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: <>please check my posts.</>,
    url: "/docs",
  },
  {
    title: "Powered by React",
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description, url }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <Link className={styles.feature} to={url}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const docsUrl = useBaseUrl("docs/React/hooks");
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          {/* <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div> */}
        </div>
      </header>
      <main>
        {/* {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )} */}
        <section className={styles.features}>
          <div className="container">
            <div className={clsx("row", styles.featureList)}>
              <Feature
                title="About Me"
                imageUrl="img/about-me.png"
                description="Please check my portfolio."
                url="https://www.google.com"
              />
              <Feature
                title="Check More"
                imageUrl="img/posts.png"
                description="Please check my posts."
                url={docsUrl}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
