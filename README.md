# ENRE testing framework

This repository provides start code for applying the ENRE document driven test framework to ENRE single language
version. The framework is powered by ENRE-ts's test components.

## Basic concepts

This is a Node.js project written in JavaScript, that transforms ENRE unified test documents and standalone test cases
into language specific test framework code (for example, junit in Java), so that developers of ENRE single language
version can run tests natively, which enabling breakpoint debugging and other IDE features. Besides, this project also
checks and enforces the format of ENRE test documents, which can also be used as a format checker.

<table>
    <tr>
        <th>Category</th>
        <th>Concept</th>
        <th>Explanation</th>
        <th>Comment</th>
    </tr>
    <tr>
        <th rowspan="2">The input (Test artifacts)</th>
        <td>Test document</td>
        <td>A markdown file located in <code>/docs/</code> of an ENRE project's root.</td>
        <td><a href="https://github.com/xjtu-enre/ENRE-workflow/blob/main/AssertionFormat_CHS.md">The document format</a> is strictly restricted, a violation will result in parse fail and no output.</td>
    </tr>
    <tr>
        <td>Standalone test case</td>
        <td>A directory contains both a project to be analyzed (by ENRE) and an <code>assertion.yaml</code> file, where the directory is located in <code>/tests/cases/</code>.</td>
        <td>The standalone test case is suitable for complex test cases or a whole project.<br/>The format of <code>assertion.yaml</code> is the same as an assertion block within a markdown file.</td>
    </tr>
    <tr>
        <th rowspan="4">Process</th>
        <td>Parse CLI commands</td>
        <td>Provided</td>
        <td>The most necessary commands are not modifiable, however it is allowed to append customized commands.</td>
    </tr>
    <tr>
        <td>Find, validate and parse test artifacts</td>
        <td>Provided</td>
        <td>Features are provided by components of ENRE-ts, are not modifiable.</td>
    </tr>
    <tr>
        <td>Clear old files and setup relevant directories</td>
        <td>Provided</td>
        <td></td>
    </tr>
    <tr>
        <td>Generate native test code</td>
        <td><b>Waiting implementation</b></td>
        <td>Follow the instructions in comments so that your code fit in the framework's design philosophy will make things easy.</td>
    </tr>
    <tr>
        <th rowspan="2">The output</th>
        <td>Native test code</td>
        <td>The language and test framework relevant code file.</td>
        <td></td>
    </tr>
    <tr>
        <td>Format check result</td>
        <td>While this project produce native test code, the format of input is also checked, the result will be printed in the command line.</td>
        <td>A good test input is the one that no error is reported.</td>
    </tr>
    <tr>
        <th>After these</th>
        <td>Run native test code</td>
        <td>Run generated native test code and do all debugging staffs on demand.</td>
        <td></td>
    </tr>
</table>

## Getting started

### Prerequisites

Node.js 16~18.

### Setup and run

1. In this project's root, run `npm i` to download and setup all dependencies.

2. Fulfill all TODOs in `/src/index.js` that transform assertion YAML object and build native test code.

3. **Change the working directory to ENRE's root and then**
   run `node --experimental-specifier-resolution=node path/to/this-project/index.js` to start the
   framework.

   You can append `-- -h` to see the help message, likely all other commands that should be interpreted by this
   project's CLI should be appended after `--`.

4. (If no error) The output native test code will be located in `/tests/suites/` of ENRE's root.

### Version control this project

This project should also be version controlled by Git and submit to GitHub as a public standalone repository.

* You should use this template project to create a new repository in GitHub and name it as `ENRE-xx-test` where `xx` is
  the language label.
* You should also update the `package.json` file to reflect the language label and other information.
* If this template (upstream) is updated, you should merge the upstream changes into your new repository.
* You should also add the new repository as **a Git submodule** of the ENRE project, and document the setup and usage
  in the ENRE project's README file.

  ([EN Tutorial](https://gist.github.com/gitaarik/8735255), [CHS Tutorial](https://zhuanlan.zhihu.com/p/87053283))

## Bugs & Suggestions

Please [submit an issue to this repository](https://github.com/xjtu-enre/ENRE-test/issues/new). Do not submit issues to
ENRE-ts's repository.
