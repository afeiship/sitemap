import { toXML } from 'jstoxml';
import nx from '@jswork/next';
import nxChunk from '@jswork/next-chunk';
import fs from 'fs';

const XML_OPTIONS = { header: true, indent: '  ' };
const BASE_URLSET = {
  _name: 'urlset',
  _attrs: {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    version: '2.0'
  }
};

const defaults = {
  limit: 30000,
  cwd: process.cwd()
};

export default (inUrls, inOptions): void => {
  const opts = nx.mix(defaults, inOptions);
  const chunks = nxChunk(inUrls, opts.limit);
  chunks.forEach((urls, index) => {
    const idx = index + 1;
    const filename = `sitemap${idx}.xml`;
    const xmlstr = toXML(
      {
        ...BASE_URLSET,
        _content: urls.map((url) => {
          return {
            url: {
              loc: url,
              lastmod: new Date().toISOString()
            }
          };
        })
      },
      XML_OPTIONS
    );
    fs.writeFileSync(`${opts.cwd}/${filename}`, xmlstr);
  });
};
