# :robot: a11y-ai-action

[![Build Status](https://github.com/sinedied/a11y-ai-action/workflows/build/badge.svg)](https://github.com/sinedied/a11y-ai-action/actions)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Experimental GitHub Action to automatically detect accessibility issues in web pages using OpenAI and provide suggestions for fixing them.

## Usage

See [action.yml](action.yml).

Example workflow:
```yaml
permissions:
  pull-requests: write

steps:
- uses: actions/checkout@v3

- name: Generate a11y report
  uses: sinedied/a11y-ai-action@v1
  with:
    # One or more glob patterns of files to include
    files: '**/*.html'

# Add a comment with the report if it's a pull request
- uses: actions-ecosystem/action-create-comment@v1
  if: ${{ github.event_name == 'pull_request' }}
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    body: |
      ${{ steps.a11y_ai.outputs.report_md }}

# Upload the report as an artifact
- uses: actions/upload-artifact@v3
  with:
    name: A11y Report
    path: ${{ steps.a11y_ai.outputs.report_path }}
```

You can a full example setup in [this repository](https://github.com/sinedied/a11y-ai/blob/main/.github/workflows/action.yml).

## Notes

This tool is based on [a11y-ai](https://github.com/sinedied/a11y-ai).
