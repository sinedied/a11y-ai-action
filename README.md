# :robot: a11y-ai-action

[![Build Status](https://github.com/sinedied/a11y-ai-action/workflows/build/badge.svg)](https://github.com/sinedied/a11y-ai-action/actions)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Experimental GitHub Action to automatically detect accessibility issues in web pages using OpenAI and provide suggestions for fixing them.

## Usage

See [action.yml](action.yml).

Example workflow:
```yaml
steps:
- uses: actions/checkout@v3
- name: Generate accessibility suggestions report
  uses: sinedied/a11y-ai-action@v1
  with:
    # One or more glob patterns of files to include
    files: '**/*.html'
- uses: actions/upload-artifact@v3
  with:
    name: A11y Report
    path: report/a11y-report.html
```

<!-- You can use [this template repository](https://github.com/sinedied/a11y-ai-action-template) as an example setup. -->

## Notes

This tool is based on [a11y-ai](https://github.com/sinedied/a11y-ai).
