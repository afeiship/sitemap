import { toXML } from 'jstoxml';
import nx from '@jswork/next';
import nxChunk from '@jswork/next-chunk';
import fs from 'fs';
import mkdirp from 'mkdirp';
import del from 'del';
import { execSync } from 'child_process';

const XML_OPTIONS = { header: true, indent: '  ' };
const getXMLMeta = (name) => {
  return {
    _name: name,
    _attrs: {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      version: '2.0'
    }
  };
};

const defaults = {
  limit: 30000,
  domain: 'http://www.example.com',
  cwd: process.cwd()
};

class Sitemap {
  private options;
  private urls: any[] = [];

  get chunks() {
    return nxChunk(this.urls, this.options.limit);
  }

  get hasMultiple() {
    return this.chunks.length > 1;
  }

  generate() {
    if (this.hasMultiple) {
      this.multiple();
      this.sitemapindex();
    } else {
      this.single(this.urls);
    }
  }

  constructor(inUrls, inOptions) {
    this.urls = inUrls;
    this.options = nx.mix(defaults, inOptions);
    this.setup();
  }

  setup() {
    const cwd = this.options.cwd;
    mkdirp.sync(cwd);
    del.sync([`${cwd}/sitemap*.xml`, `${cwd}/sitemap*.tar.gz`]);
  }

  single(inUrls, inIsIndex?, inFilename?) {
    const filename = inFilename || 'sitemap.xml';
    const cwd = this.options.cwd;
    const baseOpts = inIsIndex ? getXMLMeta('sitemapindex') : getXMLMeta('urlset');
    const key = inIsIndex ? 'sitemap' : 'url';
    const xmlstr = toXML(
      {
        ...baseOpts,
        _content: inUrls.map((url) => {
          return {
            [key]: {
              loc: url,
              lastmod: new Date().toISOString()
            }
          };
        })
      },
      XML_OPTIONS
    );
    fs.writeFileSync(`${cwd}/${filename}`, xmlstr);
  }

  multiple() {
    const chunks = this.chunks;
    const cwd = this.options.cwd;
    chunks.forEach((urls, index) => {
      const idx = index + 1;
      const filename = `sitemap${idx}.xml`;
      this.single(urls, false, filename);
      execSync(`cd ${cwd} && tar -czf ${filename}.tar.gz ${filename} && cd -`);
    });
  }

  sitemapindex() {
    const count = this.chunks.length;
    const urls: any[] = [];
    for (let i = 1; i <= count; i++) {
      urls.push(`${this.options.domain}/sitemap${i}.xml.tar.gz`);
    }
    this.single(urls, true);
  }
}

export default (inUrls, inOptions): void => {
  const sitemapInstance = new Sitemap(inUrls, inOptions);
  sitemapInstance.generate();
};
