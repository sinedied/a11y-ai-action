import path from 'node:path';
import core from '@actions/core';
import glob from 'fast-glob';
import { report, reportOutputFilename, generateMarkdownReport } from 'a11y-ai';

async function run() {
  try {
    // Const githubToken = core.getInput('github_token');
    const filesGlob = core.getInput('files');

    // Core.setSecret(githubToken);

    core.debug(
      JSON.stringify({
        // GithubToken,
        filesGlob
      })
    );

    let filesOrGlobs = Array.isArray(filesGlob) ? filesGlob : [filesGlob];
    filesOrGlobs = filesOrGlobs.length === 0 || filesOrGlobs[0] === '' ? ['**/*.html'] : filesOrGlobs;
    const files = await glob(filesOrGlobs, {
      dot: true,
      ignore: ['**/node_modules/**', `${reportOutputFilename}.*`]
    });

    const result = await report(files);
    const html = result.contents;
    const md = await generateMarkdownReport(result.reports);
    const reportPath = path.dirname(result.outputFile);

    core.debug('Output report path: ' + reportPath);
    core.setOutput('report_path', reportPath);

    core.debug('Output report html: ' + html);
    core.setOutput('report_html', html);

    core.debug('Output report markdown: ' + md);
    core.setOutput('report_md', md);
  } catch (error) {
    core.setFailed(error.toString());
  }
}

run();
