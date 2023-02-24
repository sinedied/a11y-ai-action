import core from '@actions/core';
import { report, reportOutputFile } from 'a11y-ai';

async function run() {
  try {
    // const githubToken = core.getInput('github_token');
    const filesGlob = core.getInput('files');

    // core.setSecret(githubToken);

    core.debug(
      JSON.stringify({
        // githubToken,
        filesGlob
      })
    );

    const filesOrGlobs = options._.length > 0 ? options._ : ['**/*.html'];
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
