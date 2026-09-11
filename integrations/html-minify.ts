import type { AstroIntegration } from 'astro';
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from 'fs/promises';
import { globby } from 'globby';
import { minify } from 'html-minifier-terser';

export interface HtmlMinifierOptions {
  exclude?: string[];
  include?: string[];
  minifyOptions?: Parameters<typeof minify>[1];
}

export default function htmlMinifier(options: HtmlMinifierOptions = {}): AstroIntegration {
  const {
    exclude = ['news/tag/**/*.html'],
    include = ['**/*.html'],
    minifyOptions = {
      removeComments: true,
      preserveLineBreaks: true,
      collapseWhitespace: true
    }
  } = options;

  return {
    name: 'astro-html-minifier',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        logger.info('Starting HTML minification...');
        console.time('[html-minifier] Time');

        const cwd = fileURLToPath(dir);
        // Build OS-agnostic glob patterns and search within the build output directory.
        const patterns = [
          ...include,
          ...exclude.map(p => `!${p}`)
        ];

        const files = await globby(patterns, { cwd, absolute: true });
        logger.info(`Patterns: ${patterns.join(', ')}`);
        logger.info(`Found ${files.length} HTML files to process.`);
        let minified = 0;
        let skipped = 0;
        
        for (const file of files) {
            try {
                const html = await readFile(file, 'utf-8');
                // Add IDs to h2, h3, and h4 tags
                //  const dom = new JSDOM(html)
                //  const headings = dom.window.document.querySelectorAll('h2, h3, h4')
                //  for (let i = 0; i < headings.length; i++) {
                // 	 const heading = headings[i]
                // 	 const text = heading.textContent
                // 	 const id = text
                // 		 .trim()
                // 		 .replace(/[\s.,?:]+/g, '-')
                // 		 .replace(/-+$/, '')
                // 		 .toLowerCase()
                // 	 heading.setAttribute('id', id)
                //  }
                //  html = dom.serialize()
                const result = await minify(html, minifyOptions);
                await writeFile(file, result);
                logger.info(`✔ Minified: ${file.replace(cwd, '')}`);
                minified++;
            } catch (err: any) {
                logger.warn(`✖ Skipped: ${file.replace(cwd, '')} - ${err.message}`);
                skipped++;
          }
        }

        console.timeEnd('[html-minifier] Time');
        logger.info(`Done. Minified ${minified} files, skipped ${skipped}.`);
      }
    }
  };
}
