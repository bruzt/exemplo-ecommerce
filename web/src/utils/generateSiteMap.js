/*eslint no-undef: "off"*/

const axios = require("axios");
const fs = require("fs");

async function fetchProducts() {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";

  try {
    const response = await axios.get(`${backendUrl}/products`);

    return response.data.products;
  } catch (error) {
    console.error(error);
  }
}

async function generateSiteMap() {
  const products = await fetchProducts();

  const siteDomain = process.env.SITE_DOMAIN || "http://localhost:3000";

  const date = new Date().toISOString();

  const urls = products.map(
    (product) =>
      `<url>
            <loc>${`${siteDomain}/${product.id}?product=${String(product.title)
              .split(" ")
              .join("-")}`}</loc>
            <lastmod>${date}</lastmod>
            <priority>0.6</priority>
        </url>
        `
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${siteDomain}</loc>
                <lastmod>${date}</lastmod>
                <priority>0.5</priority>
            </url>
            ${urls.join("")}
        </urlset>
    `;

  fs.writeFileSync(
    "public/robots.txt",
    `user-agent: *\nsitemap: ${siteDomain}/sitemap.xml`
  );
  fs.writeFileSync("public/sitemap.xml", sitemap.trim());
}

generateSiteMap();
