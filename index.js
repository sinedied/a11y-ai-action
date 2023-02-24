import core from '@actions/core';
import glob from 'fast-glob';
import { report, reportOutputFile } from 'a11y-ai';

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

    const filesOrGlobs = filesGlob ? [filesGlob] : ['**/*.html'];
    const files = await glob(filesOrGlobs, {
      dot: true,
      ignore: ['**/node_modules/**', reportOutputFile]
    });

    await report(files);

    core.debug('Output report file: ' + reportOutputFile);
    core.setOutput('report_file', reportOutputFile);
  } catch (error) {
    core.setFailed(error.toString());
  }
}

run();
